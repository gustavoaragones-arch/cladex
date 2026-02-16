-- Add derived risk_score to transactions (0-100, updated by calculateRiskScore)
ALTER TABLE transactions
ADD COLUMN IF NOT EXISTS risk_score smallint NOT NULL DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100);
