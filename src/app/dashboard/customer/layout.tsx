
import CustomerDashboardHeader from '@/app/dashboard/customer/header';
import { CustomerNav } from './nav';

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <CustomerDashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
          <CustomerNav />
        </aside>
        <main className="flex-1 bg-gradient-beauty-secondary">
          {children}
        </main>
      </div>
    </div>
  );
}
