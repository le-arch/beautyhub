import Image from 'next/image';
import type { Salon } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';

interface SalonCardProps {
  salon: Salon;
}

const SalonCard = ({ salon }: SalonCardProps) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(salon.rating) ? 'text-primary fill-primary' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      <CardHeader className="p-0 relative">
        <Image
          src={salon.image}
          alt={salon.name}
          width={600}
          height={400}
          className="h-48 w-full object-cover"
          data-ai-hint={salon.imageHint}
        />
        <Badge variant="destructive" className="absolute top-2 right-2" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
          Top Rated
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-headline text-xl font-bold">{salon.name}</h3>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1.5 h-4 w-4" />
          <span>{salon.location}</span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          {renderStars()}
          <span className="ml-2 text-xs text-muted-foreground">({salon.reviews} reviews)</span>
        </div>
        <p className="mt-2 text-sm">
          Starting from <span className="font-bold text-primary">${salon.startingPrice}</span>
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default SalonCard;
