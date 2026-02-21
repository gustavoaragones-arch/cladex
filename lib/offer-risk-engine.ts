/**
 * Offer Risk Scoring Engine — deterministic, auditable, server-side only.
 * No AI. No client-side scoring. Financial-grade underwriting-style logic.
 *
 * DETERMINISTIC TEST CASE:
 *   Cash offer, 30% down, 0 contingencies, 21 days, 5% appraisal gap, 102% of estimated value
 *   → raw: financing 25, downPayment 15, contingencies 20, timeline 10, appraisalGap 15, priceStrength 15
 *   → normalized to weights: 25+15+20+10+15+15 = 100
 *   → Expected score: 100 (clamped 0–100).
 */

import { z } from "zod";
import { RISK_WEIGHTS } from "./risk-weights";

const REGULATORY_DISCLAIMER =
  "Risk analysis is informational only and does not constitute legal or financial advice.";

export type RiskBreakdown = {
  financing: number;
  downPayment: number;
  contingencies: number;
  timeline: number;
  appraisalGap: number;
  priceStrength: number;
};

export type RiskExplanation = {
  financing: string;
  downPayment: string;
  contingencies: string;
  timeline: string;
  appraisalGap: string;
  priceStrength: string;
  disclaimer: string;
};

export type OfferRiskEvaluation = {
  riskScore: number;
  netProceeds: number;
  breakdown: RiskBreakdown;
  explanation: RiskExplanation;
};

const financingScores: Record<string, number> = {
  cash: 25,
  conventional: 20,
  fha: 12,
  va: 12,
  "fha/va": 12,
  unknown: 5,
};

function getFinancingScore(financingType: string | null): number {
  if (!financingType || financingType.trim() === "") return financingScores.unknown;
  const key = financingType.toLowerCase().replace(/\s+/g, "");
  return financingScores[key] ?? financingScores.unknown;
}

function getDownPaymentScore(downPaymentPercent: number): number {
  if (downPaymentPercent >= 30) return 15;
  if (downPaymentPercent >= 20) return 12;
  if (downPaymentPercent >= 10) return 8;
  return 3;
}

function getContingenciesScore(contingenciesCount: number): number {
  if (contingenciesCount <= 0) return 20;
  if (contingenciesCount === 1) return 15;
  if (contingenciesCount === 2) return 10;
  return 5;
}

function getTimelineScore(closingDays: number): number {
  if (closingDays <= 21) return 10;
  if (closingDays <= 30) return 8;
  if (closingDays <= 45) return 5;
  return 2;
}

function getAppraisalGapScore(appraisalGap: number | null, price: number): number {
  if (price <= 0) return 5;
  if (appraisalGap == null || appraisalGap < 0) return 5;
  const pct = (appraisalGap / price) * 100;
  if (pct >= 5) return 15;
  if (pct >= 1) return 10;
  return 5;
}

function getPriceStrengthScore(price: number, estimatedValue: number | null): number {
  if (estimatedValue == null || estimatedValue <= 0) return 8;
  const pct = (price / estimatedValue) * 100;
  if (pct >= 100) return 15;
  if (pct >= 98) return 12;
  if (pct >= 95) return 8;
  return 4;
}

/** Raw factor scores 0–25, 0–15, etc. (max per factor varies). Normalize to weight contribution. */
function normalizeToWeight(rawScore: number, maxRaw: number, weight: number): number {
  if (maxRaw <= 0) return 0;
  return Math.round((rawScore / maxRaw) * weight);
}

/**
 * Compute risk evaluation from offer + property context. Pure function; no I/O.
 */
export function computeOfferRisk(params: {
  price: number;
  financingType: string | null;
  downPaymentPercent: number;
  contingenciesCount: number;
  closingDays: number;
  appraisalGap: number | null;
  estimatedValue: number | null;
}): OfferRiskEvaluation {
  const {
    price,
    financingType,
    downPaymentPercent,
    contingenciesCount,
    closingDays,
    appraisalGap,
    estimatedValue,
  } = params;

  const rawFinancing = getFinancingScore(financingType);
  const rawDownPayment = getDownPaymentScore(downPaymentPercent);
  const rawContingencies = getContingenciesScore(contingenciesCount);
  const rawTimeline = getTimelineScore(closingDays);
  const rawAppraisalGap = getAppraisalGapScore(appraisalGap, price);
  const rawPriceStrength = getPriceStrengthScore(price, estimatedValue);

  const breakdown: RiskBreakdown = {
    financing: normalizeToWeight(rawFinancing, 25, RISK_WEIGHTS.financing),
    downPayment: normalizeToWeight(rawDownPayment, 15, RISK_WEIGHTS.downPayment),
    contingencies: normalizeToWeight(rawContingencies, 20, RISK_WEIGHTS.contingencies),
    timeline: normalizeToWeight(rawTimeline, 10, RISK_WEIGHTS.timeline),
    appraisalGap: normalizeToWeight(rawAppraisalGap, 15, RISK_WEIGHTS.appraisalGap),
    priceStrength: normalizeToWeight(rawPriceStrength, 15, RISK_WEIGHTS.priceStrength),
  };

  const totalScore = Math.min(
    100,
    Math.max(
      0,
      breakdown.financing +
        breakdown.downPayment +
        breakdown.contingencies +
        breakdown.timeline +
        breakdown.appraisalGap +
        breakdown.priceStrength
    )
  );

  const netProceeds = price;

  const explanation: RiskExplanation = {
    financing: describeFinancing(financingType, rawFinancing),
    downPayment: describeDownPayment(downPaymentPercent, rawDownPayment),
    contingencies: describeContingencies(contingenciesCount, rawContingencies),
    timeline: describeTimeline(closingDays, rawTimeline),
    appraisalGap: describeAppraisalGap(appraisalGap, price, rawAppraisalGap),
    priceStrength: describePriceStrength(price, estimatedValue, rawPriceStrength),
    disclaimer: REGULATORY_DISCLAIMER,
  };

  return {
    riskScore: totalScore,
    netProceeds,
    breakdown,
    explanation,
  };
}

