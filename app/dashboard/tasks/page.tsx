import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { groupTasksByStage } from "@/lib/transaction";
import { TasksPageClient } from "./tasks-page-client";

export default async function TasksPage() {
  await requireUser();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: transactions } = await supabase
    .from("transactions")
    .select("id")
    .eq("user_id", user.id);

  const txIds = (transactions ?? []).map((t) => t.id);
  let tasks: { id: string; transaction_id: string; title: string; description: string | null; due_date: string | null; completed: boolean }[] = [];
  if (txIds.length > 0) {
    const res = await supabase
      .from("tasks")
      .select("id, transaction_id, title, description, due_date, completed")
      .in("transaction_id", txIds)
      .order("created_at", { ascending: true });
    tasks = (res.data ?? []) as typeof tasks;
  }

  const tasksForGrouping = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    due_date: t.due_date,
    completed: t.completed,
  }));

  const tasksByStage = groupTasksByStage(tasksForGrouping);

  const taskTxMap = new Map(tasks.map((t) => [t.id, t.transaction_id]));

  const groupedWithTx = tasksByStage.map((g) => ({
    ...g,
    tasks: g.tasks.map((t) => ({
      ...t,
      transactionId: taskTxMap.get(t.id) ?? "",
    })),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Tasks</h1>
        <p className="mt-1 text-muted-foreground">
          Tasks grouped by transaction stage.
        </p>
      </div>
      <TasksPageClient tasksByStage={groupedWithTx} />
    </div>
  );
}
