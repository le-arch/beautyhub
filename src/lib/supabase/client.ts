
"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error("Supabase environment variables are not set. Please check your .env file.");
    // Return a mock client to prevent app crash
    return {
        from: () => ({
            select: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
            insert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
            update: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
            delete: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
            filter: () => ({ select: async () => ({data: null, error: { message: 'Supabase not configured' }})}),
            ilike: () => ({ select: async () => ({data: null, error: { message: 'Supabase not configured' }})}),
            eq: () => ({ select: async () => ({data: null, error: { message: 'Supabase not configured' }})}),
            order: () => ({ select: async () => ({data: null, error: { message: 'Supabase not configured' }})})
        }),
        auth: {
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            getUser: async () => ({ data: { user: null }, error: null }),
            signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
            signUp: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
            signOut: async () => ({ error: null }),
            updateUser: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        },
    } as any;
  }
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
