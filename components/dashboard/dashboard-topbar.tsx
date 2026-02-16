"use client";

import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Tx = {
  id: string;
  stage: string;
  status: string;
  properties: { address: string }[] | null;
};

type DashboardTopbarProps = {
  transactions: Tx[];
};

export function DashboardTopbar({ transactions }: DashboardTopbarProps) {
  const currentTx = transactions[0];
  const address = currentTx?.properties?.[0]?.address ?? "No transaction";

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 pl-14 lg:pl-4 shrink-0">
      <div className="flex items-center gap-2">
        {currentTx ? (
          <Link
            href={`/dashboard/transactions/${currentTx.id}`}
            className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
          >
            {address}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Link>
        ) : (
          <span className="text-sm text-muted-foreground">No transaction selected</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="p-2 text-muted-foreground hover:text-foreground" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Link>
        <form action="/api/auth/signout" method="post">
          <Button variant="ghost" size="sm" type="submit">Sign out</Button>
        </form>
      </div>
    </header>
  );
}
