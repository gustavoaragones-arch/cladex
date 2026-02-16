import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { groupTasksByStage, getTransactionDisplayData } from "@/lib/transaction";
import { TransactionDetail } from "@/components/transaction/transaction-detail";
import { advanceStage, toggleTask } from "@/app/(dashboard)/dashboard/transactions/[id]/actions";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: tx, error } = await supabase
    .from("transactions")
    .select(`
      id,
      stage,
      status,
      closing_date,
      risk_score,
      created_at,
      updated_at,
      properties(id, address)
    `)
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !tx) notFound();

  const [{ data: tasks }, { data: offers }, { data: documents }] = await Promise.all([
    supabase
      .from("tasks")
      .select("id, title, description, due_date, completed")
      .eq("transaction_id", id)
      .order("created_at", { ascending: true }),
    supabase
      .from("offers")
      .select("id, price, financing_type, down_payment_percent, risk_score")
      .eq("transaction_id", id)
      .order("price", { ascending: false }),
    supabase
      .from("documents")
      .select("id, doc_type, file_path, uploaded_at")
      .eq("transaction_id", id)
      .order("uploaded_at", { ascending: false }),
  ]);

  const riskScore = typeof tx.risk_score === "number" ? tx.risk_score : 0;
  const display = getTransactionDisplayData(tx.stage, tx.status);
  const tasksByStage = groupTasksByStage((tasks ?? []).map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    due_date: t.due_date,
    completed: t.completed,
  })));

  const property = Array.isArray(tx.properties) ? tx.properties[0] : null;
  const address =
    property && typeof property === "object" && "address" in property
      ? (property as { address: string }).address
      : "";

  const offersData = (offers ?? []).map((o, i) => ({
    id: o.id,
    price: Number(o.price),
    financing: o.financing_type ?? "—",
    downPaymentPercent: Number(o.down_payment_percent),
    riskScore: o.risk_score ?? 0,
    rank: i + 1,
  }));

  const documentsData = (documents ?? []).map((d) => ({
    id: d.id,
    docType: d.doc_type,
    filePath: d.file_path,
    uploadedAt: d.uploaded_at,
  }));

  return (
    <TransactionDetail
      transaction={{
        id: tx.id,
        address,
        display,
      }}
      tasksByStage={tasksByStage}
      riskScore={riskScore}
      offers={offersData}
      documents={documentsData}
      onAdvanceStage={advanceStage}
      onToggleTask={toggleTask}
    />
  );
}
