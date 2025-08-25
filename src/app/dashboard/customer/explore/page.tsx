'use client';

import { useState } from 'react';
import { SearchAndFilter } from '@/components/search-and-filter';
import SalonCard from '@/components/salon-card';
import { mockSalons } from '@/lib/mock-data';

export default function ExplorePage() {
    const [filteredSalons, setFilteredSalons] = useState(mockSalons);

    const handleFilterChange = (filters: any) => {
        // In a real app, you'd fetch from an API with these filters
        console.log('Applying filters:', filters);
        // For now, we'll just log them and show all salons
        setFilteredSalons(mockSalons);
    };

    return (
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <SearchAndFilter onFiltersChange={handleFilterChange} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredSalons.map(salon => (
                    <SalonCard key={salon.id} salon={salon} />
                ))}
            </div>
        </main>
    );
}

    