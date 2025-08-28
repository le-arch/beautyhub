
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Search, Filter, AlertTriangle } from 'lucide-react';
import SalonCard from '@/components/salon-card';
import type { Salon } from '@/lib/types';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FavoritesPage() {
  const supabase = createClient();
  const [favoritedSalons, setFavoritedSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      setError(null);

      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      if (!authUser) {
        setLoading(false);
        return;
      }

      const { data: favoriteIds, error: favError } = await supabase
        .from('favorites')
        .select('salon_id')
        .eq('user_id', authUser.id);

      if (favError) {
        console.error("Error fetching favorite IDs:", favError);
        setError("Could not load your favorite salons.");
        setLoading(false);
        return;
      }
      
      const salonIds = favoriteIds.map(f => f.salon_id);

      if (salonIds.length === 0) {
        setFavoritedSalons([]);
        setLoading(false);
        return;
      }

      const { data: salons, error: salonsError } = await supabase
        .from('salons')
        .select('*')
        .in('id', salonIds);
      
      if (salonsError) {
        console.error("Error fetching salons:", salonsError);
        setError("Could not load your favorite salons' details.");
      } else {
        setFavoritedSalons(salons as Salon[]);
      }

      setLoading(false);
    };

    getFavorites();
  }, [supabase]);

  if (!user && !loading) {
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-purple-600 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900">Your Favorite Salons</h1>
              <p className="text-lg text-warmgray-600">
                {!loading && (favoritedSalons.length > 0 
                  ? `${favoritedSalons.length} ${favoritedSalons.length === 1 ? 'salon' : 'salons'} saved`
                  : "Build your collection of favorite beauty destinations"
                )}
              </p>
            </div>
          </div>
        </div>

        {error && (
            <Alert variant="destructive" className="mb-8">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

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
        ) : favoritedSalons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {favoritedSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon as any} />
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
