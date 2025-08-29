
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
       const { data: { user } } = await supabase.auth.getUser();
       // Check if the user has a role assigned. If not, this is likely their first login.
       const role = user?.user_metadata?.role;
       if (role === 'owner') {
         return NextResponse.redirect(`${origin}/dashboard/owner`);
       }
       // Default to customer dashboard
       return NextResponse.redirect(`${origin}/dashboard/customer`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?message=Could not log in with provider`)
}
