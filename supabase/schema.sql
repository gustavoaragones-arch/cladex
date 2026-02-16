-- Extensions
-- (gen_random_uuid() is built-in in Postgres 13+; Supabase has it)

-- Enums
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'both');
CREATE TYPE transaction_stage AS ENUM (
  'intake',
  'listing',
  'offer',
  'under_contract',
  'due_diligence',
  'closing',
  'closed',
  'cancelled'
);
CREATE TYPE transaction_status AS ENUM ('active', 'pending', 'completed', 'cancelled');
CREATE TYPE risk_severity AS ENUM ('low', 'medium', 'high');
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'refunded', 'cancelled');

-- Tables
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role user_role NOT NULL DEFAULT 'both',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  address text NOT NULL,
  estimated_value numeric(14, 2),
  mortgage_balance numeric(14, 2),
  state text,
  hoa boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  stage transaction_stage NOT NULL DEFAULT 'intake',
  status transaction_status NOT NULL DEFAULT 'active',
  closing_date date,
  risk_score smallint NOT NULL DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  price numeric(14, 2) NOT NULL,
  financing_type text,
  down_payment_percent numeric(5, 2) NOT NULL CHECK (down_payment_percent >= 0 AND down_payment_percent <= 100),
  contingencies_count smallint NOT NULL DEFAULT 0,
  closing_days smallint NOT NULL DEFAULT 0,
  appraisal_gap numeric(14, 2),
  risk_score smallint NOT NULL DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date date,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  doc_type text NOT NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON COLUMN documents.file_path IS 'Storage bucket path only; generate signed URLs server-side.';

CREATE TABLE risk_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  type text NOT NULL,
  severity risk_severity NOT NULL,
  resolved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transaction_id uuid NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_payment_intent_id text,
  amount numeric(14, 2) NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_properties_created_at ON properties(created_at);

CREATE INDEX idx_transactions_property_id ON transactions(property_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_stage ON transactions(stage);
CREATE INDEX idx_transactions_status ON transactions(status);

CREATE INDEX idx_offers_transaction_id ON offers(transaction_id);
CREATE INDEX idx_offers_risk_score ON offers(risk_score);

CREATE INDEX idx_tasks_transaction_id ON tasks(transaction_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

CREATE INDEX idx_documents_transaction_id ON documents(transaction_id);

CREATE INDEX idx_risk_flags_transaction_id ON risk_flags(transaction_id);
CREATE INDEX idx_risk_flags_resolved ON risk_flags(resolved);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_payments_created_at ON payments(created_at);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- Triggers
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Stage-change audit: do server-side with service_role when updating transaction.stage; RLS blocks trigger inserts.

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies: users (own row only)
CREATE POLICY users_select_own ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY users_insert_own ON users
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY users_update_own ON users
  FOR UPDATE USING (auth.uid() = id);

-- Policies: properties (own rows)
CREATE POLICY properties_select_own ON properties
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY properties_insert_own ON properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY properties_update_own ON properties
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY properties_delete_own ON properties
  FOR DELETE USING (auth.uid() = user_id);

-- Policies: transactions (own rows)
CREATE POLICY transactions_select_own ON transactions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY transactions_insert_own ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY transactions_update_own ON transactions
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY transactions_delete_own ON transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Policies: offers (via transaction ownership)
CREATE POLICY offers_select_own ON offers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = offers.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY offers_insert_own ON offers
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = offers.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY offers_update_own ON offers
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = offers.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY offers_delete_own ON offers
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = offers.transaction_id AND t.user_id = auth.uid())
  );

-- Policies: tasks (via transaction ownership)
CREATE POLICY tasks_select_own ON tasks
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = tasks.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY tasks_insert_own ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = tasks.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY tasks_update_own ON tasks
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = tasks.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY tasks_delete_own ON tasks
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = tasks.transaction_id AND t.user_id = auth.uid())
  );

-- Policies: documents (via transaction ownership)
CREATE POLICY documents_select_own ON documents
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = documents.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY documents_insert_own ON documents
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = documents.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY documents_update_own ON documents
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = documents.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY documents_delete_own ON documents
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = documents.transaction_id AND t.user_id = auth.uid())
  );

-- Policies: risk_flags (via transaction ownership)
CREATE POLICY risk_flags_select_own ON risk_flags
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = risk_flags.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY risk_flags_insert_own ON risk_flags
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = risk_flags.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY risk_flags_update_own ON risk_flags
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = risk_flags.transaction_id AND t.user_id = auth.uid())
  );
CREATE POLICY risk_flags_delete_own ON risk_flags
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM transactions t WHERE t.id = risk_flags.transaction_id AND t.user_id = auth.uid())
  );

-- Policies: payments (SELECT own only; INSERT/UPDATE only via service role, no anon/key policy)
CREATE POLICY payments_select_own ON payments
  FOR SELECT USING (auth.uid() = user_id);
-- No INSERT or UPDATE policies for anon/authenticated; use service_role for server-side only.

-- Policies: audit_logs (SELECT own only; INSERT only via service role)
CREATE POLICY audit_logs_select_own ON audit_logs
  FOR SELECT USING (auth.uid() = user_id);
-- No INSERT policy for anon/authenticated; use service_role for server-side audit writes.
