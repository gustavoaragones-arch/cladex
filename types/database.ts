export type UserRole = 'buyer' | 'seller' | 'both'
export type TransactionStage =
  | 'intake' | 'pricing' | 'listing' | 'offers'
  | 'contract' | 'inspection' | 'closing' | 'completed'
export type TransactionStatus = 'active' | 'paused' | 'cancelled' | 'closed'
export type RiskSeverity = 'low' | 'medium' | 'high'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: { id: string; email: string; role: UserRole; created_at: string }
        Insert: { id: string; email: string; role?: UserRole; created_at?: string }
        Update: { email?: string; role?: UserRole }
      }
      properties: {
        Row: { id: string; user_id: string; address: string; estimated_value: number | null; mortgage_balance: number | null; state: string | null; hoa: boolean; created_at: string }
        Insert: { id?: string; user_id: string; address: string; estimated_value?: number | null; mortgage_balance?: number | null; state?: string | null; hoa?: boolean }
        Update: { address?: string; estimated_value?: number | null; mortgage_balance?: number | null; state?: string | null; hoa?: boolean }
      }
      transactions: {
        Row: { id: string; property_id: string; user_id: string; role: UserRole; stage: TransactionStage; status: TransactionStatus; closing_date: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; property_id: string; user_id: string; role: UserRole; stage?: TransactionStage; status?: TransactionStatus; closing_date?: string | null }
        Update: { stage?: TransactionStage; status?: TransactionStatus; closing_date?: string | null; updated_at?: string }
      }
      offers: {
        Row: { id: string; transaction_id: string; price: number; financing_type: string | null; down_payment_percent: number | null; contingencies_count: number; closing_days: number | null; appraisal_gap: number | null; risk_score: number | null; created_at: string }
        Insert: { id?: string; transaction_id: string; price: number; financing_type?: string | null; down_payment_percent?: number | null; contingencies_count?: number; closing_days?: number | null; appraisal_gap?: number | null; risk_score?: number | null }
        Update: { price?: number; financing_type?: string | null; down_payment_percent?: number | null; contingencies_count?: number; closing_days?: number | null; appraisal_gap?: number | null; risk_score?: number | null }
      }
      tasks: {
        Row: { id: string; transaction_id: string; title: string; description: string | null; due_date: string | null; completed: boolean; created_at: string }
        Insert: { id?: string; transaction_id: string; title: string; description?: string | null; due_date?: string | null; completed?: boolean }
        Update: { title?: string; description?: string | null; due_date?: string | null; completed?: boolean }
      }
      documents: {
        Row: { id: string; transaction_id: string; file_path: string; doc_type: string | null; uploaded_at: string }
        Insert: { id?: string; transaction_id: string; file_path: string; doc_type?: string | null }
        Update: { file_path?: string; doc_type?: string | null }
      }
      risk_flags: {
        Row: { id: string; transaction_id: string; type: string; severity: RiskSeverity; resolved: boolean; created_at: string }
        Insert: { id?: string; transaction_id: string; type: string; severity?: RiskSeverity; resolved?: boolean }
        Update: { type?: string; severity?: RiskSeverity; resolved?: boolean }
      }
      payments: {
        Row: { id: string; user_id: string; transaction_id: string | null; stripe_customer_id: string | null; stripe_payment_intent_id: string | null; amount: number | null; status: PaymentStatus; created_at: string }
        Insert: { id?: string; user_id: string; transaction_id?: string | null; stripe_customer_id?: string | null; stripe_payment_intent_id?: string | null; amount?: number | null; status?: PaymentStatus }
        Update: { stripe_customer_id?: string | null; stripe_payment_intent_id?: string | null; amount?: number | null; status?: PaymentStatus }
      }
      audit_logs: {
        Row: { id: string; user_id: string | null; action: string; metadata: Record<string, unknown> | null; created_at: string }
        Insert: { id?: string; user_id?: string | null; action: string; metadata?: Record<string, unknown> | null }
        Update: never
      }
    }
  }
}
