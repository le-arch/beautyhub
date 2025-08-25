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
} from '@/components/ui/sidebar';
import CustomerDashboardHeader from '@/app/dashboard/customer/header';
import { Home, Star, MessageSquare, Calendar, User, Settings, Sparkles } from 'lucide-react';
import Footer from '@/components/footer';

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
                  <SidebarMenuButton href="/dashboard/customer">
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/bookings">
                    <Calendar />
                    <span>Bookings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/messages">
                    <MessageSquare />
                    <span>Messages</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/favorites">
                    <Star />
                    <span>Favorites</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/beauty-tips">
                    <Sparkles />
                    <span>Beauty Tips</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/profile">
                    <User />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/settings">
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex flex-1 flex-col">
             <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
