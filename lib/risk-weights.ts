/**
 * Offer Risk Engine — weight configuration.
 * Weights must sum to 100. Used for deterministic, auditable scoring.
 * Future: allow admin override (not implemented).
 */

export const RISK_WEIGHTS = {
  financing: 25,
  downPayment: 15,
  contingencies: 20,
  timeline: 10,
  appraisalGap: 15,
  priceStrength: 15,
} as const;

const SUM =
  RISK_WEIGHTS.financing +
  RISK_WEIGHTS.downPayment +
  RISK_WEIGHTS.contingencies +
  RISK_WEIGHTS.timeline +
  RISK_WEIGHTS.appraisalGap +
  RISK_WEIGHTS.priceStrength;

if (SUM !== 100) {
  throw new Error(`RISK_WEIGHTS must sum to 100; got ${SUM}`);
}

export type RiskWeightKey = keyof typeof RISK_WEIGHTS;
