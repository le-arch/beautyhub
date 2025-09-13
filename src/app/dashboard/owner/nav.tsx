
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Star,
    Scissors,
    ImageIcon,
    BarChart3,
    Settings,
    Map,
    Plus,
    LogOut
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/auth/actions';

const mainNav = [
    { href: '/dashboard/owner', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/owner/bookings', icon: Calendar, label: 'Bookings' },
    { href: '/dashboard/owner/messages', icon: MessageSquare, label: 'Messages' },
    { href: '/dashboard/owner/reviews', icon: Star, label: 'Reviews' },
];

const salonNav = [
    { href: '/dashboard/owner/services', icon: Scissors, label: 'Services' },
    { href: '/dashboard/owner/gallery', icon: ImageIcon, label: 'Gallery' },
    { href: '/dashboard/owner/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/owner/map', icon: Map, label: 'Map View' },
];

const settingsNav = [
    { href: '/dashboard/owner/settings', icon: Settings, label: 'Settings' },
];

export function OwnerNav() {
    const pathname = usePathname();

    const NavGroup = ({ items }: { items: { href: string; icon: React.ElementType; label: string }[] }) => (
        <nav className="flex flex-col gap-2">
            {items.map((item) => {
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
    );

    return (
        <div className="flex flex-col h-full">
            <h3 className="px-2 mb-2 text-lg font-semibold tracking-tight">My Salon</h3>
            <NavGroup items={mainNav} />
            <hr className="my-4" />
            <NavGroup items={salonNav} />
            <hr className="my-4" />
            <NavGroup items={settingsNav} />

            <div className="mt-auto flex flex-col gap-2">
                <Button asChild variant="default" className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Link href="/dashboard/owner/services">
                        <Plus className="mr-2" />
                        Add New Service
                    </Link>
                </Button>
                <form action={logout} className="w-full">
                    <Button type="submit" variant="outline" className="w-full justify-start gap-2">
                        <LogOut />
                        Sign Out
                    </Button>
                </form>
            </div>
        </div>
    );
}
