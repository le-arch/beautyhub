
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { mockSalons } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Heart,
  Share2,
  ChevronLeft,
  CheckCircle,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

export default function SalonProfilePage() {
  const params = useParams();
  const salonId = params.id;
  const salon = mockSalons.find(s => s.id.toString() === salonId);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!salon) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Salon not found.</p>
      </div>
    );
  }

  const averageRating = 4.8;
  const ratingBreakdown = [
    { star: 5, percentage: 80 },
    { star: 4, percentage: 15 },
    { star: 3, percentage: 3 },
    { star: 2, percentage: 1 },
    { star: 1, percentage: 1 },
  ];

  const reviews = [
    { id: 1, name: 'Aisha Bello', avatar: '/avatars/01.png', rating: 5, text: 'Absolutely amazing braids! The best I have ever had. The stylists are so talented and professional.' },
    { id: 2, name: 'Chioma Okoro', avatar: '/avatars/02.png', rating: 4, text: 'Great service and beautiful salon. My nails look fantastic. Will definitely be coming back.' }
  ];

  return (
    <main className="bg-gradient-beauty-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <Image
            src={salon.image}
            alt={salon.name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            data-ai-hint={salon.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4">
            <Button asChild variant="ghost" className="text-white bg-black/30 hover:bg-black/50">
              <Link href="/dashboard/customer/explore">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Explore
              </Link>
            </Button>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">{salon.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="h-5 w-5" />
              <span>{salon.location}</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-bold text-xl">{salon.rating}</span>
              <span className="text-muted-foreground">({salon.reviews} reviews)</span>
            </div>
            {salon.verified && (
              <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50">
                <CheckCircle className="mr-1.5 h-4 w-4" /> Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setIsFavorited(!isFavorited)}>
              <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'text-red-500 fill-current' : ''}`} />
              {isFavorited ? 'Favorited' : 'Favorite'}
            </Button>
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
            <Button asChild><Link href="/dashboard/customer/bookings">Book Appointment</Link></Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About {salon.name}</h3>
                    <p className="text-muted-foreground">
                      Welcome to {salon.name}, where we believe in beauty with a passion. Located in the heart of {salon.location}, we have been serving our community for over 5 years with top-notch beauty services. Our team of certified professionals is dedicated to providing you with an exceptional experience, using only the highest quality products. Whether you're here for a quick touch-up or a full day of pampering, we're here to make you look and feel your best.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                 <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Our Services</h3>
                    <div className="space-y-4">
                      {salon.services.map((service, index) => (
                        <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted">
                           <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-muted-foreground">Duration: 60 mins</p>
                          </div>
                          <div className="text-right">
                             <p className="font-semibold text-primary">₦{service.price.toLocaleString()}</p>
                            <Button size="sm" variant="outline" className="mt-1">Book Now</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                 <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                       <h3 className="text-xl font-semibold">Gallery</h3>
                       <div className="flex gap-2">
                        <Button variant="outline" size="sm"><ImageIcon className="mr-2 h-4 w-4"/> Photos</Button>
                        <Button variant="ghost" size="sm"><Video className="mr-2 h-4 w-4"/> Videos</Button>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {salon.gallery.map((item, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                           <Image
                            src={item.url}
                            alt={item.hint}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-110"
                            data-ai-hint={item.hint}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
               <TabsContent value="reviews" className="mt-6">
                 <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Reviews & Ratings</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0 text-center">
                            <p className="text-5xl font-bold">{averageRating}</p>
                            <div className="flex justify-center mt-1">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-muted'}`}/>)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Based on {salon.reviews} reviews</p>
                        </div>
                        <div className="w-full">
                            {ratingBreakdown.map(item => (
                                <div key={item.star} className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">{item.star} star</span>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400" style={{width: `${item.percentage}%`}}></div>
                                    </div>
                                    <span className="text-sm text-muted-foreground w-8 text-right">{item.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                     <Separator className="my-6" />
                    <div className="space-y-6">
                       {reviews.map(review => (
                        <div key={review.id} className="flex gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{review.name}</p>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-muted'}`}/>)}
                              </div>
                            </div>
                            <p className="text-muted-foreground mt-1">{review.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Location & Hours</CardTitle></CardHeader>
              <CardContent>
                <div className="h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground">Map Placeholder</p>
                </div>
                <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 flex-shrink-0"/>{salon.location}, No. 123 Beauty Avenue</p>
                 <Separator className="my-4"/>
                 <div className="space-y-1">
                    <p className="flex justify-between"><span>Monday - Friday</span> <span>9am - 7pm</span></p>
                    <p className="flex justify-between"><span>Saturday</span> <span>10am - 6pm</span></p>
                    <p className="flex justify-between text-red-500"><span>Sunday</span> <span>Closed</span></p>
                 </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Contact Salon</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                 <Button variant="outline" className="w-full"><Phone className="mr-2 h-4 w-4"/> Call Salon</Button>
                 <Button className="w-full"><MessageSquare className="mr-2 h-4 w-4"/> Message Salon</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
