
'use client';

import { useState, useEffect } from 'react';
import { SearchAndFilter } from '@/components/search-and-filter';
import SalonCard from '@/components/salon-card';
import { BookingSystem } from '@/components/booking-system';
import type { Salon } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Frown } from 'lucide-react';
import { mockSalons } from '@/lib/mock-data';

export default function ExplorePage() {
    const [salons, setSalons] = useState<Salon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

    const fetchSalons = (filters: any = {}) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            let filteredSalons = mockSalons;

            if (filters.query) {
                filteredSalons = filteredSalons.filter(salon => 
                    salon.name.toLowerCase().includes(filters.query.toLowerCase())
                );
            }

            if (filters.category && filters.category !== 'All') {
               filteredSalons = filteredSalons.filter(salon => 
                    salon.services.some(service => service.name.includes(filters.category))
                );
            }
            
            if(filters.priceRange) {
                filteredSalons = filteredSalons.filter(salon =>
                    salon.startingPrice >= filters.priceRange[0] && salon.startingPrice <= filters.priceRange[1]
                );
            }

            if(filters.rating) {
                 filteredSalons = filteredSalons.filter(salon => salon.rating >= filters.rating[0]);
            }
            
            if(filters.sortBy) {
                const [field, direction] = filters.sortBy.split('-');
                filteredSalons.sort((a, b) => {
                    const valA = a[field as keyof Salon];
                    const valB = b[field as keyof Salon];
                    if (typeof valA === 'number' && typeof valB === 'number') {
                        return direction === 'asc' ? valA - valB : valB - valA;
                    }
                    if (typeof valA === 'string' && typeof valB === 'string') {
                         return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                    }
                    return 0;
                });
            } else {
                 filteredSalons.sort((a, b) => b.rating - a.rating);
            }

            setSalons(filteredSalons);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        fetchSalons();
    }, []);


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
                <SearchAndFilter onFiltersChange={fetchSalons} />

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
