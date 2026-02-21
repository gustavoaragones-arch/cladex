-- Offer Risk Engine: breakdown, explanation, net_proceeds, rank
-- Phase 4 — Quantitative Intelligence Core

ALTER TABLE public.offers
  ADD COLUMN IF NOT EXISTS risk_breakdown jsonb,
  ADD COLUMN IF NOT EXISTS risk_explanation jsonb,
  ADD COLUMN IF NOT EXISTS net_proceeds numeric(14, 2),
  ADD COLUMN IF NOT EXISTS rank integer;

-- risk_score already constrained 0–100 in table definition

-- Index for ranking by transaction and risk score
CREATE INDEX IF NOT EXISTS offers_risk_score_idx
  ON public.offers(transaction_id, risk_score DESC);

COMMENT ON COLUMN public.offers.risk_breakdown IS 'Per-factor weighted scores for auditability';
COMMENT ON COLUMN public.offers.risk_explanation IS 'Human-readable explanations; includes regulatory disclaimer';
COMMENT ON COLUMN public.offers.net_proceeds IS 'Estimated net proceeds (MVP: price minus placeholder costs)';
COMMENT ON COLUMN public.offers.rank IS 'Comparison rank within transaction (1 = highest risk score)';
