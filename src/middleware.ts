
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Define public paths that do not require authentication
  const publicPaths = ['/login', '/signup', '/owner', '/']
  
  const isPublicPath = publicPaths.some(p => {
    if (p === '/') return pathname === '/';
    return pathname.startsWith(p);
  });

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup')

  // If user is logged in
  if (session) {
    const role = session.user.user_metadata.role
    
    // If user is on an auth page (login/signup), redirect to their dashboard
    if (isAuthRoute) {
      const redirectUrl = role === 'owner' ? '/dashboard/owner' : '/dashboard/customer';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    
    // Role-based access control for dashboard routes
    if (pathname.startsWith('/dashboard/owner') && role !== 'owner') {
      return NextResponse.redirect(new URL('/dashboard/customer', request.url))
    }
    if (pathname.startsWith('/dashboard/customer') && role !== 'customer') {
      return NextResponse.redirect(new URL('/dashboard/owner', request.url))
    }
  } else {
    // If user is not logged in and is trying to access a protected route
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
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
}
