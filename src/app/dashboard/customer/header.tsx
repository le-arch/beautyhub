import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, Sparkles } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const CustomerDashboardHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              BeautyHub
            </span>
          </Link>
        </div>
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
        </div>
      </div>
    </header>
  );
};

export default CustomerDashboardHeader;
