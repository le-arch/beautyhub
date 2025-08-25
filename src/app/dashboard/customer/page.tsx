
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Search,
  MapPin,
  Star,
  Heart,
  MessageCircle,
  Clock,
  TrendingUp,
  Navigation,
  Sparkles
} from 'lucide-react';
import SalonCard from '@/components/salon-card';
import Image from 'next/image';
import Link from 'next/link';
import ImageWithFallback from '@/components/image-with-fallback';

const quickSearchCategories = [
  { name: 'Braiding', icon: '💇🏾‍♀️', color: 'from-purple-500 to-purple-600' },
  { name: 'Nails', icon: '💅🏾', color: 'from-pink-500 to-pink-600' },
  { name: 'Dreadlocks', icon: '🌀', color: 'from-purple-600 to-indigo-600' },
  { name: 'Spa & Facials', icon: '✨', color: 'from-green-500 to-emerald-600' },
  { name: 'Makeup', icon: '💄', color: 'from-pink-600 to-rose-600' },
  { name: 'Barbering', icon: '✂️', color: 'from-gray-600 to-gray-700' }
];

const trendingSalons = [
    {
    id: 1,
    name: 'Afro Chic Hair Studio',
    image: 'https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?w=400',
    imageHint: 'braided hairstyle',
    location: 'Douala, Cameroon',
    rating: 4.8,
    reviews: 127,
    startingPrice: 15000,
    services: [],
    gallery: [],
    specialties: ['Braiding', 'Twists', 'Natural Hair'],
    featured: true,
    verified: true,
    distance: '2.3 km',
    responseTime: '1 hour'
  },
  {
    id: 2,
    name: 'Golden Nails Spa',
    image: 'https://images.unsplash.com/photo-1650176491728-a5e6edd08575?w=400',
    imageHint: 'nail art',
    location: 'Lagos, Nigeria',
    rating: 4.6,
    reviews: 89,
    startingPrice: 8000,
    services: [],
    gallery: [],
    specialties: ['Manicure', 'Pedicure', 'Nail Art'],
    featured: false,
    verified: true,
    distance: '1.8 km',
    responseTime: '30 mins'
  }
];

const recentlyViewed = [
  {
    id: 3,
    name: 'Royal Locks Studio',
    image: 'https://images.unsplash.com/photo-1625536658395-2bd89a631e37?w=300',
    imageHint: 'dreadlocks style',
    location: 'Accra, Ghana',
    rating: 4.9,
    reviews: 156,
    startingPrice: 20000,
    services: [],
    gallery: [],
    specialties: ['Dreadlocks', 'Maintenance'],
    lastViewed: '2 days ago'
  }
];

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data that would come from your useApp context
  const user = { name: 'Beauty Lover', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' };
  const userLocation = { city: 'Lagos' };
  const favoriteIds = [1, 2];

  return (
    <div className="min-h-screen pt-16">
      {/* Welcome Header */}
      <section className="bg-gradient-beauty-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-purple-100 text-purple-600 text-lg font-semibold">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-semibold text-warmgray-900 mb-1">
                  Welcome back, {user?.name?.split(' ')[0]}! 💜
                </h1>
                <p className="text-lg text-warmgray-600">
                  {userLocation ? `📍 ${userLocation.city}` : 'Ready to find your perfect salon?'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmgray-400 h-5 w-5" />
                  <Input
                    placeholder="Search salons, services, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-white border-purple-200 text-warmgray-900 rounded-xl text-base"
                  />
                </div>
                <Button
                  className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-warmgray-900">Browse by Category</h2>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickSearchCategories.map((category) => (
              <Card
                key={category.name}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-purple-100"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mb-3 mx-auto`}>
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-warmgray-900 text-sm">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trending Salons */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-warmgray-900">Trending Near You</h2>
                </div>
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  See More
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingSalons.map((salon) => (
                  <SalonCard key={salon.id} salon={salon} />
                ))}
              </div>
            </section>

            {/* Featured Services */}
            <section>
              <div className="flex items-center mb-6">
                <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
                <h2 className="text-2xl font-semibold text-warmgray-900">Featured Services</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-purple-100 overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?w=400"
                      alt="Box Braids Special"
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      Limited Time
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-warmgray-900 mb-1">Box Braids Special</h3>
                    <p className="text-sm text-warmgray-600 mb-2">Professional box braids starting from ₦12,000</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-600 font-medium">Save 20%</span>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-100 overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1650176491728-a5e6edd08575?w=400"
                      alt="Nail Art Package"
                      width={400}
                      height={200}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
                      Popular
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-warmgray-900 mb-1">Luxury Nail Art</h3>
                    <p className="text-sm text-warmgray-600 mb-2">Complete nail art package with gel coating</p>
                    <div className="flex items-center justify-between">
                      <span className="text-pink-600 font-medium">From ₦8,000</span>
                      <Button size="sm" className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900">Your Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warmgray-600">Favorites</span>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-500 mr-1 fill-current" />
                    <span className="font-medium text-warmgray-900">{favoriteIds.length}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warmgray-600">Messages</span>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="font-medium text-warmgray-900">3</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warmgray-600">Bookings</span>
                  <span className="font-medium text-warmgray-900">2 upcoming</span>
                </div>
              </CardContent>
            </Card>

            {/* Recently Viewed */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  Recently Viewed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentlyViewed.map((salon) => (
                  <div key={salon.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={salon.image}
                        alt={salon.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-warmgray-900 truncate">{salon.name}</p>
                      <p className="text-xs text-warmgray-600">{salon.location}</p>
                      <p className="text-xs text-purple-600">{salon.lastViewed}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs font-medium text-warmgray-700">{salon.rating}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Location Quick Access */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900 flex items-center">
                  <Navigation className="h-4 w-4 mr-2 text-purple-600" />
                  Nearby Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Victoria Island', 'Ikeja', 'Lekki', 'Surulere'].map((area) => (
                  <Button
                    key={area}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-warmgray-600 hover:text-purple-600 hover:bg-purple-50"
                  >
                    <MapPin className="h-3 w-3 mr-2" />
                    {area}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
