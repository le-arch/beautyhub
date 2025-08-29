
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // IMPORTANT: The Supabase client is created with placeholder credentials.
  // You must replace them with your actual Supabase URL and Anon Key for Google OAuth to work.
  // These are placeholders to resolve the "Invalid URL" error during development.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_URL_HERE",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || "YOUR_SUPABASE_ANON_KEY_HERE",
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const authRoutes = ['/login', '/signup'];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session) {
    const role = session.user.user_metadata?.role;
    const redirectUrl = role === 'owner' ? '/dashboard/owner' : '/dashboard/customer';
    
    if (isAuthRoute) {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    
    if (pathname.startsWith('/dashboard/owner') && role !== 'owner') {
      return NextResponse.redirect(new URL('/dashboard/customer', request.url));
    }
    
    if (pathname.startsWith('/dashboard/customer') && role !== 'customer') {
       return NextResponse.redirect(new URL('/dashboard/owner', request.url));
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
     * - auth/callback (Supabase auth callback)
     */
    '/((?!_next/static|_next/image|favicon.ico|auth/callback).*)',
  ],
}
