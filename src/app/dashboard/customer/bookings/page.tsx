
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Star } from 'lucide-react';
import Image from 'next/image';

const upcomingBookings = [
  {
    id: 1,
    salonName: 'Amber Glow Salon',
    service: 'Knotless Braids',
    date: 'August 28, 2024',
    time: '10:00 AM',
    status: 'Confirmed',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'modern salon interior',
  },
];

const pastBookings = [
    {
    id: 2,
    salonName: 'Serene Spa & Beauty',
    service: 'Hydrating Facial',
    date: 'July 15, 2024',
    time: '2:00 PM',
    status: 'Completed',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'serene spa room',
  },
];


export default function BookingsPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled appointments will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
               <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                    <Image 
                      src={booking.image}
                      alt={booking.salonName}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover w-full sm:w-24 h-32 sm:h-24"
                      data-ai-hint={booking.imageHint}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.salonName}</h3>
                          <p className="text-muted-foreground">{booking.service}</p>
                        </div>
                        <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className="bg-primary">{booking.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 self-stretch sm:self-center">
                       <Button variant="outline" size="sm">Reschedule</Button>
                       <Button variant="destructive" size="sm">Cancel</Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
               <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-lg font-medium text-muted-foreground">You have no upcoming appointments.</h3>
                <Button className="mt-4">Book a Service</Button>
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
             {pastBookings.length > 0 ? (
               <div className="space-y-4">
                {pastBookings.map((booking) => (
                   <Card key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                    <Image 
                      src={booking.image}
                      alt={booking.salonName}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover w-full sm:w-24 h-32 sm:h-24"
                      data-ai-hint={booking.imageHint}
                    />
                    <div className="flex-1">
                       <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.salonName}</h3>
                          <p className="text-muted-foreground">{booking.service}</p>
                        </div>
                        <Badge variant="outline">{booking.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                      </div>
                    </div>
                     <div className="flex sm:flex-col gap-2 self-stretch sm:self-center">
                       <Button size="sm">Book Again</Button>
                       <Button variant="outline" size="sm"><Star className="mr-2 h-4 w-4" /> Leave a Review</Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p>Your past appointments will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
