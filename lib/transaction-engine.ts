/**
 * Guided Transaction Engine
 * Stage logic, transitions, task generation.
 * Server-only: no client imports. Extensible for prerequisites, branching, state-specific logic.
 */

import type { TransactionStage } from "./transaction/types";
import { stageTaskMap } from "./transaction/config";

export type { TransactionStage } from "./transaction/types";
export type { TaskTemplate } from "./transaction/config";
export { TRANSACTION_STAGES } from "./transaction/types";
export { stageTaskMap } from "./transaction/config";

const STAGE_ORDER: Record<TransactionStage, number> = {
  intake: 0,
  listing: 1,
  offer: 2,
  under_contract: 3,
  due_diligence: 4,
  closing: 5,
  closed: 6,
};

const TERMINAL_STAGES: readonly string[] = ["closed", "cancelled"];

/** Forward-only transitions. Cannot advance beyond "closed". cancelled is side exit. */
export function canTransitionTo(current: string, next: string): boolean {
  if (next === "cancelled") return !TERMINAL_STAGES.includes(current);
  const currOrder = STAGE_ORDER[current as TransactionStage];
  const nextOrder = STAGE_ORDER[next as TransactionStage];
  if (currOrder === undefined || nextOrder === undefined) return false;
  return nextOrder === currOrder + 1;
}

/** Next stage in sequence, or null if at last stage. Never returns beyond "closed". */
export function getNextStage(current: string): TransactionStage | null {
  const order = STAGE_ORDER[current as TransactionStage];
  if (order === undefined || order >= 6) return null;
  return (["intake", "listing", "offer", "under_contract", "due_diligence", "closing", "closed"] as const)[order + 1];
}

export function getTasksForStage(stage: string): { title: string; description: string | null; dueOffsetDays?: number }[] {
  return stageTaskMap[stage as TransactionStage] ?? [];
}

/** Severity weight for risk (from flags). */
const RISK_SEVERITY_WEIGHT = { low: 1, medium: 2, high: 3 } as const;

export function computeRiskScore(
  unresolvedFlags: { severity: "low" | "medium" | "high" }[],
  offerRiskScore?: number
): number {
  let score = 0;
  for (const f of unresolvedFlags) {
    score += RISK_SEVERITY_WEIGHT[f.severity] * 15;
  }
  if (offerRiskScore !== undefined && offerRiskScore > score) score = offerRiskScore;
  return Math.min(100, Math.round(score));
}
