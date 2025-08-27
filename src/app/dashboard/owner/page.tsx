
import Header from '@/app/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function OwnerDashboard() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-secondary">
        <div className="container py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-headline text-4xl font-bold">Your Salon Dashboard</h1>
                <Button>
                    <PlusCircle className="mr-2" />
                    Add New Listing
                </Button>
            </div>
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome!</CardTitle>
                        <CardDescription>This is your control center. Manage your listings, view analytics, and connect with customers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Get started by <Link href="#" className="text-primary underline">adding your first salon listing</Link>.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </>
  );
}
