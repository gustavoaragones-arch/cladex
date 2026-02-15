/**
 * Supabase client exports.
 * Use createClient() from lib/supabase/client in Client Components.
 * Use createClient() from lib/supabase/server in Server Components / Route Handlers.
 */

export { createClient as createBrowserClient } from "./supabase/client";
export { createClient as createServerClient } from "./supabase/server";
