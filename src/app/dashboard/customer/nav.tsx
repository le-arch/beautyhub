
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Star, MessageSquare, Calendar, User as UserIcon, Settings, Sparkles, LogOut, LayoutDashboard, Search, Map } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/dashboard/customer', icon: Home, label: 'Home' },
    { href: '/dashboard/customer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/customer/explore', icon: Search, label: 'Explore' },
    { href: '/dashboard/customer/map', icon: Map, label: 'Map View' },
    { href: '/dashboard/customer/bookings', icon: Calendar, label: 'Bookings' },
    { href: '/dashboard/customer/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/dashboard/customer/favorites', icon: Star, label: 'Favorites' },
    { href: '/dashboard/customer/beauty-tips', icon: Sparkles, label: 'Beauty Tips' },
];

const accountItems = [
    { href: '/dashboard/customer/profile', icon: UserIcon, label: 'Profile' },
    { href: '/dashboard/customer/settings', icon: Settings, label: 'Settings' },
];

export function CustomerNav() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full">
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button variant={isActive ? 'default' : 'ghost'} className="w-full justify-start gap-2">
                                <item.icon />
                                <span>{item.label}</span>
                            </Button>
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-auto flex flex-col gap-2">
                {accountItems.map((item) => {
                     const isActive = pathname === item.href;
                     return (
                        <Link key={item.href} href={item.href}>
                        <Button variant={isActive ? 'default' : 'ghost'} className="w-full justify-start gap-2">
                            <item.icon />
                            <span>{item.label}</span>
                        </Button>
                        </Link>
                    );
                })}
                <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2">
                        <LogOut />
                        Sign Out
                    </Button>
                </Link>
            </div>
        </div>
    );
}
