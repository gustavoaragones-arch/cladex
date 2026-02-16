/**
 * Display helpers for transaction UI. Server-only — derives from stage logic.
 * Does not expose internal stage mapping to client; only labels and progress.
 */

import { getNextStage } from "@/lib/transaction-engine";
import { formatStageLabel } from "./helpers";
import type { TransactionDisplayData } from "./types";
import { TRANSACTION_STAGES } from "./types";

export function getTransactionDisplayData(
  stage: string,
  status: string
): TransactionDisplayData {
  const idx = TRANSACTION_STAGES.indexOf(stage as (typeof TRANSACTION_STAGES)[number]);
  const nextStage = getNextStage(stage);
  const isTerminal = stage === "closed";
  const isCancelled = status === "cancelled" || stage === "cancelled";
  const canAdvance = !isTerminal && !isCancelled && nextStage !== null;

  const total = TRANSACTION_STAGES.length;
  const progress = idx >= 0 ? Math.round(((idx + 1) / total) * 100) : 0;

  return {
    stageProgressPercent: Math.min(100, progress),
    currentStageLabel: formatStageLabel(stage),
    nextStageLabel: nextStage ? formatStageLabel(nextStage) : null,
    canAdvance,
    isTerminal,
    isCancelled,
  };
}
