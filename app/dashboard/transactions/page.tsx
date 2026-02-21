import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatStageLabel } from "@/lib/transaction/helpers";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";

function getAddress(tx: { properties: unknown }): string {
  const props = tx.properties as unknown;
  if (!Array.isArray(props) || !props[0] || typeof props[0] !== "object" || !("address" in props[0])) {
    return "—";
  }
  return (props[0] as { address: string }).address;
}

export default async function TransactionsPage() {
  await requireUser();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: transactions } = await supabase
    .from("transactions")
    .select(`
      id,
      stage,
      status,
      risk_score,
      closing_date,
      created_at,
      properties(address)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Transactions</h1>
          <p className="mt-1 text-muted-foreground">
            Your active and past transactions.
          </p>
        </div>
        <Link href="/onboarding">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Transaction
          </Button>
        </Link>
      </div>

      {!transactions || transactions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          <p>No transactions yet.</p>
          <Link href="/onboarding" className="mt-4 inline-block">
            <Button variant="outline">Create your first transaction</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 font-medium text-foreground">Property</th>
                <th className="px-4 py-3 font-medium text-foreground">Stage</th>
                <th className="px-4 py-3 font-medium text-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-foreground">Risk score</th>
                <th className="px-4 py-3 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{getAddress(tx)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatStageLabel(tx.stage)}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{tx.status}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        (tx.risk_score ?? 0) >= 70
                          ? "text-destructive"
                          : (tx.risk_score ?? 0) >= 40
                            ? "text-amber-600"
                            : "text-muted-foreground"
                      }
                    >
                      {tx.risk_score ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/transactions/${tx.id}`}
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      View
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
