"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Scale, Calculator } from "lucide-react";
import { scoreOfferAction } from "./actions";
import type { OfferRiskEvaluation } from "@/lib/offer-risk-engine";

type OfferRow = {
  id: string;
  transactionId: string;
  address: string;
  price: number;
  financing: string;
  downPaymentPercent: number;
  riskScore: number;
  rank: number | null;
  riskBreakdown: Record<string, number> | null;
  riskExplanation: Record<string, string> | null;
  netProceeds: number | null;
};

type OffersTableProps = {
  offers: OfferRow[];
};

export function OffersTable({ offers }: OffersTableProps) {
  const router = useRouter();
  const [compareOpen, setCompareOpen] = useState(false);
  const [evaluateOpen, setEvaluateOpen] = useState(false);
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<OfferRiskEvaluation | null>(null);
  const [evaluateError, setEvaluateError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const evalDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (compareOpen) d.showModal();
    else d.close();
  }, [compareOpen]);

  useEffect(() => {
    const d = evalDialogRef.current;
    if (!d) return;
    if (evaluateOpen) d.showModal();
    else d.close();
  }, [evaluateOpen]);

  async function handleEvaluate(offerId: string) {
    setEvaluatingId(offerId);
    setEvaluateError(null);
    setEvaluation(null);
    setEvaluateOpen(true);
    const result = await scoreOfferAction(offerId);
    setEvaluatingId(null);
    if (result.ok) {
      setEvaluation(result.evaluation);
      router.refresh();
    } else {
      setEvaluateError(result.error);
    }
  }

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
                <td className="px-4 py-3 text-muted-foreground">
                  {o.rank != null ? o.rank : "—"}
                </td>
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
                <td className="px-4 py-3 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEvaluate(o.id)}
                    disabled={evaluatingId === o.id}
                    className="flex items-center gap-1"
                  >
                    <Calculator className="h-4 w-4" />
                    {evaluatingId === o.id ? "Evaluating…" : "Evaluate"}
                  </Button>
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

      {/* Compare modal (placeholder) */}
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

      {/* Evaluation result modal */}
      <dialog
        ref={evalDialogRef}
        onClose={() => {
          setEvaluateOpen(false);
          setEvaluation(null);
          setEvaluateError(null);
        }}
        className="rounded-lg border border-border bg-background p-6 shadow-lg backdrop:bg-black/50 max-w-2xl"
      >
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Offer risk evaluation</h2>

          {evaluateError && (
            <p className="text-sm text-destructive">{evaluateError}</p>
          )}

          {evaluation && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">Risk score</p>
                  <p className="text-2xl font-semibold tabular-nums text-foreground">
                    {evaluation.riskScore}
                  </p>
                </div>
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">Net proceeds</p>
                  <p className="text-2xl font-semibold tabular-nums text-foreground">
                    {formatCurrency(evaluation.netProceeds)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">Breakdown</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  {Object.entries(evaluation.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between rounded border border-border px-3 py-2">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-medium tabular-nums">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">Factor explanations</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {Object.entries(evaluation.explanation)
                    .filter(([k]) => k !== "disclaimer")
                    .map(([key, text]) => (
                      <li key={key}>
                        <span className="font-medium text-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>{" "}
                        {text}
                      </li>
                    ))}
                </ul>
              </div>

              <p className="text-xs text-muted-foreground border-t border-border pt-4">
                {evaluation.explanation.disclaimer}
              </p>
            </>
          )}

          {evaluatingId && !evaluation && !evaluateError && (
            <p className="text-sm text-muted-foreground">Evaluating…</p>
          )}

          <Button
            variant="outline"
            onClick={() => {
              setEvaluateOpen(false);
              setEvaluation(null);
              setEvaluateError(null);
            }}
          >
            Close
          </Button>
        </div>
      </dialog>
    </>
  );
}
