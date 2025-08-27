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
import { Progress } from '@/components/ui/progress';
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
  Image as ImageIcon,
  Verified,
  ArrowLeft,
  ChevronRight,
  Navigation,
  Award,
  ShieldCheck,
  Bookmark,
  ExternalLink,
  Globe,
  Users,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from '@/components/image-with-fallback';

const mockReviews = [
  {
    id: '1',
    customerName: 'Amina Hassan',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c17d5098?w=100',
    rating: 5,
    comment: 'Amazing service! The braids came out perfect and the staff was so welcoming. Definitely coming back!',
    service: 'Box Braids',
    date: '2024-01-10',
    helpful: 12
  },
  {
    id: '2',
    customerName: 'Fatou Diallo',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100',
    rating: 4,
    comment: 'Great experience overall. The salon is clean and professional. Only waited 15 minutes past my appointment time.',
    service: 'Twist Out',
    date: '2024-01-05',
    helpful: 8
  },
  {
    id: '3',
    customerName: 'Kemi Okafor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    comment: 'Best natural hair treatment I\'ve had in Lagos! My hair feels so healthy and moisturized. Worth every naira.',
    service: 'Natural Hair Treatment',
    date: '2024-01-02',
    helpful: 15
  }
];

const mockGalleryImages = [
  'https://images.unsplash.com/photo-1594736797933-d0301ba6add9?w=400',
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
  'https://images.unsplash.com/photo-1616683693504-3ea7eb1d4c0e?w=400',
  'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=400',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'
];


