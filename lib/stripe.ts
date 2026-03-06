// Stripe scaffold — Phase 7 implements full payment logic
import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key || key === 'sk_test_placeholder') throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(key, { apiVersion: '2025-02-24.acacia', typescript: true })
  }
  return _stripe
}

// PLACEHOLDER: Full implementation in Phase 7
export async function createCheckoutSession(_params: {
  userId: string
  tier: 'toolkit' | 'premium' | 'concierge'
  transactionId: string
}): Promise<{ url: string | null }> {
  console.warn('createCheckoutSession: not yet implemented (Phase 7)')
  return { url: null }
}
