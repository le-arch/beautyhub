'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Search, MapPin, Navigation, Loader2 } from "lucide-react";
import ImageWithFallback from "@/components/image-with-fallback";
import Link from 'next/link';

const serviceCategories = [
  { value: 'all', label: 'All Services' },
  { value: 'braiding', label: 'Braiding' },
  { value: 'nails', label: 'Nails' },
  { value: 'dreadlocks', label: 'Dreadlocks' },
  { value: 'spa', label: 'Spa & Facials' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'barbering', label: 'Barbering' }
];

export default function HeroSection() {
  const [userLocation, setUserLocation] = useState<{ city: string; country: string } | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  useEffect(() => {
    if (userLocation?.city && !searchCity) {
      setSearchCity(userLocation.city);
    }
  }, [userLocation, searchCity]);

  const handleLocationDetection = async () => {
    setIsLocationLoading(true);
    // Mock location detection
    setTimeout(() => {
        const mockLocation = { city: 'Lagos', country: 'Nigeria' };
        setUserLocation(mockLocation);
        setSearchCity(mockLocation.city);
        setIsLocationLoading(false);
    }, 1000);
  };
  
  return (
    <section className="relative h-[650px] flex flex-col overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBoYWlyJTIwc2Fsb24lMjBicmFpZGluZ3xlbnwxfHx8fDE3NTUwNjUyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Women getting hair braided in salon"
          className="w-full h-full object-cover"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      {/* Search Bar at Top */}
      <div className="relative z-10 pt-24 px-4 max-w-4xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Location Input */}
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warmgray-400 h-5 w-5" />
                <Input 
                  placeholder="Enter city or area" 
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="pl-12 h-12 bg-white border-warmgray-200 text-warmgray-900 placeholder-warmgray-500 rounded-xl text-base font-medium"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLocationDetection}
                  disabled={isLocationLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  {isLocationLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Navigation className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {/* Service Selection */}
            <div className="flex-1">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="h-12 bg-white border-warmgray-200 text-warmgray-900 rounded-xl text-base font-medium">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <Button 
              asChild
              className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-base font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href="/dashboard/customer/explore">
                <Search className="h-5 w-5 mr-2" />
                Search Salons
              </Link>
            </Button>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-warmgray-600 font-medium mr-2">Quick search:</span>
            {serviceCategories.slice(1, 5).map((category) => (
              <Button
                key={category.value}
                variant="outline"
                size="sm"
                asChild
                className="text-sm bg-white/80 hover:bg-purple-50 border-warmgray-200 text-warmgray-700 hover:text-purple-600 hover:border-purple-300 rounded-full px-4 py-1 transition-all duration-200"
              >
                <Link href="/dashboard/customer/explore">
                  {category.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content - Now positioned below search */}
      <div className="relative z-10 flex-1 flex items-center justify-center text-center text-white max-w-4xl mx-auto px-4">
        <div>
          <div className="mb-6">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-4 text-sm font-medium">
              ✨ Discover African Beauty Excellence
            </Badge>
            <h1 className="text-3xl md:text-5xl mb-4 text-white font-semibold tracking-tight">
              Find the Perfect Salon for Your Style
            </h1>
            <p className="text-lg md:text-xl mb-2 text-purple-100 font-medium">
              Connect with top-rated beauty professionals
            </p>
            {userLocation && (
              <p className="text-base text-purple-200 mb-6">
                📍 Near {userLocation.city}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}