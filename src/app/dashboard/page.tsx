
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/owner');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/owner');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An unexpected error occurred during logout.',
      });
    }
  };

  if (isLoading) {
    return (
        <div className="container max-w-4xl py-12">
            <Skeleton className="h-8 w-1/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-8" />
            <Skeleton className="h-48 w-full" />
        </div>
    );
  }

  if (!user) {
    return null; // or a redirect component
  }

  return (
    <div className="min-h-screen bg-secondary">
        <header className="bg-background border-b">
            <div className="container flex h-16 max-w-7xl items-center justify-between">
                <h1 className="text-xl font-bold font-headline">My Dashboard</h1>
                <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </header>
        <main className="container max-w-7xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, Salon Owner!</CardTitle>
                    <CardDescription>
                    This is your dashboard. Here you can manage your salon profile, services, and bookings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Welcome, {user.email}!</p>
                    <p>More features coming soon!</p>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
