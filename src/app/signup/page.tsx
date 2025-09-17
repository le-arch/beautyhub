
'use client';

import Link from 'next/link'
import React, { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Header from '../header'
import { SubmitButton } from '../login/submit-button'

const SignupContent = React.lazy(() => import('@/components/signup-content'));


export default function SignupPage() {
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
            <Suspense fallback={<div>Loading...</div>}>
              <SignupContent />
            </Suspense>
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
  );
}
