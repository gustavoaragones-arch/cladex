"use server";

import { revalidatePath } from "next/cache";
import { evaluateOfferRisk } from "@/lib/offer-risk-engine";
import { createClient } from "@/lib/supabase/server";

export type ScoreOfferResult =
  | { ok: true; evaluation: import("@/lib/offer-risk-engine").OfferRiskEvaluation }
  | { ok: false; error: string };

/**
 * Score a single offer: validate auth, ownership, run engine, persist, re-rank, audit.
 */
export async function scoreOfferAction(offerId: string): Promise<ScoreOfferResult> {
  const result = await evaluateOfferRisk(offerId);
  if (result.ok) {
    revalidatePath("/dashboard/offers");
    revalidatePath("/dashboard/transactions");
    return { ok: true, evaluation: result.evaluation };
  }
  const message =
    result.error === "validation" && "details" in result
      ? result.details
      : result.error === "offer_not_found"
        ? "Offer not found."
        : result.error === "unauthorized"
          ? "You do not have access to this offer."
          : "Scoring failed.";
  return { ok: false, error: message };
}

export type CompareOffersResult =
  | { ok: true; offerIds: string[] }
  | { ok: false; error: string };

/**
 * Compare offers for a transaction: validate auth and ownership, return offer IDs for display.
 * Does not run scoring; use for compare view context.
 */
export async function compareOffersAction(
  transactionId: string
): Promise<CompareOffersResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  const { data: tx } = await supabase
    .from("transactions")
    .select("id")
    .eq("id", transactionId)
    .eq("user_id", user.id)
    .single();

  if (!tx) return { ok: false, error: "Transaction not found" };

  const { data: offers } = await supabase
    .from("offers")
    .select("id")
    .eq("transaction_id", transactionId)
    .order("risk_score", { ascending: false })
    .order("price", { ascending: false });

  return { ok: true, offerIds: (offers ?? []).map((o) => o.id) };
}
