'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-[600px] w-full">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Woman getting her hair done"
        layout="fill"
        objectFit="cover"
        className="brightness-50"
        data-ai-hint="salon hair styling"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="font-headline text-5xl md:text-7xl font-bold !leading-tight tracking-tighter">
          Find the Perfect Salon <br /> for Your Style in Your City
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-200">
          From braids to nails, discover top-rated beauty professionals near you.
        </p>
        <div className="mt-8 w-full max-w-3xl rounded-lg bg-white/20 p-4 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
                placeholder="What service are you looking for?"
                className="text-foreground md:col-span-2"
            />
            <Select>
              <SelectTrigger className="text-foreground">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lagos">Lagos</SelectItem>
                <SelectItem value="accra">Accra</SelectItem>
                <SelectItem value="nairobi">Nairobi</SelectItem>
                <SelectItem value="joburg">Johannesburg</SelectItem>
              </SelectContent>
            </Select>
            <Button size="lg" className="w-full" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white">
              <MapPin className="mr-2 h-5 w-5" />
              Use my current location
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
