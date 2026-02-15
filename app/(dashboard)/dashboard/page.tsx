import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back{user.email ? `, ${user.email}` : ""}.
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">No transactions yet.</p>
        <Link href="/dashboard" className="mt-4 inline-block">
          <Button>Create Transaction</Button>
        </Link>
      </div>
    </div>
  );
}
