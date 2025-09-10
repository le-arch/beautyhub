
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, Sparkles, CalendarCheck, MessageSquarePlus, Menu } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Notification } from '@/lib/types';
import { mockNotifications } from '@/lib/mock-data';

const CustomerDashboardHeader = () => {
  const notifications: Notification[] = mockNotifications;
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_confirmed':
        return <CalendarCheck className="h-5 w-5 text-green-500" />;
      case 'new_message':
        return <MessageSquarePlus className="h-5 w-5 text-purple-500" />;
      case 'new_review':
        return <Sparkles className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
           <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
                 <nav className="flex flex-col gap-2">
                    <Link href="/dashboard/customer">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        Home
                    </Button>
                    </Link>
                    {/* Add other nav links here for mobile */}
                </nav>
            </SheetContent>
           </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              BeautyHub
            </span>
          </Link>
        </div>
         <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 justify-center text-xs">{unreadCount}</Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="p-4">
                    <h3 className="font-semibold">Notifications</h3>
                </div>
                <Separator />
                <div className="space-y-2 p-2">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.id} className={`flex items-start gap-3 p-2 rounded-lg ${!notification.is_read ? 'bg-primary/5' : ''}`}>
                               <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                                <div>
                                    <p className="font-medium text-sm">{notification.title}</p>
                                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-center text-muted-foreground py-4">No notifications yet.</p>
                    )}
                </div>
                <Separator />
                <div className="p-2">
                     <Button variant="link" size="sm" className="w-full">View all notifications</Button>
                </div>
              </PopoverContent>
            </Popover>
        </div>
      </div>
    </header>
  );
};

export default CustomerDashboardHeader;
