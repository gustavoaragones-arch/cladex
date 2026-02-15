import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

/**
 * Get current user on the server. Redirects to /login if unauthenticated.
 */
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return user;
}

/**
 * Get current user on the server. Returns null if unauthenticated.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
