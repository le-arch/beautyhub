
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, AlertTriangle } from 'lucide-react';
import SalonCard from '@/components/salon-card';
import type { Salon } from '@/lib/types';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@supabase/supabase-js';

export default function FavoritesPage() {
  const [favoritedSalons, setFavoritedSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserAndFavorites = async () => {
      setLoading(true);
      setError(null);
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setError("You must be logged in to view your favorites.");
        setUser(null);
        setLoading(false);
        return;
      }
      
      setUser(authUser);

      const { data, error: fetchError } = await supabase
        .from('favorites')
        .select(`
          created_at,
          salons (
            id,
            name,
            image,
            imageHint,
            location,
            rating,
            reviews,
            startingPrice,
            verified,
            featured,
            services:services (id, name, price, duration),
            gallery:gallery (id, url, hint, type)
          )
        `)
        .eq('user_id', authUser.id);

      if (fetchError) {
        console.error("Error fetching favorites:", fetchError);
        setError("Could not load your favorite salons. Please try again.");
      } else {
        const salons = data.map((fav: { salons: any; }) => fav.salons).filter(Boolean) as Salon[];
        setFavoritedSalons(salons);
      }
      setLoading(false);
    };
    getUserAndFavorites();
  }, [supabase]);

  const handleBookNow = (salon: Salon) => {
    // This would typically open a booking modal or navigate to the salon's booking page
    console.log('Booking for salon:', salon.name);
    toast({ title: 'Booking system not implemented in this view.' });
  };
  
  return (
    <main className="flex-1 p-8 bg-gradient-beauty-secondary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-purple-600 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900">Your Favorite Salons</h1>
              {!loading && !error && (
                <p className="text-lg text-warmgray-600">
                  {favoritedSalons.length > 0 
                    ? `${favoritedSalons.length} ${favoritedSalons.length === 1 ? 'salon' : 'salons'} saved`
                    : "Build your collection of favorite beauty destinations"
                  }
                </p>
              )}
            </div>
          </div>
        </div>
        
        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                </div>
             ))}
           </div>
        ) : error ? (
            <Alert variant="destructive" className="mb-8">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        ) : favoritedSalons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {favoritedSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon as any} onBookNow={handleBookNow} />
            ))}
          </div>
        ) : (
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
            
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              asChild
            >
              <Link href="/dashboard/customer/explore">Explore Salons</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

    