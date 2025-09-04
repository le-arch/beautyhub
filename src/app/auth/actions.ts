
'use server'

import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  
  // Simulate login
  if (email.includes('owner')) {
    return redirect('/dashboard/owner');
  }

  return redirect('/dashboard/customer')
}

export async function signup(formData: FormData) {
  // Simulate signup
  return redirect('/login?message=Check email to continue sign in process')
}

export async function logout() {
    // Simulate logout
    return redirect('/login');
}
