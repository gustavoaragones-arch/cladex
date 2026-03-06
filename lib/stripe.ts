// Stripe scaffold — Phase 7 implements full payment logic
// Do NOT add checkout, subscription, or billing logic here yet

import Stripe from 'stripe'

let _stripe: Stripe | null = null

/** Lazy-initialized so build succeeds without STRIPE_SECRET_KEY. */
export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }
  return _stripe
}

// PLACEHOLDER: Checkout session creator
// Full implementation in Phase 7
export async function createCheckoutSession(_params: {
  userId: string
  tier: 'toolkit' | 'premium' | 'concierge'
  transactionId: string
}): Promise<{ url: string | null }> {
  // Phase 7 implements this
  console.warn('createCheckoutSession: not yet implemented (Phase 7)')
  return { url: null }
}
