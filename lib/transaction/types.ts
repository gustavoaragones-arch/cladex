/**
 * Transaction engine types.
 * Strict typing for stage enum — no any.
 */

export type TaskForDisplay = {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  completed: boolean;
};

export type TasksByStage = {
  stage: string;
  stageLabel: string;
  tasks: TaskForDisplay[];
}[];

export type TransactionDisplayData = {
  stageProgressPercent: number;
  currentStageLabel: string;
  nextStageLabel: string | null;
  canAdvance: boolean;
  isTerminal: boolean;
  isCancelled: boolean;
};

export const TRANSACTION_STAGES = [
  "intake",
  "listing",
  "offer",
  "under_contract",
  "due_diligence",
  "closing",
  "closed",
] as const;

export type TransactionStage = (typeof TRANSACTION_STAGES)[number];

export const TERMINAL_STAGES: readonly TransactionStage[] = ["closed"];
export const CANCELLED_STAGE = "cancelled" as const;
