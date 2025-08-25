
import CustomerDashboardLayout from '@/app/dashboard/customer/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <CustomerDashboardLayout>
      <main className="flex-1 p-8">
        <h1 className="font-headline text-4xl font-bold mb-8">My Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>As a customer, your profile is managed locally and is not publicly visible.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your preferences and saved information will be managed from this page in the future.</p>
          </CardContent>
        </Card>
      </main>
    </CustomerDashboardLayout>
  );
}
