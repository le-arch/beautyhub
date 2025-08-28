
'use client';

import { useState, useEffect } from 'react';
import { SearchAndFilter } from '@/components/search-and-filter';
import SalonCard from '@/components/salon-card';
import { mockSalons } from '@/lib/mock-data';
import { BookingSystem } from '@/components/booking-system';
import type { Salon } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExplorePage() {
    const [salons, setSalons] = useState<Salon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedSalonId, setSelectedSalonId] = useState<number | null>(null);

    // Initialize Supabase client
    const supabase = createClient();

    useEffect(() => {
      const fetchSalons = async () => {
        setLoading(true);
        // In a real app, you would fetch from Supabase like this:
        /*
        const { data, error } = await supabase
          .from('salons') // Assuming you have a 'salons' table
          .select('*');

        if (error) {
          console.error('Error fetching salons:', error);
          // For now, fall back to mock data on error
          setSalons(mockSalons);
        } else {
          // You might need to map the data from Supabase to your Salon type
          setSalons(data as Salon[]);
        }
        */
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        setSalons(mockSalons);
        setLoading(false);
      };

      fetchSalons();
    }, [supabase]);

    const handleFilterChange = (filters: any) => {
        console.log('Applying filters:', filters);
        // Filtering logic would be applied to the Supabase query in a real app
        setSalons(mockSalons);
    };

    const handleBookNow = (salon: Salon) => {
        setSelectedSalonId(salon.id);
        setIsBooking(true);
    };

    const handleCloseBooking = () => {
        setIsBooking(false);
        setSelectedSalonId(null);
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
                            <div key={salon.id}>
                                <SalonCard salon={salon} />
                                 <button
                                    onClick={() => handleBookNow(salon)}
                                    className="mt-2 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
                                >
                                    Book Now
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </main>
            {isBooking && selectedSalonId && (
                <BookingSystem salonId={selectedSalonId} onClose={handleCloseBooking} />
            )}
        </>
    );
}
