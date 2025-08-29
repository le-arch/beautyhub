
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

  const { data: { user } } = await supabase.auth.getUser();
  const role = user?.user_metadata?.role;
  
  revalidatePath('/', 'layout')

  if (role === 'owner') {
    return redirect('/dashboard/owner');
  }

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

  // After signup, Supabase sends a confirmation email. 
  // The user will be redirected upon clicking the link in the email.
  // We can redirect them to a page informing them to check their email.
  return redirect('/login?message=Check your email to complete the signup process');
}

export async function signInWithGoogle() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            // You can add user metadata here if needed, but role selection
            // is best handled in a multi-step signup or a profile setup page
            // after the initial OAuth. For now, we'll assign a default role
            // or let them choose on first login. Let's assume 'customer' for now.
             queryParams: {
                prompt: 'consent',
             }
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
