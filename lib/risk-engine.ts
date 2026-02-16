/**
 * Risk Radar calculation.
 * MVP: risk increases for missing documents, overdue tasks, unresolved high flags.
 * Modular for expansion.
 */

export type RiskFactors = {
  /** Transaction stage */
  stage: string;
  /** Document types present for this transaction */
  documentTypes: string[];
  /** Overdue task count (completed=false, due_date < today) */
  overdueTaskCount: number;
  /** Unresolved high-severity risk_flags count */
  unresolvedHighFlagCount: number;
};

const RISK_PENALTIES = {
  noContractInContractStage: 25,
  noInspectionInDueDiligence: 25,
  perOverdueTask: 10,
  overdueTaskCap: 30,
  perUnresolvedHighFlag: 25,
  highFlagCap: 50,
} as const;

/**
 * Compute risk score (0-100) from factors.
 * Simple MVP logic, modular for expansion.
 */
export function computeRiskFromFactors(factors: RiskFactors): number {
  let score = 0;

  if (factors.stage === "under_contract") {
    const hasContract = factors.documentTypes.some(
      (t) => t.toLowerCase().includes("contract")
    );
    if (!hasContract) score += RISK_PENALTIES.noContractInContractStage;
  }

  if (factors.stage === "due_diligence") {
    const hasInspection = factors.documentTypes.some((t) =>
      ["inspection", "inspection_report"].includes(t.toLowerCase())
    );
    if (!hasInspection) score += RISK_PENALTIES.noInspectionInDueDiligence;
  }

  const overduePenalty = Math.min(
    factors.overdueTaskCount * RISK_PENALTIES.perOverdueTask,
    RISK_PENALTIES.overdueTaskCap
  );
  score += overduePenalty;

  const highFlagPenalty = Math.min(
    factors.unresolvedHighFlagCount * RISK_PENALTIES.perUnresolvedHighFlag,
    RISK_PENALTIES.highFlagCap
  );
  score += highFlagPenalty;

  return Math.min(100, Math.round(score));
}
