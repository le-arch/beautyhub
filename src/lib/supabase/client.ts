
"use client";

import { createBrowserClient } from "@supabase/ssr";

// To prevent creating a new client on every render
let client: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (client) {
    return client;
  }

  // Check if environment variables are available
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    // Return a mock client or throw an error if you want to handle this case explicitly
    // For now, we'll return a minimal object to avoid crashing the app.
    console.error("Supabase environment variables are not set.");
    // A mock client to prevent app crash
    return {
        from: () => ({
            select: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
            insert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
            update: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
            delete: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        }),
        auth: {
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            getUser: async () => ({ data: { user: null }, error: null }),
        },
    } as any;
  }
  
  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return client;
}
