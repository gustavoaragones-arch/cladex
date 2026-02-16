"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type OnboardingInput = {
  role: "buyer" | "seller" | "both";
  address: string;
  estimated_value: number | null;
  mortgage_balance: number | null;
  state: string | null;
  hoa: boolean;
};

export type OnboardingResult = { ok: true } | { ok: false; error: string };

export async function completeOnboarding(input: OnboardingInput): Promise<OnboardingResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!existingUser) {
    const { error: userErr } = await supabase.from("users").insert({
      id: user.id,
      email: user.email ?? "",
      role: input.role,
    });
    if (userErr) return { ok: false, error: userErr.message };
  } else {
    const { error: userErr } = await supabase
      .from("users")
      .update({ role: input.role })
      .eq("id", user.id);
    if (userErr) return { ok: false, error: userErr.message };
  }

  const { data: property, error: propErr } = await supabase
    .from("properties")
    .insert({
      user_id: user.id,
      address: input.address,
      estimated_value: input.estimated_value,
      mortgage_balance: input.mortgage_balance,
      state: input.state,
      hoa: input.hoa,
    })
    .select("id")
    .single();

  if (propErr || !property) return { ok: false, error: propErr?.message ?? "Failed to create property" };

  const { error: txErr } = await supabase.from("transactions").insert({
    property_id: property.id,
    user_id: user.id,
    role: input.role,
    stage: "intake",
    status: "active",
  });

  if (txErr) return { ok: false, error: txErr.message };

  revalidatePath("/dashboard");
  revalidatePath("/onboarding");
  return { ok: true };
}
