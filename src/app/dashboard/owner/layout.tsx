
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
import OwnerDashboardHeader from '@/app/dashboard/owner/header';
import { 
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Star,
    Scissors,
    ImageIcon,
    BarChart3,
    Settings,
    User,
    LogOut,
    Plus,
    Building,
    Map
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logout } from '@/app/auth/actions';

export const metadata: Metadata = {
  title: 'Salon Owner Dashboard - BeautyHub',
  description: 'Manage your salon, bookings, and services.',
};

export default async function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: salon } = await supabase
    .from('salons')
    .select('name')
    .eq('owner_id', user.id)
    .single();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <OwnerDashboardHeader user={user} />
        <div className="flex flex-1">
          <Sidebar>
            <SidebarContent>
              <SidebarHeader>
                <SidebarTitle>{salon?.name || 'My Salon'}</SidebarTitle>
              </SidebarHeader>
              <SidebarMenu>
                 <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                    <Link href="/dashboard/owner">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/bookings">
                      <Calendar />
                      <span>Bookings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/messages">
                      <MessageSquare />
                      <span>Messages</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/reviews">
                      <Star />
                      <span>Reviews</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarSeparator />

              <SidebarMenu>
                 <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/services">
                      <Scissors />
                      <span>Services</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/gallery">
                      <ImageIcon />
                      <span>Gallery</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/analytics">
                      <BarChart3 />
                      <span>Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/map">
                      <Map />
                      <span>Map View</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              
              <SidebarSeparator />

              <SidebarMenu>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/profile">
                      <Building />
                      <span>Salon Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild>
                     <Link href="/dashboard/owner/settings">
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
                  <Button asChild variant="default" className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Link href="/dashboard/owner/services">
                      <Plus className="mr-2" />
                      Add New Service
                    </Link>
                  </Button>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <form action={logout} className="w-full">
                    <Button type="submit" variant="outline" className="w-full justify-start">
                        <LogOut className="mr-2" />
                        Sign Out
                    </Button>
                  </form>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex flex-1 flex-col">
             <main className="flex-1 bg-gradient-beauty-secondary">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
