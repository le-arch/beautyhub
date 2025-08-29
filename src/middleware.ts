
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // This will refresh the session cookie if it's expired.
  const { supabase, response } = await updateSession(request);

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (user) {
    const role = user.user_metadata?.role;
    
    // If user is logged in and tries to access login/signup, redirect to their dashboard
    if (isAuthRoute) {
      const redirectUrl = role === 'owner' ? '/dashboard/owner' : '/dashboard/customer';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Role-based access control for dashboard routes
    if (pathname.startsWith('/dashboard/owner') && role !== 'owner') {
      return NextResponse.redirect(new URL('/dashboard/customer', request.url));
    }
    if (pathname.startsWith('/dashboard/customer') && role !== 'customer') {
      return NextResponse.redirect(new URL('/dashboard/owner', request.url));
    }
  } else {
    // If user is not logged in and tries to access a protected dashboard route
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If no other condition is met, continue the request chain
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/callback (Supabase auth callback)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|auth/callback).*)',
  ],
};
