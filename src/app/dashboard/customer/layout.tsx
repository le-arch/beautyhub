
import type { Metadata } from 'next';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import CustomerDashboardHeader from '@/app/dashboard/customer/header';
import { Home, Star, MessageSquare, Calendar, User, Settings } from 'lucide-react';
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
      <CustomerDashboardHeader />
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/customer" isActive>
                  <Home />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/customer/bookings">
                  <Calendar />
                  Bookings
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/customer/messages">
                  <MessageSquare />
                  Messages
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/customer/favorites">
                  <Star />
                  Favorites
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/customer/profile">
                  <User />
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard/customer/settings">
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          {children}
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
