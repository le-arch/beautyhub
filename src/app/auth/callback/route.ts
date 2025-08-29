
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { error, data: { session } } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && session) {
       const role = session.user?.user_metadata?.role;
       revalidatePath('/', 'layout');
       
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
