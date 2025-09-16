
'use client';

import { useState } from 'react';
import type { Salon } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Heart, Zap, CheckCircle, MessageSquare, Loader2 } from 'lucide-react';
import ImageWithFallback from './image-with-fallback';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';

interface SalonCardProps {
  salon: Salon & { specialties?: string[], featured?: boolean, verified?: boolean, distance?: string, responseTime?: string };
  onBookNow: (salon: Salon) => void;
  viewMode?: 'grid' | 'list';
}

const SalonCard = ({ salon, onBookNow, viewMode = 'grid' }: SalonCardProps) => {
  const [isFavorited, setIsFavorited] = useState(salon.featured || false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const { toast } = useToast();
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');
  const profileLink = isDashboard ? `/dashboard/customer/salon/${salon.id}` : `/salon/${salon.id}`;

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavoriteLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsFavorited(!isFavorited);
    toast({
      title: !isFavorited ? "Added to favorites!" : "Removed from favorites.",
    });

    setIsFavoriteLoading(false);
  };
  
  if (viewMode === 'list') {
    return (
      <Card className="group transition-all duration-300 hover:shadow-2xl flex flex-col sm:flex-row border-purple-100">
        <div className="sm:w-1/3 relative">
          <Link href={profileLink}>
            <ImageWithFallback
              src={salon.image}
              alt={salon.name}
              width={400}
              height={300}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-xl sm:rounded-l-xl sm:rounded-t-none"
              data-ai-hint={salon.imageHint}
            />
          </Link>
        </div>
        <div className="sm:w-2/3 flex flex-col">
          <CardHeader className="p-4">
             <div className="flex items-center justify-between">
                 <h3 className="font-semibold text-lg text-warmgray-900 truncate group-hover:text-purple-600 transition-colors">{salon.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className={`h-4 w-4 text-yellow-400 fill-yellow-400`} />
                  <span className="font-medium text-warmgray-700">{salon.rating}</span>
                </div>
            </div>
            <div className="mt-1 flex items-center text-sm text-warmgray-500">
              <MapPin className="mr-1.5 h-4 w-4" />
              <span>{salon.location}</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex-grow">
            <p className="text-sm text-warmgray-600 mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                Welcome to {salon.name}, where we believe in beauty with a passion. 
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
                {salon.services?.slice(0, 3).map(spec => (
                    <Badge key={spec.name} variant="outline" className="text-purple-600 border-purple-100 bg-purple-50">{spec.name}</Badge>
                ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <p className="text-sm">
              From <span className="font-bold text-purple-600">₦{salon.startingPrice.toLocaleString()}</span>
            </p>
            <div className="flex items-center gap-2">
                <Button onClick={() => onBookNow(salon)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  Book Now
                </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-2xl flex flex-col border-purple-100">
      <CardHeader className="p-0 relative">
        <Link href={profileLink}>
          <ImageWithFallback
            src={salon.image}
            alt={salon.name}
            width={600}
            height={400}
            className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint={salon.imageHint}
          />
        </Link>
        <div className="absolute top-3 left-3 flex gap-2">
            {salon.featured && <Badge variant="secondary" className="bg-pink-600 text-white border-none"><Zap className="h-3 w-3 mr-1" /> Featured</Badge>}
            {salon.verified && <Badge variant="secondary" className="bg-green-600 text-white border-none"><CheckCircle className="h-3 w-3 mr-1" /> Verified</Badge>}
        </div>
        <Button 
          size="icon" 
          variant="outline" 
          className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={toggleFavorite}
          disabled={isFavoriteLoading}
        >
            {isFavoriteLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className={`h-4 w-4 text-red-500 ${isFavorited ? 'fill-current' : 'fill-transparent'}`} />
            )}
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
            {salon.services?.slice(0, 3).map(spec => (
                <Badge key={spec.name} variant="outline" className="text-purple-600 border-purple-100 bg-purple-50">{spec.name}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-sm">
          From <span className="font-bold text-purple-600">₦{salon.startingPrice.toLocaleString()}</span>
        </p>
        <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Link href="/dashboard/customer/messages">
                    <MessageSquare className="h-4 w-4" />
                </Link>
            </Button>
            <Button onClick={() => onBookNow(salon)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Book Now
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SalonCard;
