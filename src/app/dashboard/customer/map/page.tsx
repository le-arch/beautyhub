
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockSalons } from '@/lib/mock-data';
import type { Salon } from '@/lib/types';
import { useGeolocation } from '@/hooks/use-geolocation';

import { 
  MapPin, 
  Navigation, 
  Star, 
  Heart, 
  Filter,
  Search,
  Locate,
  Route,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function SalonMapPage() {
  const { location: userLocation } = useGeolocation();
  
  const [mapCenter, setMapCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // Default to Lagos
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [filterCategory, setFilterCategory] = useState('');
  const [locationInput, setLocationInput] = useState(userLocation?.city || '');
  const [favoriteIds, setFavoriteIds] = useState([1, 3]);

  useEffect(() => {
    if (userLocation) {
      // A real app would geocode the city to get lat/lng
      setLocationInput(userLocation.city);
    }
  }, [userLocation]);

  const filteredSalons = mockSalons; // Placeholder for filtering logic

  const handleSalonClick = (salon: Salon) => {
    setSelectedSalon(salon);
  };

  const toggleFavorite = (salonId: number) => {
    setFavoriteIds(prev => 
      prev.includes(salonId) ? prev.filter(id => id !== salonId) : [...prev, salonId]
    );
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 -ml-3 mb-4"
          >
            <Link href="/dashboard/customer/explore">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Explore
            </Link>
          </Button>
          
          <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">
            Salon Locations
          </h1>
          <p className="text-lg text-warmgray-600">
            Find beauty salons near you with our interactive map
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Controls & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Controls */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter location or city"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="bg-warmgray-50 border-purple-200"
                  />
                  <Button
                    size="icon"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Locate className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-warmgray-900">
                    Search Radius: {searchRadius} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-warmgray-500">
                    <span>1 km</span>
                    <span>50 km</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-600" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-warmgray-900 mb-2 block">
                    Service Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-warmgray-50 border border-purple-200 rounded-md text-sm"
                  >
                    <option value="">All Categories</option>
                    <option value="Braiding">Braiding</option>
                    <option value="Natural Hair">Natural Hair</option>
                    <option value="Nails">Nails</option>
                    <option value="Spa & Facials">Spa & Facials</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Dreadlocks">Dreadlocks</option>
                    <option value="Barbering">Barbering</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-warmgray-200">
                  <p className="text-sm text-warmgray-600 mb-2">
                    Showing {filteredSalons.length} salon{filteredSalons.length !== 1 ? 's' : ''} 
                    {filterCategory && ` in ${filterCategory}`}
                    {userLocation && ` within ${searchRadius} km of ${userLocation.city}`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Salon List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {filteredSalons.map((salon) => {
                const isFavorited = favoriteIds.includes(salon.id);
                const isSelected = selectedSalon?.id === salon.id;

                return (
                  <Card 
                    key={salon.id} 
                    className={`border cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'border-purple-500 bg-purple-50' : 'border-purple-100'
                    }`}
                    onClick={() => handleSalonClick(salon)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-16 h-16 bg-cover bg-center rounded-lg flex-shrink-0"
                          style={{ backgroundImage: `url(${salon.image})` }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-medium text-warmgray-900 truncate">{salon.name}</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(salon.id);
                              }}
                              className="p-1 h-6 w-6"
                            >
                              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-warmgray-400'}`} />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs text-warmgray-600 mb-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{salon.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs text-warmgray-600 mb-2">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{salon.rating} ({salon.reviews} reviews)</span>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              onClick={(e) => e.stopPropagation()}
                              className="h-7 text-xs border-purple-200 text-purple-600 hover:bg-purple-50"
                            >
                              <Link href={`/dashboard/customer/salon/${salon.id}`}>View</Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => e.stopPropagation()}
                              className="h-7 text-xs border-purple-200 text-purple-600 hover:bg-purple-50"
                            >
                              <Route className="h-3 w-3 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Map Display */}
          <div className="lg:col-span-2">
            <Card className="border-purple-100 h-[600px] lg:h-full">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4 p-8">
                       <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="h-12 w-12 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-warmgray-900 mb-2">
                          Interactive Map Placeholder
                        </h3>
                        <p className="text-warmgray-600 max-w-md">
                          In a production app, this would display an interactive map using a service like Google Maps or Mapbox, showing salon locations with custom markers and pop-ups.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
