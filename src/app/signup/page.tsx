
import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from '../login/submit-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signup, signInWithGoogle } from '../auth/actions'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Header from '../header'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    const role = session.user.user_metadata.role
    if (role === 'owner') {
      return redirect('/dashboard/owner')
    }
    return redirect('/dashboard/customer')
  }

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
            <form className="grid gap-4" action={signup}>
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
                <Input id="password" name="password" type="password" required />
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

              <SubmitButton
                className="w-full"
                pendingText="Signing Up..."
              >
                Sign Up
              </SubmitButton>

              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
            </form>
             <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                  </span>
              </div>
            </div>
            <form action={signInWithGoogle}>
              <Button variant="outline" className="w-full">
                  Sign Up with Google
              </Button>
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
