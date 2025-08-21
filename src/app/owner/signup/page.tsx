
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const signupSchema = z
  .object({
    salonName: z.string().min(2, { message: 'Salon name is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

type SignupSchema = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signupForm = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      salonName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSignupSubmit = async (values: SignupSchema) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      
      console.log('New Salon Signup:', values.salonName, userCredential.user.uid);
      toast({
        title: 'Signup Successful',
        description: 'Your salon has been registered. Welcome!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description:
          error.code === 'auth/email-already-in-use'
            ? 'This email is already registered.'
            : 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold text-foreground">
              SalonFind Africa
            </span>
          </Link>
          <Link href="/owner" className="text-sm font-medium text-primary hover:underline">
            Back to Join Options
          </Link>
        </div>
      </header>
      <main className="flex-1 bg-secondary">
        <div className="container flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="mx-auto w-full max-w-md">
           <Card>
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">
                Register Your Salon
                </CardTitle>
                <CardDescription>
                Create an account to list your business on our platform.
                </CardDescription>
            </CardHeader>
            <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
                <CardContent className="space-y-4">
                    <FormField
                    control={signupForm.control}
                    name="salonName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Salon Name</FormLabel>
                        <FormControl>
                            <Input
                            placeholder="Your Salon's Name"
                            {...field}
                            disabled={isLoading}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                            placeholder="you@example.com"
                            {...field}
                            disabled={isLoading}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                            type="password"
                            {...field}
                            disabled={isLoading}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input
                            type="password"
                            {...field}
                            disabled={isLoading}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Account
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/owner/login" className="text-primary hover:underline">
                            Log In
                        </Link>
                    </p>
                </CardFooter>
                </form>
            </Form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
