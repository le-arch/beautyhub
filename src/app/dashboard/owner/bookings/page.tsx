
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Check, 
  X,
  Clock,
  User,
  Scissors,
  MessageCircle,
  Phone
} from 'lucide-react';
import Link from 'next/link';

const mockBookings = {
  requests: [
    {
      id: 'req1',
      customerName: 'Aisha Bello',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100',
      service: 'Knotless Braids',
      date: '2024-08-15',
      time: '11:00 AM',
      notes: 'I have very thick hair, please allow for extra time if needed.'
    }
  ],
  upcoming: [
    {
      id: 'up1',
      customerName: 'Tari Okoro',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      service: 'Gel Manicure',
      date: '2024-08-14',
      time: '2:30 PM',
      status: 'Confirmed'
    },
    {
      id: 'up2',
      customerName: 'Ngozi Nwosu',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100',
      service: 'Silk Press',
      date: '2024-08-16',
      time: '4:00 PM',
      status: 'Confirmed'
    }
  ],
  completed: [
    {
      id: 'comp1',
      customerName: 'Funke Akintola',
      avatar: 'https://images.unsplash.com/photo-1531746020798-5011936cf9e1?w=100',
      service: 'Box Braids',
      date: '2024-08-10',
      status: 'Completed',
      revenue: 18000
    }
  ]
};


export default function OwnerBookingsPage() {
  const [activeTab, setActiveTab] = useState('requests');

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">Manage Bookings</h1>
          <p className="text-lg text-warmgray-600">
            View and manage all your salon's appointments.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white border border-purple-100 p-2 rounded-xl h-auto">
            <TabsTrigger value="requests" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white">
              Requests <Badge className="ml-2 bg-white/30 text-white">{mockBookings.requests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              Upcoming <Badge className="ml-2 bg-white/30 text-white">{mockBookings.upcoming.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">Completed</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">Calendar View</TabsTrigger>
          </TabsList>

          {/* Booking Requests */}
          <TabsContent value="requests" className="space-y-4">
            {mockBookings.requests.length > 0 ? mockBookings.requests.map(booking => (
              <Card key={booking.id} className="border-purple-100">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={booking.avatar} alt={booking.customerName} />
                      <AvatarFallback>{booking.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-warmgray-900">{booking.customerName}</h3>
                      <p className="text-sm text-warmgray-600">New Customer</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Scissors className="h-4 w-4 text-purple-600" />
                        <span>{booking.service}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span>{booking.date} at {booking.time}</span>
                    </div>
                    {booking.notes && (
                      <p className="text-xs text-warmgray-500 bg-warmgray-50 p-2 rounded-md">Note: "{booking.notes}"</p>
                    )}
                  </div>
                   <div className="flex md:flex-col gap-2 justify-end">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Check className="h-4 w-4 mr-2" />
                      Confirm
                    </Button>
                    <Button size="sm" variant="destructive">
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) : <p className="text-center text-warmgray-500 py-12">No new booking requests.</p>}
          </TabsContent>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-4">
            {mockBookings.upcoming.map(booking => (
              <Card key={booking.id} className="border-purple-100">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                   <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={booking.avatar} alt={booking.customerName} />
                      <AvatarFallback>{booking.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                     <div>
                      <h3 className="font-semibold text-warmgray-900">{booking.customerName}</h3>
                      <div className="flex gap-2 mt-1">
                        <Button size="icon" variant="outline" className="h-7 w-7 border-purple-200 text-purple-600">
                            <MessageCircle className="h-4 w-4"/>
                        </Button>
                        <Button size="icon" variant="outline" className="h-7 w-7 border-purple-200 text-purple-600">
                            <Phone className="h-4 w-4"/>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Scissors className="h-4 w-4 text-purple-600" />
                        <span>{booking.service}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span>{booking.date} at {booking.time}</span>
                    </div>
                     <Badge className="bg-green-100 text-green-700">{booking.status}</Badge>
                  </div>
                  <div className="flex md:flex-col gap-2 justify-end">
                    <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">Reschedule</Button>
                    <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Completed Bookings */}
           <TabsContent value="completed" className="space-y-4">
            {mockBookings.completed.map(booking => (
              <Card key={booking.id} className="border-purple-100">
                 <CardContent className="p-4 flex items-center gap-4">
                   <Avatar className="h-12 w-12">
                      <AvatarImage src={booking.avatar} alt={booking.customerName} />
                      <AvatarFallback>{booking.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="font-semibold text-warmgray-900">{booking.customerName}</h3>
                        <p className="text-sm text-warmgray-600">{booking.service}</p>
                    </div>
                    <div className="text-sm text-warmgray-500">
                        {booking.date}
                    </div>
                    <Badge variant="outline">{booking.status}</Badge>
                    <p className="font-semibold text-green-600">₦{booking.revenue.toLocaleString()}</p>
                 </CardContent>
              </Card>
            ))}
          </TabsContent>
          
           {/* Calendar View Placeholder */}
          <TabsContent value="calendar">
            <Card className="border-purple-100">
                <CardHeader>
                    <CardTitle>Booking Calendar</CardTitle>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                    <p className="text-warmgray-500">Full calendar view coming soon.</p>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