function describeFinancing(type: string | null, score: number): string {
  const t = type?.trim() || "unknown";
  return `Financing type: ${t}. Score ${score}/25 (higher indicates stronger financing).`;
}

function describeDownPayment(pct: number, score: number): string {
  return `Down payment ${pct}%. Score ${score}/15 (higher indicates stronger down payment).`;
}

function describeContingencies(count: number, score: number): string {
  return `${count} contingency(ies). Score ${score}/20 (fewer contingencies score higher).`;
}

function describeTimeline(days: number, score: number): string {
  return `Closing in ${days} days. Score ${score}/10 (faster close scores higher).`;
}

function describeAppraisalGap(gap: number | null, price: number, score: number): string {
  const pct = price > 0 && gap != null ? ((gap / price) * 100).toFixed(1) : "0";
  return `Appraisal gap coverage ${pct}% of price. Score ${score}/15.`;
}

function describePriceStrength(
  price: number,
  estimatedValue: number | null,
  score: number
): string {
  if (estimatedValue == null || estimatedValue <= 0) {
    return "No estimated value for comparison. Score based on default.";
  }
  const pct = ((price / estimatedValue) * 100).toFixed(1);
  return `Price at ${pct}% of estimated value. Score ${score}/15.`;
}

const offerInputSchema = z.object({
  price: z.number().positive(),
  financing_type: z.string().nullable(),
  down_payment_percent: z.number().min(0).max(100),
  contingencies_count: z.number().int().min(0),
  closing_days: z.number().int().min(0),
  appraisal_gap: z.number().min(0).nullable(),
});

export type OfferRiskEngineError =
  | { ok: false; error: "offer_not_found" }
  | { ok: false; error: "unauthorized" }
  | { ok: false; error: "validation"; details: string }
  | { ok: true; evaluation: OfferRiskEvaluation };

/**
 * Fetch offer, validate ownership, compute risk, persist, re-rank, audit.
 * Server-side only. All writes via server/client + service role for audit.
 */
export async function evaluateOfferRisk(offerId: string): Promise<OfferRiskEngineError> {
  const { createClient } = await import("@/lib/supabase/server");
  const { createServiceRoleClient } = await import("@/lib/supabase/service-role");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "unauthorized" };

  const { data: offer, error: offerErr } = await supabase
    .from("offers")
    .select(
      "id, transaction_id, price, financing_type, down_payment_percent, contingencies_count, closing_days, appraisal_gap"
    )
    .eq("id", offerId)
    .single();

  if (offerErr || !offer) return { ok: false, error: "offer_not_found" };

  const { data: tx } = await supabase
    .from("transactions")
    .select("id, user_id, property_id")
    .eq("id", offer.transaction_id)
    .single();

  if (!tx || tx.user_id !== user.id) return { ok: false, error: "unauthorized" };

  const { data: property } = await supabase
    .from("properties")
    .select("estimated_value")
    .eq("id", tx.property_id)
    .single();

  const parsed = offerInputSchema.safeParse({
    price: Number(offer.price),
    financing_type: offer.financing_type,
    down_payment_percent: Number(offer.down_payment_percent),
    contingencies_count: Number(offer.contingencies_count ?? 0),
    closing_days: Number(offer.closing_days ?? 0),
    appraisal_gap: offer.appraisal_gap != null ? Number(offer.appraisal_gap) : null,
  });

  if (!parsed.success) {
    return { ok: false, error: "validation", details: parsed.error.message };
  }

  const estimatedValue =
    property?.estimated_value != null ? Number(property.estimated_value) : null;

  const evaluation = computeOfferRisk({
    price: parsed.data.price,
    financingType: parsed.data.financing_type,
    downPaymentPercent: parsed.data.down_payment_percent,
    contingenciesCount: parsed.data.contingencies_count,
    closingDays: parsed.data.closing_days,
    appraisalGap: parsed.data.appraisal_gap,
    estimatedValue,
  });

  const { error: updateErr } = await supabase
    .from("offers")
    .update({
      risk_score: evaluation.riskScore,
      risk_breakdown: evaluation.breakdown as unknown as object,
      risk_explanation: evaluation.explanation as unknown as object,
      net_proceeds: evaluation.netProceeds,
    })
    .eq("id", offerId);

  if (updateErr) return { ok: false, error: "validation", details: updateErr.message };

  await reRankOffers(offer.transaction_id, supabase);

  const svc = createServiceRoleClient();
  await svc.from("audit_logs").insert({
    user_id: user.id,
    action: "offer_scored",
    metadata: {
      offer_id: offerId,
      risk_score: evaluation.riskScore,
      transaction_id: offer.transaction_id,
      timestamp: new Date().toISOString(),
    },
  });

  return { ok: true, evaluation };
}

/**
 * Re-rank offers within a transaction: ORDER BY risk_score DESC, price DESC.
 * Updates rank field sequentially. Uses provided supabase client (user context for RLS).
 */
export async function reRankOffers(
  transactionId: string,
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>
): Promise<void> {
  const { data: offers } = await supabase
    .from("offers")
    .select("id")
    .eq("transaction_id", transactionId)
    .order("risk_score", { ascending: false })
    .order("price", { ascending: false });

  if (!offers || offers.length === 0) return;

  for (let i = 0; i < offers.length; i++) {
    await supabase.from("offers").update({ rank: i + 1 }).eq("id", offers[i].id);
  }
}
