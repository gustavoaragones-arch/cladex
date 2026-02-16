import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

/**
 * Service role client. Bypasses RLS.
 * Use only for server-side ops that require elevated access (e.g. audit_logs insert).
 * Never expose to the client.
 */
export const createServiceRoleClient = () =>
  createClient(url, serviceRoleKey, { auth: { persistSession: false } });
