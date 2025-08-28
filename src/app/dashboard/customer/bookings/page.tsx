
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Star, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingsPage() {
  const supabase = createClient();
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [pastBookings, setPastBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      const { data, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_time,
          status,
          service_name,
          salons (
            id,
            name,
            image
          )
        `)
        .eq('user_id', user.id)
        .order('booking_time', { ascending: false });

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        setError('Could not fetch your bookings. Please try again later.');
      } else {
        const now = new Date();
        const upcoming = data.filter(b => new Date(b.booking_time) >= now);
        const past = data.filter(b => new Date(b.booking_time) < now);
        setUpcomingBookings(upcoming);
        setPastBookings(past);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [supabase]);

  const renderBookingCard = (booking: any) => (
    <Card key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
      <Image 
        src={booking.salons?.image || 'https://placehold.co/100x100.png'}
        alt={booking.salons?.name || 'Salon'}
        width={100}
        height={100}
        className="rounded-lg object-cover w-full sm:w-24 h-32 sm:h-24"
        data-ai-hint="salon interior"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{booking.salons?.name}</h3>
            <p className="text-muted-foreground">{booking.service_name}</p>
          </div>
          <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className={booking.status === 'Confirmed' ? 'bg-primary' : ''}>{booking.status}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{new Date(booking.booking_time).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{new Date(booking.booking_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 self-stretch sm:self-center">
        {new Date(booking.booking_time) >= new Date() ? (
          <>
            <Button variant="outline" size="sm">Reschedule</Button>
            <Button variant="destructive" size="sm">Cancel</Button>
          </>
        ) : (
          <>
            <Button size="sm">Book Again</Button>
            <Button variant="outline" size="sm"><Star className="mr-2 h-4 w-4" /> Leave a Review</Button>
          </>
        )}
      </div>
    </Card>
  );

  const renderSkeleton = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
      <Skeleton className="w-full sm:w-24 h-32 sm:h-24 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="flex sm:flex-col gap-2 self-stretch sm:self-center">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled appointments will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {renderSkeleton()}
                {renderSkeleton()}
              </div>
            ) : upcomingBookings.length > 0 ? (
               <div className="space-y-4">
                {upcomingBookings.map(renderBookingCard)}
              </div>
            ) : (
               <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-lg font-medium text-muted-foreground">You have no upcoming appointments.</h3>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/customer">Book a Service</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Past Appointments</CardTitle>
             <CardDescription>Review your past visits and book again.</CardDescription>
          </CardHeader>
          <CardContent>
             {loading ? (
               <div className="space-y-4">
                 {renderSkeleton()}
               </div>
             ) : pastBookings.length > 0 ? (
               <div className="space-y-4">
                {pastBookings.map(renderBookingCard)}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">Your past appointments will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
