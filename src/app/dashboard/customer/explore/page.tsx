
'use client';

import { useState, useEffect, useCallback } from 'react';
import { SearchAndFilter } from '@/components/search-and-filter';
import SalonCard from '@/components/salon-card';
import { BookingSystem } from '@/components/booking-system';
import type { Salon } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/lib/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Frown } from 'lucide-react';

export default function ExplorePage() {
    const [salons, setSalons] = useState<Salon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
    const supabase = createClient();
    const [error, setError] = useState<string | null>(null);

    const fetchSalons = useCallback(async (filters: any = {}) => {
        setLoading(true);
        setError(null);
        let query = supabase.from('salons').select(`
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
        `);

        if (filters.query) {
            query = query.ilike('name', `%${filters.query}%`);
        }

        if (filters.category && filters.category !== 'All') {
           query = query.filter('services.name', 'ilike', `%${filters.category}%`);
        }
        
        if(filters.priceRange) {
            query = query.gte('startingPrice', filters.priceRange[0]).lte('startingPrice', filters.priceRange[1]);
        }

        if(filters.rating) {
            query = query.gte('rating', filters.rating[0]);
        }
        
        const { data, error } = await query;
        
        if (error) {
            console.error('Error fetching salons:', error);
            setError('Could not fetch salons. Please try again later.');
        } else {
            setSalons(data as Salon[]);
        }
        setLoading(false);
    }, [supabase]);

    useEffect(() => {
      fetchSalons();
    }, [fetchSalons]);

    const handleFilterChange = (filters: any) => {
        fetchSalons(filters);
    };

    const handleBookNow = (salon: Salon) => {
        setSelectedSalon(salon);
        setIsBooking(true);
    };

    const handleCloseBooking = () => {
        setIsBooking(false);
        setSelectedSalon(null);
    };

    return (
        <>
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <SearchAndFilter onFiltersChange={handleFilterChange} />

                 {error && (
                    <Alert variant="destructive" className="mt-8">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {loading ? (
                       Array.from({ length: 8 }).map((_, index) => (
                           <div key={index} className="space-y-4">
                               <Skeleton className="h-48 w-full rounded-xl" />
                               <Skeleton className="h-6 w-3/4" />
                               <Skeleton className="h-4 w-1/2" />
                               <Skeleton className="h-10 w-full" />
                           </div>
                       ))
                    ) : salons.length > 0 ? (
                        salons.map(salon => (
                            <SalonCard key={salon.id} salon={salon} onBookNow={() => handleBookNow(salon)}/>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-24">
                           <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Frown className="h-12 w-12 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">
                                No Salons Found
                            </h2>
                            <p className="text-lg text-warmgray-600 mb-8 max-w-md mx-auto">
                                We couldn't find any salons matching your criteria. Try adjusting your filters.
                            </p>
                        </div>
                    )}
                </div>
            </main>
            {isBooking && selectedSalon && (
                <BookingSystem salon={selectedSalon} onClose={handleCloseBooking} />
            )}
        </>
    );
}
