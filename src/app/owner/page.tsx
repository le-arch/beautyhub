
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import AuthForm from './_components/auth-form';

export default function SalonOwnerPage() {
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
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Back to customer site
          </Link>
        </div>
      </header>
      <main className="flex-1 bg-secondary">
        <div className="container flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="mx-auto w-full max-w-md">
            <AuthForm />
          </div>
        </div>
      </main>
    </div>
  );
}
