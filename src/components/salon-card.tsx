
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Salon } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Heart, Zap, CheckCircle, MessageSquare } from 'lucide-react';
import ImageWithFallback from './image-with-fallback';

interface SalonCardProps {
  salon: Salon & { specialties?: string[], featured?: boolean, verified?: boolean, distance?: string, responseTime?: string };
}

const SalonCard = ({ salon }: SalonCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-2xl flex flex-col border-purple-100">
      <CardHeader className="p-0 relative">
        <ImageWithFallback
          src={salon.image}
          alt={salon.name}
          width={600}
          height={400}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          data-ai-hint={salon.imageHint}
        />
        <div className="absolute top-3 left-3 flex gap-2">
            {salon.featured && <Badge variant="secondary" className="bg-pink-600 text-white border-none"><Zap className="h-3 w-3 mr-1" /> Featured</Badge>}
            {salon.verified && <Badge variant="secondary" className="bg-green-600 text-white border-none"><CheckCircle className="h-3 w-3 mr-1" /> Verified</Badge>}
        </div>
        <Button 
          size="icon" 
          variant="outline" 
          className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={toggleFavorite}
        >
            <Heart className={`h-4 w-4 text-red-500 ${isFavorited ? 'fill-current' : 'fill-transparent'}`} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg text-warmgray-900 truncate group-hover:text-purple-600 transition-colors">{salon.name}</h3>
        <div className="mt-1 flex items-center text-sm text-warmgray-500">
          <MapPin className="mr-1.5 h-4 w-4" />
          <span>{salon.location}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className={`h-4 w-4 text-yellow-400 fill-yellow-400`} />
            <span className="font-medium text-warmgray-700">{salon.rating}</span>
            <span className="text-xs text-warmgray-500">({salon.reviews} reviews)</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
            {salon.specialties?.slice(0, 3).map(spec => (
                <Badge key={spec} variant="outline" className="text-purple-600 border-purple-100 bg-purple-50">{spec}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-sm">
          From <span className="font-bold text-purple-600">₦{salon.startingPrice.toLocaleString()}</span>
        </p>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <MessageSquare className="h-4 w-4" />
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">View</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SalonCard;
