"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import {
  canTransitionTo,
  getNextStage,
  getTasksForStage,
  computeRiskScore,
} from "@/lib/transaction-engine";
import { computeRiskFromFactors } from "@/lib/risk-engine";
import {
  advanceStageInputSchema,
  toggleTaskInputSchema,
  transactionIdSchema,
} from "@/lib/transaction/schemas";

export type AdvanceStageResult =
  | { ok: true }
  | { ok: false; error: string };

export type TransactionRow = {
  id: string;
  stage: string;
  status: string;
  closing_date: string | null;
  created_at: string;
  updated_at: string;
  property_id: string;
  user_id: string;
  role: string;
};

export type AdvanceTransactionStageResult =
  | { ok: true; transaction: TransactionRow }
  | { ok: false; error: string };

/**
 * Advance transaction to next valid stage.
 * - Fetches current stage
 * - Determines next valid stage
 * - Updates stage and updated_at (via DB trigger)
 * - Inserts tasks for next stage (prevents duplicates)
 * - Logs change in audit_logs
 * - Returns updated transaction
 * - Prevents regressing or skipping stages
 */
export async function advanceTransactionStage(
  transactionId: string
): Promise<AdvanceTransactionStageResult> {
  const parsed = advanceStageInputSchema.safeParse({ transactionId });
  if (!parsed.success) return { ok: false, error: "Invalid transaction ID" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  const { data: tx, error: txErr } = await supabase
    .from("transactions")
    .select("id, stage, user_id")
    .eq("id", transactionId)
    .eq("user_id", user.id)
    .single();

  if (txErr || !tx) return { ok: false, error: "Transaction not found" };

  if (tx.stage === "closed") return { ok: false, error: "Cannot advance beyond completed" };

  const nextStage = getNextStage(tx.stage);
  if (!nextStage) return { ok: false, error: "Already at final stage" };
  if (!canTransitionTo(tx.stage, nextStage)) {
    return { ok: false, error: "Invalid stage transition: cannot regress or skip stages" };
  }

  const { data: updated, error: updateErr } = await supabase
    .from("transactions")
    .update({ stage: nextStage })
    .eq("id", transactionId)
    .eq("user_id", user.id)
    .select("id, stage, status, closing_date, created_at, updated_at, property_id, user_id, role")
    .single();

  if (updateErr || !updated) return { ok: false, error: updateErr?.message ?? "Update failed" };

  const taskTemplates = getTasksForStage(nextStage);
  if (taskTemplates.length > 0) {
    const { data: existing } = await supabase
      .from("tasks")
      .select("title")
      .eq("transaction_id", transactionId);

    const existingTitles = new Set((existing ?? []).map((t) => t.title));

    const tasksToInsert = taskTemplates
      .filter((t) => !existingTitles.has(t.title))
      .map((t) => {
        let dueDate: string | null = null;
        if (t.dueOffsetDays !== undefined) {
          const d = new Date();
          d.setDate(d.getDate() + t.dueOffsetDays);
          dueDate = d.toISOString().slice(0, 10);
        }
        return {
          transaction_id: transactionId,
          title: t.title,
          description: t.description,
          due_date: dueDate,
          completed: false,
        };
      });

    if (tasksToInsert.length > 0) {
      await supabase.from("tasks").insert(tasksToInsert);
    }
  }

  const svc = createServiceRoleClient();
  await svc.from("audit_logs").insert({
    user_id: user.id,
    action: "transaction_stage_change",
    metadata: { transaction_id: transactionId, previous_stage: tx.stage, new_stage: nextStage },
  });

  await calculateRiskScore(transactionId);

  revalidatePath(`/dashboard/transactions/${transactionId}`);
  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard");

  return { ok: true, transaction: updated as TransactionRow };
}

/** Wrapper for advanceTransactionStage. Returns ok/error only. */
export async function advanceStage(transactionId: string): Promise<AdvanceStageResult> {
  const result = await advanceTransactionStage(transactionId);
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function cancelTransaction(transactionId: string): Promise<AdvanceStageResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  const { data: tx, error: txErr } = await supabase
    .from("transactions")
    .select("id, stage")
    .eq("id", transactionId)
    .eq("user_id", user.id)
    .single();

  if (txErr || !tx) return { ok: false, error: "Transaction not found" };
  if (!canTransitionTo(tx.stage, "cancelled")) return { ok: false, error: "Invalid transition" };

  const { error: updateErr } = await supabase
    .from("transactions")
    .update({ stage: "cancelled", status: "cancelled" })
    .eq("id", transactionId)
    .eq("user_id", user.id);

  if (updateErr) return { ok: false, error: updateErr.message };

  const svc = createServiceRoleClient();
  await svc.from("audit_logs").insert({
    user_id: user.id,
    action: "transaction_cancelled",
    metadata: { transaction_id: transactionId, previous_stage: tx.stage },
  });

  revalidatePath(`/dashboard/transactions/${transactionId}`);
  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function toggleTask(
  taskId: string,
  completed: boolean,
  transactionId: string
): Promise<AdvanceStageResult> {
  const parsed = toggleTaskInputSchema.safeParse({ taskId, completed, transactionId });
  if (!parsed.success) return { ok: false, error: "Invalid input" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  const { data: task, error: taskErr } = await supabase
    .from("tasks")
    .select("id")
    .eq("id", taskId)
    .single();

  if (taskErr || !task) return { ok: false, error: "Task not found" };

  const { data: tx } = await supabase
    .from("transactions")
    .select("user_id")
    .eq("id", transactionId)
    .single();
  if (!tx || tx.user_id !== user.id) return { ok: false, error: "Unauthorized transaction access" };

  const { error: updateErr } = await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", taskId);

  if (updateErr) return { ok: false, error: updateErr.message };

  await calculateRiskScore(transactionId);

  revalidatePath(`/dashboard/transactions/${transactionId}`);
  revalidatePath("/dashboard/transactions");
  revalidatePath("/dashboard/tasks");
  return { ok: true };
}

export async function getTransactionRiskScore(transactionId: string): Promise<number> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;

  const [{ data: flags }, { data: offers }] = await Promise.all([
    supabase
      .from("risk_flags")
      .select("severity")
      .eq("transaction_id", transactionId)
      .eq("resolved", false),
    supabase
      .from("offers")
      .select("risk_score")
      .eq("transaction_id", transactionId)
      .order("risk_score", { ascending: false })
      .limit(1),
  ]);

  const unresolved = (flags ?? []).map((f) => ({ severity: f.severity as "low" | "medium" | "high" }));
  const offerScore = offers?.[0]?.risk_score ?? undefined;
  return computeRiskScore(unresolved, typeof offerScore === "number" ? offerScore : undefined);
}

export type RecalculateRiskResult =
  | { ok: true; riskScore: number }
  | { ok: false; error: string };

/**
 * Calculate risk score from MVP factors and persist to transactions.risk_score.
 * - No contract in under_contract stage
 * - No inspection response in due_diligence stage
 * - Overdue tasks
 * - Unresolved high-severity risk_flags
 */
export async function calculateRiskScore(
  transactionId: string
): Promise<RecalculateRiskResult> {
  const parsed = transactionIdSchema.safeParse(transactionId);
  if (!parsed.success) return { ok: false, error: "Invalid transaction ID" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  const { data: tx, error: txErr } = await supabase
    .from("transactions")
    .select("id, stage, user_id")
    .eq("id", transactionId)
    .eq("user_id", user.id)
    .single();

  if (txErr || !tx) return { ok: false, error: "Transaction not found" };

  const today = new Date().toISOString().slice(0, 10);

  const [{ data: docs }, { data: tasks }, { data: flags }] = await Promise.all([
    supabase.from("documents").select("doc_type").eq("transaction_id", transactionId),
    supabase.from("tasks").select("due_date, completed").eq("transaction_id", transactionId),
    supabase
      .from("risk_flags")
      .select("severity")
      .eq("transaction_id", transactionId)
      .eq("resolved", false),
  ]);

  const documentTypes = (docs ?? []).map((d) => d.doc_type);
  const overdueCount = (tasks ?? []).filter(
    (t) => !t.completed && t.due_date && t.due_date < today
  ).length;
  const unresolvedHighCount = (flags ?? []).filter((f) => f.severity === "high").length;

  const riskScore = computeRiskFromFactors({
    stage: tx.stage,
    documentTypes,
    overdueTaskCount: overdueCount,
    unresolvedHighFlagCount: unresolvedHighCount,
  });

  const { error: updateErr } = await supabase
    .from("transactions")
    .update({ risk_score: riskScore })
    .eq("id", transactionId)
    .eq("user_id", user.id);

  if (updateErr) return { ok: false, error: updateErr.message };

  revalidatePath(`/dashboard/transactions/${transactionId}`);
  revalidatePath("/dashboard/transactions");

  return { ok: true, riskScore };
}

/** Recalculate and persist risk score. Alias for calculateRiskScore. */
export async function recalculateRiskAction(
  transactionId: string
): Promise<RecalculateRiskResult> {
  return calculateRiskScore(transactionId);
}

/** Advance stage. Alias for advanceTransactionStage. */
export const advanceStageAction = advanceTransactionStage;

/** Toggle task completion. Alias for toggleTask. */
export async function toggleTaskCompletion(
  taskId: string,
  completed: boolean,
  transactionId: string
): Promise<AdvanceStageResult> {
  return toggleTask(taskId, completed, transactionId);
}
