import Stripe from "stripe";

function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  return new Stripe(secretKey, {
    apiVersion: "2023-10-16",
    typescript: true,
  });
}

/** Use in API routes; null if STRIPE_SECRET_KEY is not set. */
export const stripe = getStripe();

/**
 * Placeholder: create a checkout session.
 * Replace with real product/price IDs when implementing payments.
 */
export async function createCheckoutSession(_params: {
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}): Promise<{ url: string | null }> {
  // TODO: implement with Stripe Products/Prices
  return { url: null };
}
