
'use client';

import { useState, useEffect } from 'react';
import { SearchAndFilter } from '@/components/search-and-filter';
import SalonCard from '@/components/salon-card';
import { BookingSystem } from '@/components/booking-system';
import type { Salon } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/lib/supabase/client';

export default function ExplorePage() {
    const [salons, setSalons] = useState<Salon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
    const supabase = createClient();

    useEffect(() => {
      const fetchSalons = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('salons').select(`
          *,
          services (*),
          gallery (*)
        `);
        
        if (error) {
          console.error('Error fetching salons:', error);
        } else {
          setSalons(data as Salon[]);
        }
        setLoading(false);
      };

      fetchSalons();
    }, []);

    const handleFilterChange = async (filters: any) => {
        setLoading(true);
        let query = supabase.from('salons').select(`
            *,
            services (*),
            gallery (*)
        `);

        if (filters.query) {
            query = query.ilike('name', `%${filters.query}%`);
        }

        if (filters.category && filters.category !== 'All') {
            query = query.filter('services.name', 'ilike', `%${filters.category}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
            console.error('Error filtering salons:', error);
        } else {
            setSalons(data as Salon[]);
        }
        setLoading(false);
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
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {loading ? (
                       Array.from({ length: 8 }).map((_, index) => (
                           <div key={index} className="space-y-2">
                               <Skeleton className="h-48 w-full" />
                               <Skeleton className="h-6 w-3/4" />
                               <Skeleton className="h-4 w-1/2" />
                           </div>
                       ))
                    ) : (
                        salons.map(salon => (
                            <SalonCard key={salon.id} salon={salon} onBookNow={() => handleBookNow(salon)}/>
                        ))
                    )}
                </div>
            </main>
            {isBooking && selectedSalon && (
                <BookingSystem salon={selectedSalon} onClose={handleCloseBooking} />
            )}
        </>
    );
}
