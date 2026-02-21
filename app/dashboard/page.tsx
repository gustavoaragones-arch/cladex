import { redirect } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { getTransactionDisplayData } from "@/lib/transaction/display";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: txList } = await supabase
    .from("transactions")
    .select(`
      id,
      stage,
      status,
      risk_score,
      closing_date,
      properties(address)
    `)
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(5);

  if (!txList || txList.length === 0) {
    redirect("/onboarding");
  }

  const activeTx = txList[0];
  const props = activeTx.properties as unknown;
  const address = Array.isArray(props) && props[0] && typeof props[0] === "object" && "address" in props[0]
    ? (props[0] as { address: string }).address
    : "";

  const display = getTransactionDisplayData(activeTx.stage, activeTx.status);

  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, title, due_date, completed")
    .eq("transaction_id", activeTx.id)
    .order("due_date", { ascending: true })
    .limit(5);

  const overdueTasks = (tasks ?? []).filter(
    (t) => !t.completed && t.due_date && t.due_date < new Date().toISOString().slice(0, 10)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back{user.email ? `, ${user.email}` : ""}.
        </p>
      </div>

      <section>
        <h2 className="text-sm font-medium text-foreground mb-3">Active transaction</h2>
        <Link
          href={`/dashboard/transactions/${activeTx.id}`}
          className="block rounded-lg border border-border bg-card p-4 hover:bg-accent/50"
        >
          <p className="font-medium text-foreground">{address || "Transaction"}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {display.currentStageLabel} · {activeTx.status}
          </p>
        </Link>
      </section>

      <section>
        <h2 className="text-sm font-medium text-foreground mb-3">Stage progress</h2>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-[width]"
                style={{ width: `${display.stageProgressPercent}%` }}
              />
            </div>
            <span className="text-sm font-medium tabular-nums">{display.stageProgressPercent}%</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{display.currentStageLabel}</p>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-foreground mb-3">Risk score</h2>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full ${
                  (activeTx.risk_score ?? 0) >= 70
                    ? "bg-destructive"
                    : (activeTx.risk_score ?? 0) >= 40
                      ? "bg-amber-500"
                      : "bg-primary"
                }`}
                style={{ width: `${activeTx.risk_score ?? 0}%` }}
              />
            </div>
            <span className="text-sm font-medium tabular-nums">{activeTx.risk_score ?? 0}/100</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-foreground mb-3">Financial snapshot</h2>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Summary coming soon.</p>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-foreground mb-3">Upcoming deadlines</h2>
        <div className="rounded-lg border border-border bg-card p-4">
          {overdueTasks.length > 0 ? (
            <ul className="space-y-2">
              {overdueTasks.slice(0, 3).map((t) => (
                <li key={t.id} className="text-sm">
                  <span className="text-destructive font-medium">{t.title}</span>
                  <span className="text-muted-foreground ml-2">Due {t.due_date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No overdue tasks.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-foreground mb-3">Recent activity</h2>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Recent activity feed coming soon.</p>
        </div>
      </section>

      <div>
        <Link href={`/dashboard/transactions/${activeTx.id}`}>
          <Button>View transaction</Button>
        </Link>
      </div>
    </div>
  );
}
