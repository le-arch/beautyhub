import { Card, CardContent } from '@/components/ui/card';
import { Scissors, Paintbrush, Wind, Smile, Brush } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Braiding', icon: 'Wind', href: '#' },
  { name: 'Nails', icon: 'Paintbrush', href: '#' },
  { name: 'Dreadlocks', icon: 'Dreadlocks', href: '#' },
  { name: 'Spa & Facials', icon: 'Smile', href: '#' },
  { name: 'Makeup', icon: 'Brush', href: '#' },
  { name: 'Barbering', icon: 'Scissors', href: '#' },
];

const iconComponents: { [key: string]: React.ReactNode } = {
    Wind: <Wind className="h-8 w-8 text-primary" />,
    Paintbrush: <Paintbrush className="h-8 w-8 text-primary" />,
    Dreadlocks: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M4 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/><path d="M8 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/><path d="M12 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/><path d="M16 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/><path d="M20 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>,
    Smile: <Smile className="h-8 w-8 text-primary" />,
    Brush: <Brush className="h-8 w-8 text-primary" />,
    Scissors: <Scissors className="h-8 w-8 text-primary" />,
};

const FeaturedCategories = () => {
  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <h2 className="text-center font-headline text-4xl font-bold">
          Explore Our Services
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Find professionals for any look or treatment you desire. We've curated the best in the business.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link href={category.href} key={category.name}>
              <Card className="group transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  {iconComponents[category.icon]}
                  <h3 className="mt-4 font-headline text-lg font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
