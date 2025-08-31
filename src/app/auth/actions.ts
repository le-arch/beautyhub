
'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?message=${error.message}`)
  }
  
  const role = data.user?.user_metadata?.role || 'customer';

  if (role === 'owner') {
    return redirect('/dashboard/owner');
  }

  return redirect('/dashboard/customer')
}

export async function signup(formData: FormData) {
  const origin = (await headers()).get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as 'customer' | 'owner';
  const fullName = formData.get('full_name') as string;
  const supabase = createClient()

  const { error, data: { user } } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        role: role,
        avatar_url: `https://i.pravatar.cc/150?u=${email}`
      }
    },
  });

  if (error) {
    console.error('Signup error:', error);
    return redirect(`/signup?message=${error.message}`)
  }

  if (user && role === 'owner') {
    const { error: salonError } = await supabase.from('salons').insert({
        owner_id: user.id,
        name: `${fullName}'s Salon`,
        location: 'Please update your location',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'modern salon interior',
        rating: 0,
        reviews: 0,
        startingPrice: 0,
    });
    if (salonError) {
        console.error('Error creating salon:', salonError);
        return redirect(`/signup?message=Could not create salon profile. Please contact support.`);
    }
  }


  return redirect('/login?message=Check email to continue sign in process')
}

export async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
}
