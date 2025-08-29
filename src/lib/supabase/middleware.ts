// This file is intentionally left blank to prevent runtime errors.
// The session-updating middleware has been disabled.
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  // This is a pass-through function. It does not perform any session management
  // to avoid runtime errors related to environment variable access in middleware.
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}
