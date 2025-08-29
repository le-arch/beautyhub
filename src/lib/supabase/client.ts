
"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabasePublicUrl, supabasePublicAnonKey } from "./config";

export function createClient() {
  return createBrowserClient(
    supabasePublicUrl,
    supabasePublicAnonKey
  );
}
