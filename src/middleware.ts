
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // This will refresh the session cookie if it's expired.
  const response = await updateSession(request);

  const { data: { user } } = await response.supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Define public paths that do not require authentication
  const publicPaths = ['/login', '/signup', '/owner', '/'];

  const isPublicPath = publicPaths.some(p => {
    if (p === '/') return pathname === '/';
    return pathname.startsWith(p);
  });
  
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

  // If the user is logged in
  if (user) {
    const role = user.user_metadata?.role;

    // If user is on an auth page, redirect them to their dashboard
    if (isAuthRoute) {
      const redirectUrl = role === 'owner' ? '/dashboard/owner' : '/dashboard/customer';
      return Response.redirect(new URL(redirectUrl, request.url));
    }

    // Role-based access control for dashboard routes
    if (pathname.startsWith('/dashboard/owner') && role !== 'owner') {
      return Response.redirect(new URL('/dashboard/customer', request.url));
    }
    if (pathname.startsWith('/dashboard/customer') && role !== 'customer') {
      return Response.redirect(new URL('/dashboard/owner', request.url));
    }
    
  } else {
    // If user is not logged in and trying to access a protected route
    if (pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|auth/callback).*)',
  ],
};
