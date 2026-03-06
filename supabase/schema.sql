-- Paste this SQL into Supabase SQL Editor and run it.
-- Phase 1 infrastructure — run after deploying the app.

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'both');
CREATE TYPE transaction_stage AS ENUM ('intake','pricing','listing','offers','contract','inspection','closing','completed');
CREATE TYPE transaction_status AS ENUM ('active','paused','cancelled','closed');
CREATE TYPE risk_severity AS ENUM ('low','medium','high');
CREATE TYPE payment_status AS ENUM ('pending','paid','failed','refunded');

-- USERS
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role user_role DEFAULT 'seller',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX users_email_idx ON public.users(email);

-- PROPERTIES
CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  address text NOT NULL,
  estimated_value numeric,
  mortgage_balance numeric,
  state text,
  hoa boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX properties_user_id_idx ON public.properties(user_id);

-- TRANSACTIONS
CREATE TABLE public.transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  stage transaction_stage DEFAULT 'intake',
  status transaction_status DEFAULT 'active',
  closing_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX transactions_user_id_idx ON public.transactions(user_id);
CREATE INDEX transactions_property_id_idx ON public.transactions(property_id);

-- AUTO-UPDATE updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ language 'plpgsql';
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- OFFERS
CREATE TABLE public.offers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id uuid NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  price numeric NOT NULL,
  financing_type text,
  down_payment_percent numeric CHECK (down_payment_percent BETWEEN 0 AND 100),
  contingencies_count integer DEFAULT 0,
  closing_days integer,
  appraisal_gap numeric,
  risk_score integer CHECK (risk_score BETWEEN 0 AND 100),
  created_at timestamptz DEFAULT now()
);
CREATE INDEX offers_transaction_id_idx ON public.offers(transaction_id);

-- TASKS
CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id uuid NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date date,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX tasks_transaction_id_idx ON public.tasks(transaction_id);

-- DOCUMENTS
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id uuid NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  doc_type text,
  uploaded_at timestamptz DEFAULT now()
);
CREATE INDEX documents_transaction_id_idx ON public.documents(transaction_id);

-- RISK FLAGS
CREATE TABLE public.risk_flags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id uuid NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  type text NOT NULL,
  severity risk_severity DEFAULT 'low',
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX risk_flags_transaction_id_idx ON public.risk_flags(transaction_id);

-- PAYMENTS
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  transaction_id uuid REFERENCES public.transactions(id) ON DELETE SET NULL,
  stripe_customer_id text,
  stripe_payment_intent_id text,
  amount numeric,
  status payment_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX payments_user_id_idx ON public.payments(user_id);
CREATE INDEX payments_transaction_id_idx ON public.payments(transaction_id);

-- AUDIT LOGS
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX audit_logs_user_id_idx ON public.audit_logs(user_id);

-- ENABLE RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
-- users
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- properties
CREATE POLICY "properties_all_own" ON public.properties FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- transactions
CREATE POLICY "transactions_all_own" ON public.transactions FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- offers
CREATE POLICY "offers_all_own" ON public.offers FOR ALL
  USING (EXISTS (SELECT 1 FROM public.transactions WHERE transactions.id = offers.transaction_id AND transactions.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.transactions WHERE transactions.id = offers.transaction_id AND transactions.user_id = auth.uid()));

-- tasks
CREATE POLICY "tasks_all_own" ON public.tasks FOR ALL
  USING (EXISTS (SELECT 1 FROM public.transactions WHERE transactions.id = tasks.transaction_id AND transactions.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.transactions WHERE transactions.id = tasks.transaction_id AND transactions.user_id = auth.uid()));

-- documents
CREATE POLICY "documents_all_own" ON public.documents FOR ALL
  USING (EXISTS (SELECT 1 FROM public.transactions WHERE transactions.id = documents.transaction_id AND transactions.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.transactions WHERE transactions.id = documents.transaction_id AND transactions.user_id = auth.uid()));

-- risk_flags
CREATE POLICY "risk_flags_all_own" ON public.risk_flags FOR ALL
  USING (EXISTS (SELECT 1 FROM public.transactions WHERE transactions.id = risk_flags.transaction_id AND transactions.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.transactions WHERE transactions.id = risk_flags.transaction_id AND transactions.user_id = auth.uid()));

-- payments
CREATE POLICY "payments_select_own" ON public.payments FOR SELECT USING (auth.uid() = user_id);

-- audit_logs: no insert policy — service role only
CREATE POLICY "audit_logs_select_own" ON public.audit_logs FOR SELECT USING (auth.uid() = user_id);

-- USER PROFILE AUTO-CREATE TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'seller')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
