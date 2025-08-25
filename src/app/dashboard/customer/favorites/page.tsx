
import CustomerDashboardLayout from '@/app/dashboard/customer/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FavoritesPage() {
  return (
    <CustomerDashboardLayout>
      <main className="flex-1 p-8">
        <h1 className="font-headline text-4xl font-bold mb-8">My Favorites</h1>
        <Card>
          <CardHeader>
            <CardTitle>Favorite Salons</CardTitle>
            <CardDescription>You have not saved any favorite salons yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your favorite salons will be listed here for easy access.</p>
          </CardContent>
        </Card>
      </main>
    </CustomerDashboardLayout>
  );
}
