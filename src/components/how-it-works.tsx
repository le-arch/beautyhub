import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Eye, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: '1. Search for Salons',
    description: 'Use our advanced search to find salons by service, city, or even what\'s nearest to you.',
  },
  {
    icon: Eye,
    title: '2. View Photos & Reviews',
    description: 'Browse through salon galleries, check out their services, and read real customer reviews.',
  },
  {
    icon: MessageSquare,
    title: '3. Contact or Book',
    description: 'Connect directly with salon owners via chat or call to ask questions and book your appointment.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <h2 className="text-center font-headline text-4xl font-bold">
          Finding Your Perfect Look is Easy
        </h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          In just a few clicks, you can discover and connect with the best beauty professionals.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
