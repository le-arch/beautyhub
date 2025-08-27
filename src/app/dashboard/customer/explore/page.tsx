'use client';

import { useState } from 'react';
import { SearchAndFilter } from '@/components/search-and-filter';
import SalonCard from '@/components/salon-card';
import { mockSalons } from '@/lib/mock-data';
import { BookingSystem } from '@/components/booking-system';
import type { Salon } from '@/lib/types';

export default function ExplorePage() {
    const [filteredSalons, setFilteredSalons] = useState(mockSalons);
    const [isBooking, setIsBooking] = useState(false);
    const [selectedSalonId, setSelectedSalonId] = useState<number | null>(null);

    const handleFilterChange = (filters: any) => {
        console.log('Applying filters:', filters);
        setFilteredSalons(mockSalons);
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
                    {filteredSalons.map(salon => (
                        <div key={salon.id}>
                            <SalonCard salon={salon} />
                             <button
                                onClick={() => handleBookNow(salon)}
                                className="mt-2 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
                            >
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            {isBooking && selectedSalonId && (
                <BookingSystem salonId={selectedSalonId} onClose={handleCloseBooking} />
            )}
        </>
    );
}