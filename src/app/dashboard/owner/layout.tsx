
import type { Metadata } from 'next';
import OwnerDashboardHeader from '@/app/dashboard/owner/header';
import { OwnerNav } from './nav';


export const metadata: Metadata = {
  title: 'Salon Owner Dashboard - SalonFind Africa',
  description: 'Manage your salon, bookings, and services.',
};

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <div className="flex min-h-screen flex-col">
        <OwnerDashboardHeader />
        <div className="flex flex-1">
          <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
            <OwnerNav />
          </aside>
          <main className="flex-1 bg-gradient-beauty-secondary">
            {children}
          </main>
        </div>
      </div>
  );
}
