
'use client';

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Header from '../header'
import { signup } from '../auth/actions'
import { SubmitButton } from '../login/submit-button'
import { PasswordInput } from '@/components/password-input'

export default function SignupPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  return (
    <div className="flex min-h-screen flex-col bg-background">
       <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
               <div className="grid gap-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" name="full_name" placeholder="Your Name" required />
                </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" required />
              </div>

               <div className="grid gap-2">
                  <Label>I am a...</Label>
                  <RadioGroup defaultValue="customer" name="role" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="role-customer" />
                      <Label htmlFor="role-customer">Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="owner" id="role-owner" />
                      <Label htmlFor="role-owner">Salon Owner</Label>
                    </div>
                  </RadioGroup>
                </div>
                {searchParams?.message && (
                    <div className="text-sm font-medium text-destructive">
                        {searchParams.message}
                    </div>
                )}

              <SubmitButton
                formAction={signup}
                className="w-full"
                pendingText="Signing Up..."
              >
                Sign Up
              </SubmitButton>

            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
