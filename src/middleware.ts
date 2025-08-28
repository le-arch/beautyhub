import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const { data: { user } } = await supabase.auth.getUser();
    const role = user?.user_metadata?.role;

    // Role-based access control
    if (pathname.startsWith('/dashboard/owner') && role !== 'owner') {
      return NextResponse.redirect(new URL('/dashboard/customer', request.url))
    }
    if (pathname.startsWith('/dashboard/customer') && role !== 'customer') {
      return NextResponse.redirect(new URL('/dashboard/owner', request.url))
    }
  }

  // Redirect logged-in users from auth pages
  if (session && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
     return NextResponse.redirect(new URL('/dashboard/customer', request.url))
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