export default function SalonProfilePage() {
  const params = useParams();
  const salonId = params.id;
  const salon = mockSalons.find(s => s.id.toString() === salonId);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  if (!salon) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Salon not found.</p>
      </div>
    );
  }

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockGalleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockGalleryImages.length) % mockGalleryImages.length);
  };
  
  return (
    <main className="bg-gradient-beauty-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 -ml-3"
          >
            <Link href="/dashboard/customer/explore">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Salons
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="border-purple-100 overflow-hidden">
              <div className="relative">
                {/* Image Gallery */}
                <div className="relative h-80 bg-warmgray-100">
                  <ImageWithFallback
                    src={mockGalleryImages[currentImageIndex]}
                    alt={`${salon.name} gallery`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                  
                  {/* Gallery Navigation */}
                  {mockGalleryImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5 text-warmgray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronRight className="h-5 w-5 text-warmgray-700" />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {mockGalleryImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Overlay Actions */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`backdrop-blur-sm ${
                        isFavorited 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-white/80 hover:bg-white text-warmgray-700'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {salon.verified && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <Verified className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      {mockGalleryImages.length} Photos
                    </Badge>
                  </div>
                </div>

                {/* Salon Header Info */}
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-semibold text-warmgray-900">
                          {salon.name}
                        </h1>
                        {salon.verified && (
                          <ShieldCheck className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-warmgray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{salon.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-warmgray-900">{salon.rating.toFixed(1)}</span>
                          <span>({salon.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <p className="text-warmgray-700 mb-4">
                        Welcome to {salon.name}, where we believe in beauty with a passion. Located in the heart of {salon.location}, we have been serving our community for over 5 years with top-notch beauty services.
                      </p>
                      
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2">
                        {['Braiding', 'Natural Hair', 'Twists'].map((category, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="border-purple-200 text-purple-700 bg-purple-50"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div className="text-right">
                      <p className="text-sm text-warmgray-500 mb-1">Starting from</p>
                      <p className="text-2xl font-semibold text-purple-600">
                        ₦{salon.startingPrice.toLocaleString() || 'Contact for pricing'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Tabs Section */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-white border border-purple-100">
                <TabsTrigger 
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="services"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  Gallery
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Key Features */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-purple-600" />
                      What Makes Us Special
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-warmgray-900">Expert Stylists</p>
                          <p className="text-sm text-warmgray-600">Certified professionals with 5+ years experience</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                          <ShieldCheck className="h-4 w-4 text-pink-600" />
                        </div>
                        <div>
                          <p className="font-medium text-warmgray-900">Premium Products</p>
                          <p className="text-sm text-warmgray-600">Only high-quality, hair-safe products used</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-warmgray-900">Flexible Hours</p>
                          <p className="text-sm text-warmgray-600">Open 7 days a week, evening appointments available</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-pink-600" />
                        </div>
                        <div>
                          <p className="font-medium text-warmgray-900">Top Rated</p>
                          <p className="text-sm text-warmgray-600">Consistently rated 4.5+ stars by customers</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Operating Hours */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      Operating Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { day: 'Monday', hours: '9:00 AM - 8:00 PM', today: false },
                        { day: 'Tuesday', hours: '9:00 AM - 8:00 PM', today: true },
                        { day: 'Wednesday', hours: '9:00 AM - 8:00 PM', today: false },
                        { day: 'Thursday', hours: '9:00 AM - 9:00 PM', today: false },
                        { day: 'Friday', hours: '9:00 AM - 9:00 PM', today: false },
                        { day: 'Saturday', hours: '8:00 AM - 9:00 PM', today: false },
                        { day: 'Sunday', hours: '10:00 AM - 6:00 PM', today: false }
                      ].map((schedule, index) => (
                        <div 
                          key={index} 
                          className={`flex justify-between items-center p-2 rounded ${
                            schedule.today ? 'bg-purple-50 border border-purple-200' : ''
                          }`}
                        >
                          <span className={`font-medium ${schedule.today ? 'text-purple-700' : 'text-warmgray-700'}`}>
                            {schedule.day}
                            {schedule.today && <span className="text-xs ml-2 text-purple-600">(Today)</span>}
                          </span>
                          <span className={schedule.today ? 'text-purple-600 font-medium' : 'text-warmgray-600'}>
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="mt-6">
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Our Services</CardTitle>
                    <p className="text-warmgray-600">
                      Professional beauty services tailored to enhance your natural beauty
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {salon.services.map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                          <div className="flex-1">
                            <h4 className="font-semibold text-warmgray-900 mb-1">{service.name}</h4>
                            <p className="text-sm text-warmgray-600 mb-2">Professional service with premium products</p>
                            <div className="flex items-center gap-4 text-sm text-warmgray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                60 mins
                              </span>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xl font-semibold text-purple-600">₦{service.price.toLocaleString()}</p>
                            <Button 
                              size="sm"
                              asChild
                              className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            >
                              <Link href="/dashboard/customer/bookings">Book Now</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {/* Review Summary */}
                  <Card className="border-purple-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-semibold text-warmgray-900 mb-2">Customer Reviews</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-5 w-5 ${
                                    i < Math.floor(averageRating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-warmgray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-xl font-semibold text-warmgray-900">{averageRating.toFixed(1)}</span>
                            <span className="text-warmgray-600">({mockReviews.length} reviews)</span>
                          </div>
                        </div>
                        
                        {/* Rating Breakdown */}
                        <div className="text-right space-y-1">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = mockReviews.filter(r => r.rating === rating).length;
                            const percentage = (count / mockReviews.length) * 100;
                            
                            return (
                              <div key={rating} className="flex items-center gap-2 text-sm">
                                <span className="w-12">{rating} star</span>
                                <Progress value={percentage} className="w-20 h-2" />
                                <span className="w-8 text-warmgray-600">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <Card key={review.id} className="border-purple-100">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                              <AvatarImage src={review.avatar} alt={review.customerName} />
                              <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700">
                                {review.customerName.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-warmgray-900">{review.customerName}</h4>
                                  <div className="flex items-center gap-2 text-sm text-warmgray-600">
                                    <span>{review.service}</span>
                                    <span>•</span>
                                    <span>{new Date(review.date).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${
                                        i < review.rating 
                                          ? 'text-yellow-400 fill-current' 
                                          : 'text-warmgray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              
                              <p className="text-warmgray-700 mb-3">{review.comment}</p>
                              
                              <div className="flex items-center gap-4 text-sm text-warmgray-500">
                                <button className="flex items-center gap-1 hover:text-purple-600">
                                  <span>👍</span>
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery" className="mt-6">
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Photo Gallery</CardTitle>
                    <p className="text-warmgray-600">
                      Discover our work and salon atmosphere
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mockGalleryImages.map((image, index) => (
                        <div 
                          key={index}
                          className="relative aspect-square bg-warmgray-100 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <ImageWithFallback
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Contact */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="border-purple-100 sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">Book Your Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-2xl font-semibold text-purple-600 mb-1">
                    From ₦{salon.startingPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-warmgray-600">Prices vary by service</p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Link href="/dashboard/customer/bookings">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    asChild
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <Link href="/dashboard/customer/messages">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Link>
                  </Button>
                </div>
                
                <Separator />
                
                {/* Contact Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-purple-600" />
                    <span className="text-warmgray-700">+234 80 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Navigation className="h-4 w-4 text-purple-600" />
                    <span className="text-warmgray-700">Get Directions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-purple-600" />
                    <span className="text-warmgray-700">Visit Website</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety & Policies */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  Safety & Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-warmgray-700">Sanitized tools & equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-warmgray-700">Free consultation available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-warmgray-700">24h cancellation policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-warmgray-700">Licensed professionals only</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Salons */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-base">You might also like</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-warmgray-600 mb-4">
                  Other highly-rated salons in {salon.location}
                </p>
                <Button 
                  variant="outline"
                  asChild
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Link href="/dashboard/customer/explore">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Similar Salons
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
