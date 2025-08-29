
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
       const { data: { user } } = await supabase.auth.getUser();
       revalidatePath('/', 'layout');
       
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
