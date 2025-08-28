
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useGeolocation } from '@/hooks/use-geolocation';
import { 
  MapPin, 
  Navigation, 
  Star, 
  Edit,
  Search,
  Locate,
  Route,
  Target,
  Eye
} from 'lucide-react';
import Link from 'next/link';

// Mock owner's salon data
const ownerSalon = {
    id: 1,
    name: 'Amber Glow Salon',
    location: 'Lagos, Nigeria',
    coordinates: { lat: 6.5244, lng: 3.3792 },
    rating: 4.8,
    reviews: 127,
};

export default function OwnerMapPage() {
  const { location: userLocation } = useGeolocation();
  
  const [mapCenter, setMapCenter] = useState(ownerSalon.coordinates);
  const [locationInput, setLocationInput] = useState(ownerSalon.location);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // A real app might allow fetching salon's precise lat/lng from an API
    if (ownerSalon.coordinates) {
      setMapCenter(ownerSalon.coordinates);
    }
  }, []);
  
  const handleUpdateLocation = () => {
    // In a real app, this would geocode the `locationInput` and save it.
    console.log("Updating location to:", locationInput);
    setIsEditing(false);
  }

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">
            Your Salon on the Map
          </h1>
          <p className="text-lg text-warmgray-600">
            Manage your salon's location and see how you appear to customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-purple-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  Salon Location
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                    <div className="space-y-4">
                        <Input
                            placeholder="Enter new address"
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            className="bg-warmgray-50 border-purple-200"
                        />
                        <p className="text-xs text-warmgray-500">
                            Enter your full address for accurate pinning on the map.
                        </p>
                        <Button 
                            onClick={handleUpdateLocation}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                            Update Location
                        </Button>
                    </div>
                ) : (
                    <div>
                        <p className="font-medium text-warmgray-800">{ownerSalon.name}</p>
                        <p className="text-warmgray-600">{ownerSalon.location}</p>
                         <p className="text-xs text-warmgray-500 mt-2">
                            Lat: {mapCenter.lat.toFixed(4)}, Lng: {mapCenter.lng.toFixed(4)}
                        </p>
                    </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-purple-100">
                 <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        Customer View
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-warmgray-600 mb-4">
                        See what customers see when they search for salons in your area. This helps you understand your local competition.
                    </p>
                    <Button asChild variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                        <Link href="/dashboard/customer/map">
                            <Eye className="h-4 w-4 mr-2" />
                            Switch to Customer Map
                        </Link>
                    </Button>
                </CardContent>
            </Card>
          </div>

          {/* Map Display */}
          <div className="lg:col-span-2">
            <Card className="border-purple-100 h-[600px] lg:h-full">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full bg-warmgray-200 rounded-lg overflow-hidden">
                   <img src="https://placehold.co/1000x800/e2e8f0/64748b?text=Map+View" alt="Map of salon location" className="w-full h-full object-cover"/>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                     <div className="p-2 bg-purple-600 text-white text-sm rounded-md shadow-lg inline-block">
                       {ownerSalon.name}
                     </div>
                     <div className="w-3 h-3 bg-purple-600 rounded-full mx-auto mt-1 border-2 border-white shadow-lg"></div>
                  </div>

                   <div className="absolute top-4 left-4 z-10">
                    <Card className="border-white shadow-lg bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">
                            Your Pinned Location
                          </span>
                        </div>
                      </CardContent>
                    </Card>
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
