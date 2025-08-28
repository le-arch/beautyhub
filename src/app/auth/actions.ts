'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in a real app you should validate requests
  const data = Object.fromEntries(formData)

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  return redirect('/dashboard/customer')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  const data = Object.fromEntries(formData);
  const email = data.email as string;
  const password = data.password as string;
  const role = data.role as 'customer' | 'owner';

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role,
        full_name: data.full_name,
      }
    },
  })

  if (error) {
    console.error('Signup Error:', error);
    return redirect('/signup?message=Could not authenticate user. Please try again.')
  }
  
  revalidatePath('/', 'layout')

  if (role === 'owner') {
    return redirect('/dashboard/owner?message=Check email to continue sign in process');
  }
  return redirect('/dashboard/customer?message=Check email to continue sign in process');
}

export async function signInWithGoogle() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    });

    if (error) {
        return redirect('/login?message=Could not authenticate with Google');
    }

    if (data.url) {
        return redirect(data.url);
    }
    
    return redirect('/login?message=An unknown error occurred');
}

export async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/');
}
