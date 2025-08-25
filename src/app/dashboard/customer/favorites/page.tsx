
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Search, Filter } from 'lucide-react';
import SalonCard from '@/components/salon-card';
import type { Salon } from '@/lib/types';

// Mock data, as we don't have the useApp context implemented yet.
const favoritedSalons: (Salon & { specialties?: string[], featured?: boolean, verified?: boolean, distance?: string, responseTime?: string })[] = [
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

export default function FavoritesPage() {
  const isAuthenticated = true; // Mocked for UI display
  
  if (!isAuthenticated) {
    return (
      <main className="flex-1 p-8 bg-gradient-beauty-secondary pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-purple-600" />
            </div>
            <h1 className="text-3xl font-semibold text-warmgray-900 mb-4">
              Sign in to view your favorites
            </h1>
            <p className="text-lg text-warmgray-600 mb-8 max-w-md mx-auto">
              Create an account to save your favorite salons and access them anytime.
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
            >
              Get Started
            </Button>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex-1 p-8 bg-gradient-beauty-secondary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-purple-600 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900">Your Favorite Salons</h1>
              <p className="text-lg text-warmgray-600">
                {favoritedSalons.length > 0 
                  ? `${favoritedSalons.length} ${favoritedSalons.length === 1 ? 'salon' : 'salons'} saved`
                  : "Build your collection of favorite beauty destinations"
                }
              </p>
            </div>
          </div>
          
          {favoritedSalons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Favorites
                </Button>
              </div>
              
              <div className="text-sm text-warmgray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {favoritedSalons.length > 0 ? (
          <>
            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {favoritedSalons.map((salon) => (
                <SalonCard
                  key={salon.id}
                  salon={salon}
                />
              ))}
            </div>
            
            {/* Tips Card */}
            <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-warmgray-900 mb-2">
                      Make the Most of Your Favorites
                    </h3>
                    <p className="text-warmgray-600 mb-4">
                      Your favorite salons are always evolving! Check back regularly for new services, 
                      special promotions, and updated availability. You can message any salon directly 
                      to ask questions or book appointments.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        Discover More Salons
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        View Messages
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="h-16 w-16 text-purple-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">
              No favorites yet
            </h2>
            <p className="text-lg text-warmgray-600 mb-8 max-w-2xl mx-auto">
              Start building your collection of favorite beauty salons! When you find salons you love, 
              tap the heart icon to save them here for easy access later.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              >
                Explore Salons
              </Button>
              <Button 
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3"
              >
                Browse Categories
              </Button>
            </div>
            
            {/* How it Works */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-warmgray-900 mb-8">
                How to Save Favorites
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-warmgray-900 mb-2">1. Explore Salons</h4>
                  <p className="text-sm text-warmgray-600">
                    Browse salons by category, location, or search for specific services you need.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-warmgray-900 mb-2">2. Save Your Favorites</h4>
                  <p className="text-sm text-warmgray-600">
                    Tap the heart icon on any salon card to instantly add it to your favorites.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Button className="h-6 w-6 text-purple-600 bg-transparent hover:bg-transparent p-0">
                      ↺
                    </Button>
                  </div>
                  <h4 className="font-semibold text-warmgray-900 mb-2">3. Access Anytime</h4>
                  <p className="text-sm text-warmgray-600">
                    Your favorites are saved to your account and accessible from any device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
