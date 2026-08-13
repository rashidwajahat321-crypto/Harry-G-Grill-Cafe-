import { createClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY client. Import this exclusively inside app/api/**\/route.ts files.
 * It uses the service_role key, which bypasses Row Level Security entirely —
 * that's intentional (it's how order writes get past the "no public writes"
 * policies in supabase/schema.sql), but it means this file must never be
 * imported into any "use client" component or otherwise bundled for the browser.
 */
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase server env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false }
  });
}
