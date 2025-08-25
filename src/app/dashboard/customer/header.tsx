
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, LogOut } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const CustomerDashboardHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold text-foreground">
              BeautyHub
            </span>
          </Link>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <LogOut className="mr-2" />
            Exit
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default CustomerDashboardHeader;
