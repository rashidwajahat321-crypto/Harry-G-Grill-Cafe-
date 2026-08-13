"use client";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Surfaces a clear error in the browser console during local dev / misconfigured deploys
  // instead of a cryptic Supabase client failure.
  console.warn(
    "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

// Anon-key client for use in the browser (admin login + authenticated reads).
// RLS policies restrict what this client can actually do — see supabase/schema.sql.
export const supabaseBrowser = createClient(url ?? "", anonKey ?? "");
