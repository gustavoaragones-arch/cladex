"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StageProgressBar } from "./stage-progress-bar";
import { TaskListGrouped } from "./task-list-grouped";
import { RiskRadar } from "./risk-radar";
import { Button } from "@/components/ui/button";
import type { advanceStage, toggleTask } from "@/app/(dashboard)/dashboard/transactions/[id]/actions";
import type { TransactionDisplayData } from "@/lib/transaction/types";
import type { TasksByStage } from "@/lib/transaction/types";

type OfferSummary = {
  id: string;
  price: number;
  financing: string;
  downPaymentPercent: number;
  riskScore: number;
  rank: number;
};

type DocumentSummary = {
  id: string;
  docType: string;
  filePath: string;
  uploadedAt: string;
};

type TransactionDetailProps = {
  transaction: {
    id: string;
    address: string;
    display: TransactionDisplayData;
  };
  tasksByStage: TasksByStage;
  riskScore: number;
  offers: OfferSummary[];
  documents: DocumentSummary[];
  onAdvanceStage: typeof advanceStage;
  onToggleTask: typeof toggleTask;
};

export function TransactionDetail({
  transaction,
  tasksByStage,
  riskScore,
  offers,
  documents,
  onAdvanceStage,
  onToggleTask,
}: TransactionDetailProps) {
  const [advancing, setAdvancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleAdvance() {
    setError(null);
    setAdvancing(true);
    const result = await onAdvanceStage(transaction.id);
    setAdvancing(false);
    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Transaction</h1>
        <p className="mt-1 text-sm text-muted-foreground">{transaction.address}</p>
      </div>

      <StageProgressBar
        progressPercent={transaction.display.stageProgressPercent}
        currentStageLabel={transaction.display.currentStageLabel}
        isCancelled={transaction.display.isCancelled}
      />

      <RiskRadar score={riskScore} />

      <TaskListGrouped
        tasksByStage={tasksByStage}
        transactionId={transaction.id}
        onToggleTask={onToggleTask}
      />

      {/* Offer summary */}
      <section>
        <h2 className="text-sm font-medium text-foreground mb-2">Offer summary</h2>
        {offers.length > 0 && (
          <p className="mb-3 text-xs text-muted-foreground max-w-xl">
            Risk analysis is informational only and does not constitute legal or financial advice.
          </p>
        )}
        {offers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No offers yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 font-medium text-foreground">Rank</th>
                  <th className="px-4 py-2 font-medium text-foreground">Price</th>
                  <th className="px-4 py-2 font-medium text-foreground">Financing</th>
                  <th className="px-4 py-2 font-medium text-foreground">Down payment</th>
                  <th className="px-4 py-2 font-medium text-foreground">Risk</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-2">{o.rank}</td>
                    <td className="px-4 py-2">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                      }).format(o.price)}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{o.financing}</td>
                    <td className="px-4 py-2 text-muted-foreground">{o.downPaymentPercent}%</td>
                    <td className="px-4 py-2">{o.riskScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Documents */}
      <section>
        <h2 className="text-sm font-medium text-foreground mb-2">Documents</h2>
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No documents yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2 font-medium text-foreground">Type</th>
                  <th className="px-4 py-2 font-medium text-foreground">File</th>
                  <th className="px-4 py-2 font-medium text-foreground">Signed</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d) => (
                  <tr key={d.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 capitalize">{d.docType.replace(/_/g, " ")}</td>
                    <td className="px-4 py-2 text-muted-foreground">{d.filePath.split("/").pop() ?? d.filePath}</td>
                    <td className="px-4 py-2">
                      <span className="text-muted-foreground">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {transaction.display.canAdvance && transaction.display.nextStageLabel && (
        <div>
          {error && <p className="mb-2 text-sm text-destructive">{error}</p>}
          <Button
            onClick={handleAdvance}
            disabled={advancing}
            title="Advancing stages does not replace required professional review."
          >
            {advancing ? "Advancing…" : `Advance to ${transaction.display.nextStageLabel}`}
          </Button>
        </div>
      )}
    </div>
  );
}
