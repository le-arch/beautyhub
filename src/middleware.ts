
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/dashboard'];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!user && isProtectedRoute) {
    // If no user and trying to access a protected route, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (user) {
    const role = user.user_metadata?.role;
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

    if (isAuthRoute) {
      // If user is logged in and tries to access login/signup, redirect to their dashboard
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
