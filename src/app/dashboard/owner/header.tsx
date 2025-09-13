
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, Sparkles, CalendarCheck, MessageSquarePlus, User, LogOut, Menu, Settings } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OwnerNav } from './nav';


const notifications = [
    {
        title: "New Booking!",
        description: "Amina Hassan booked 'Box Braids' for tomorrow at 2 PM.",
        icon: <CalendarCheck className="h-5 w-5 text-green-500" />,
        isRead: false,
    },
    {
        title: "New Message",
        description: "Fatou Diallo sent you a message about her appointment.",
        icon: <MessageSquarePlus className="h-5 w-5 text-purple-500" />,
        isRead: false,
    },
     {
        title: "New 5-Star Review",
        description: "Kemi Okafor left a glowing review for your services.",
        icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
        isRead: true,
    }
]

const OwnerDashboardHeader = () => {
  const unreadCount = notifications.filter(n => !n.isRead).length;

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
                <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                 <OwnerNav />
            </SheetContent>
           </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              SalonFind Africa
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
                    {notifications.map((notification, index) => (
                        <div key={index} className={`flex items-start gap-3 p-2 rounded-lg ${!notification.isRead ? 'bg-primary/5' : ''}`}>
                           <div className="mt-1">{notification.icon}</div>
                            <div>
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-xs text-muted-foreground">{notification.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Separator />
                <div className="p-2">
                     <Button variant="link" size="sm" className="w-full">View all notifications</Button>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="Salon Owner" />
                    <AvatarFallback>SO</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Amber Glow Salon</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      owner@amberglow.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/owner/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                   <Link href="/dashboard/owner/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default OwnerDashboardHeader;
