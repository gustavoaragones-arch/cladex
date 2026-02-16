"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";

type OfferRow = {
  id: string;
  transactionId: string;
  address: string;
  price: number;
  financing: string;
  downPaymentPercent: number;
  riskScore: number;
  rank: number;
};

type OffersTableProps = {
  offers: OfferRow[];
};

export function OffersTable({ offers }: OffersTableProps) {
  const [compareOpen, setCompareOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (compareOpen) d.showModal();
    else d.close();
  }, [compareOpen]);

  if (offers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
        No offers yet. Add offers to transactions to see them here.
      </div>
    );
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(n);

  return (
    <>
      <p className="mb-4 text-xs text-muted-foreground max-w-xl">
        Risk analysis is informational only and does not constitute legal or financial advice.
      </p>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 font-medium text-foreground">Rank</th>
              <th className="px-4 py-3 font-medium text-foreground">Property</th>
              <th className="px-4 py-3 font-medium text-foreground">Price</th>
              <th className="px-4 py-3 font-medium text-foreground">Financing</th>
              <th className="px-4 py-3 font-medium text-foreground">Down payment</th>
              <th className="px-4 py-3 font-medium text-foreground">Risk score</th>
              <th className="px-4 py-3 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 text-muted-foreground">{o.rank}</td>
                <td className="px-4 py-3 font-medium text-foreground">{o.address}</td>
                <td className="px-4 py-3">{formatCurrency(o.price)}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.financing}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.downPaymentPercent}%</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      o.riskScore >= 70
                        ? "text-destructive"
                        : o.riskScore >= 40
                          ? "text-amber-600"
                          : "text-muted-foreground"
                    }
                  >
                    {o.riskScore}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCompareOpen(true)}
                    className="flex items-center gap-1"
                  >
                    <Scale className="h-4 w-4" />
                    Compare
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setCompareOpen(false)}
        className="rounded-lg border border-border bg-background p-6 shadow-lg backdrop:bg-black/50"
        style={{ maxWidth: "90vw" }}
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Compare offers</h2>
          <p className="text-sm text-muted-foreground">
            Compare modal placeholder. Select offers to compare side by side.
          </p>
          <Button variant="outline" onClick={() => setCompareOpen(false)}>
            Close
          </Button>
        </div>
      </dialog>
    </>
  );
}
