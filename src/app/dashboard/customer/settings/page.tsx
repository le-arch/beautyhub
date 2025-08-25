
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <main className="flex-1 p-8">
      <h1 className="font-headline text-4xl font-bold mb-8">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Manage your preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Options for notifications and theme settings will be available here soon.</p>
        </CardContent>
      </Card>
    </main>
  );
}
