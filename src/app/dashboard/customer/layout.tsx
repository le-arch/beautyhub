
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
      <div className="flex min-h-screen flex-col">
        <CustomerDashboardHeader />
        <div className="flex flex-1">
          <Sidebar>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer" isSubtle>
                    <Home />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/bookings" isSubtle>
                    <Calendar />
                    Bookings
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/messages" isSubtle>
                    <MessageSquare />
                    Messages
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/favorites" isSubtle>
                    <Star />
                    Favorites
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/profile" isSubtle>
                    <User />
                    Profile
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/customer/settings" isSubtle>
                    <Settings />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex-1">
            {children}
            <Footer />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
