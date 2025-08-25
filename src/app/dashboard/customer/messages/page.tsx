
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MessagesPage() {
  return (
    <main className="flex-1 p-8">
      <h1 className="font-headline text-4xl font-bold mb-8">Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Conversations</CardTitle>
          <CardDescription>You have no new messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your chats with salon owners will appear here.</p>
        </CardContent>
      </Card>
    </main>
  );
}
