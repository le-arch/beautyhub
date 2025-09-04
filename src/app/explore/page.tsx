
'use client';

import { useState, useEffect } from 'react';
import { SearchAndFilter } from '@/components/search-and-filter';
import SalonCard from '@/components/salon-card';
import { BookingSystem } from '@/components/booking-system';
import type { Salon } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { mockSalons } from '@/lib/mock-data';

export default function ExplorePage() {
    const [salons, setSalons] = useState<Salon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setSalons(mockSalons);
            setLoading(false);
        }, 500);
    }, []);

    const handleFilterChange = (filters: any) => {
        setLoading(true);
        setTimeout(() => {
            let filteredSalons = mockSalons;
            if (filters.query) {
                filteredSalons = filteredSalons.filter(s => s.name.toLowerCase().includes(filters.query.toLowerCase()));
            }
             if (filters.category && filters.category !== 'All') {
               filteredSalons = filteredSalons.filter(salon => 
                    salon.services.some(service => service.name.includes(filters.category))
                );
            }
            setSalons(filteredSalons);
            setLoading(false);
        }, 500);
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
