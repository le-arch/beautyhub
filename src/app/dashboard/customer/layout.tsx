
import type { Metadata } from 'next';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarHeader,
  SidebarTitle,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import CustomerDashboardHeader from '@/app/dashboard/customer/header';
import { Home, Star, MessageSquare, Calendar, User, Settings, Sparkles, LogOut, LayoutDashboard, Search } from 'lucide-react';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Customer Dashboard - BeautyHub',
  description: 'Manage your appointments and favorites.',
};

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <CustomerDashboardHeader />
        <div className="flex flex-1">
          <Sidebar>
            <SidebarContent>
              <SidebarMenu>
                 <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                    <Link href="/dashboard/customer">
                      <Home />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                    <Link href="/dashboard/customer/dashboard">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/customer/explore">
                      <Search />
                      <span>Explore</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/customer/bookings">
                      <Calendar />
                      <span>Bookings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/customer/messages">
                      <MessageSquare />
                      <span>Messages</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/customer/favorites">
                      <Star />
                      <span>Favorites</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/customer/beauty-tips">
                      <Sparkles />
                      <span>Beauty Tips</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarSeparator />

              <SidebarMenu>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/customer/profile">
                      <User />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/customer/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/">
                      <LogOut className="mr-2" />
                      Exit Dashboard
                    </Link>
                  </Button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex flex-1 flex-col">
             <main className="flex-1 bg-gradient-beauty-secondary">
              {children}
            </main>
            <Footer />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

    