
'use client';

import CustomerDashboardHeader from '@/app/dashboard/customer/header';
import { Home, Star, MessageSquare, Calendar, User as UserIcon, Settings, Sparkles, LogOut, LayoutDashboard, Search, Map } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <CustomerDashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard/customer">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home />
                <span>Home</span>
              </Button>
            </Link>
            <Link href="/dashboard/customer/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/dashboard/customer/explore">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Search />
                <span>Explore</span>
              </Button>
            </Link>
            <Link href="/dashboard/customer/map">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Map />
                <span>Map View</span>
              </Button>
            </Link>
            <Link href="/dashboard/customer/bookings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Calendar />
                <span>Bookings</span>
              </Button>
            </Link>
            <Link href="/dashboard/customer/messages">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MessageSquare />
                <span>Messages</span>
              </Button>
            </Link>
            <Link href="/dashboard/customer/favorites">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Star />
                <span>Favorites</span>
              </Button>
            </Link>
            <Link href="/dashboard/customer/beauty-tips">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Sparkles />
                <span>Beauty Tips</span>
              </Button>
            </Link>
          </nav>
          <div className="mt-auto flex flex-col gap-2">
             <Link href="/dashboard/customer/profile">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <UserIcon />
                <span>Profile</span>
              </Button>
            </Link>
            <Link href="/dashboard/customer/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings />
                <span>Settings</span>
              </Button>
            </Link>
            <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full justify-start gap-2">
                    <LogOut />
                    Sign Out
                </Button>
            </Link>
          </div>
        </aside>
        <main className="flex-1 bg-gradient-beauty-secondary">
          {children}
        </main>
      </div>
    </div>
  );
}
