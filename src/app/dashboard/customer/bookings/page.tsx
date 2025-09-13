

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Star, Users, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { mockBookings } from '@/lib/mock-data';
import type { Booking } from '@/lib/types';
import { Calendar } from '@/components/ui/calendar';
import { parseISO, isSameDay, format } from 'date-fns';
import { ClientTime } from '@/components/client-time';
import { BookingSystem } from '@/components/booking-system';
import { useSearchParams } from 'next/navigation';
import { mockSalons } from '@/lib/mock-data';
import type { Salon } from '@/lib/types';

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const searchParams = useSearchParams();
  const bookingSalonId = searchParams.get('book');
  const salonToBook = bookingSalonId ? mockSalons.find(s => s.id === parseInt(bookingSalonId)) : null;

  const addBooking = (newBooking: Booking) => {
    setBookings(prev => ({
      ...prev,
      upcoming: [newBooking, ...prev.upcoming]
    }));
  };

  const upcomingBookings = bookings.upcoming.sort((a,b) => new Date(a.booking_time).getTime() - new Date(b.booking_time).getTime());
  const pastBookings = bookings.completed.sort((a,b) => new Date(b.booking_time).getTime() - new Date(a.booking_time).getTime());

  const allBookingsForCalendar = [...upcomingBookings, ...pastBookings];
  const bookedDays = allBookingsForCalendar.map(booking => parseISO(booking.booking_time));
  
  const selectedDayBookings = selectedDate 
    ? allBookingsForCalendar.filter(booking => isSameDay(parseISO(booking.booking_time), selectedDate))
    : [];

  const renderBookingCard = (booking: Booking, isPast: boolean = false) => (
    <Card key={booking.id} className="border-purple-100 overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
            <Link href={`/dashboard/customer/salon/${booking.salon_id}`}>
                <h3 className="font-semibold text-lg hover:text-purple-600 transition-colors">{booking.salons?.name}</h3>
            </Link>
            <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className={booking.status === 'Confirmed' ? 'bg-primary' : ''}>{booking.status}</Badge>
          </div>
          <p className="text-muted-foreground">{booking.service_name}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" />
              <span>{format(parseISO(booking.booking_time), 'PPP')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <ClientTime date={booking.booking_time} format="p" />
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col gap-2 self-stretch sm:self-center">
          {isPast ? (
            <>
              <Button size="sm">Book Again</Button>
              <Button variant="outline" size="sm"><Star className="mr-2 h-4 w-4" /> Leave a Review</Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm">Reschedule</Button>
              <Button variant="destructive" size="sm">Cancel</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
       <div className="max-w-7xl mx-auto">
        <div className="mb-6">
            <Button
                variant="ghost"
                asChild
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 -ml-3 mb-4"
            >
                <Link href="/dashboard/customer/dashboard">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </Link>
            </Button>
            
            <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">
                My Bookings
            </h1>
            <p className="text-lg text-warmgray-600">
                Manage your upcoming and past appointments
            </p>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
            <Card className="border-purple-100">
                <CardHeader>
                <CardTitle className="text-2xl">Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled appointments will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                    {upcomingBookings.map(booking => renderBookingCard(booking, false))}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg border-purple-200">
                    <CalendarIcon className="h-12 w-12 text-warmgray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground">You have no upcoming appointments.</h3>
                    <Button className="mt-4" asChild>
                        <Link href="/dashboard/customer/explore">Book a Service</Link>
                    </Button>
                    </div>
                )}
                </CardContent>
            </Card>

            <Card className="border-purple-100">
                <CardHeader>
                <CardTitle className="text-2xl">Past Appointments</CardTitle>
                    <CardDescription>Review your past visits and book again.</CardDescription>
                </CardHeader>
                <CardContent>
                    {pastBookings.length > 0 ? (
                    <div className="space-y-4">
                    {pastBookings.map(booking => renderBookingCard(booking, true))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground py-12">Your past appointments will appear here.</p>
                )}
                </CardContent>
            </Card>
            </div>
            <div className="lg:col-span-1 space-y-6">
                <Card className="border-purple-100 sticky top-24">
                    <CardHeader>
                        <CardTitle>Booking Calendar</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            modifiers={{ booked: bookedDays }}
                            modifiersClassNames={{
                                booked: 'bg-purple-500 text-white rounded-full'
                            }}
                            className="rounded-md border p-4 border-purple-200"
                        />
                        <div className="space-y-4 w-full mt-6">
                            <h3 className="font-semibold text-warmgray-900 text-lg">
                            Appointments for {selectedDate ? format(selectedDate, 'PPP') : '...'}
                            </h3>
                            {selectedDayBookings.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedDayBookings.map(booking => (
                                        <div key={booking.id} className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                                            <Image src={booking.salons?.image || ''} alt={booking.salons?.name || ''} width={40} height={40} className="h-10 w-10 rounded-lg object-cover" />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-warmgray-800">{booking.salons?.name}</h4>
                                                <p className="text-sm text-warmgray-600">{booking.service_name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-purple-600">
                                                  <ClientTime date={booking.booking_time} format="p" />
                                                </p>
                                                <Badge variant={booking.status === 'Confirmed' ? "default" : "outline"} className={booking.status === 'Confirmed' ? "bg-primary" : ""}>
                                                {booking.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed rounded-lg border-purple-200">
                                    <Users className="h-8 w-8 mx-auto text-warmgray-400 mb-2"/>
                                    <p className="text-warmgray-500">No appointments for this day.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </main>
    {salonToBook && <BookingSystem salon={salonToBook} onBookingComplete={addBooking} />}
    </>
  );
}
