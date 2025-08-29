
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  const protectedPaths = ['/dashboard', '/owner']

  // Redirect logged-in users from auth pages to their respective dashboards
  if (session && (pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname === '/owner')) {
     const { data: { user } } = await supabase.auth.getUser();
     const role = user?.user_metadata?.role;
     if (role === 'owner') {
       return NextResponse.redirect(new URL('/dashboard/owner', request.url))
     }
     return NextResponse.redirect(new URL('/dashboard/customer', request.url))
  }
  
  // Protect dashboard routes
  if (protectedPaths.some(path => pathname.startsWith(path))) {
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
