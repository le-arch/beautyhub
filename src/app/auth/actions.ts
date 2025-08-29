
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data = Object.fromEntries(formData)

  const { error, data: { user } } = await supabase.auth.signInWithPassword(data as any)

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  const role = user?.user_metadata?.role;
  
  revalidatePath('/', 'layout')

  if (role === 'owner') {
    return redirect('/dashboard/owner');
  }

  return redirect('/dashboard/customer')
}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
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
  
  const { data: { user } } = await supabase.auth.getUser();

  // Create a profile entry
  if (user) {
      const { error: profileError } = await supabase.from('profiles').insert({
          id: user.id,
          full_name: data.full_name as string,
          email: user.email,
          role: role,
      });

      if (profileError) {
          console.error('Error creating profile:', profileError);
          // Optional: handle profile creation error, maybe delete the user
          // or redirect to an error page. For now, we'll proceed.
      }
  }
  
  revalidatePath('/', 'layout')

  // After signup, Supabase sends a confirmation email. 
  // We can redirect them to a page informing them to check their email.
  return redirect('/login?message=Check your email to complete the signup process');
}

export async function signInWithGoogle() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `http://localhost:9002/auth/callback`, // Make sure this is the correct URL for local dev
            queryParams: {
                prompt: 'consent',
                access_type: 'offline'
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
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect('/');
}
