
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}
