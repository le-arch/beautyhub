
import CustomerDashboardLayout from '@/app/dashboard/customer/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function BookingsPage() {
  return (
    <CustomerDashboardLayout>
      <main className="flex-1 p-8">
        <h1 className="font-headline text-4xl font-bold mb-8">My Bookings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>You have no upcoming appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your booked appointments will appear here.</p>
          </CardContent>
        </Card>
      </main>
    </CustomerDashboardLayout>
  );
}
