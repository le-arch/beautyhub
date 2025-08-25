
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, User, Building } from 'lucide-react';
import Link from 'next/link';

export default function OwnerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold text-foreground">
              BeautyHub
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="mx-auto w-full max-w-4xl text-center">
             <h1 className="font-headline text-4xl md:text-6xl font-bold">Join Our Community</h1>
             <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're looking for the perfect salon or you're a salon owner ready to grow, we have a place for you.
             </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <Card className="text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl mt-4">For Customers</CardTitle>
                    <CardDescription>
                        Find and book appointments with the best salons in your city.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size="lg" asChild>
                        <Link href="/dashboard/customer">Explore Salons</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                        <Building className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-3xl mt-4">For Salon Owners</CardTitle>
                    <CardDescription>
                        List your salon, connect with new clients, and grow your business.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} asChild>
                       <Link href="/dashboard/owner">Join as a Business</Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
