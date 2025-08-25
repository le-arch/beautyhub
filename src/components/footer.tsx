import Link from 'next/link';
import { Sparkles, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-foreground">
      <div className="container max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
                <span className="font-headline text-2xl font-bold">
                    BeautyHub
                </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Connecting you to the best beauty and wellness professionals across Africa.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Youtube /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h3 className="font-headline text-lg font-semibold">For Clients</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Explore Salons</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Find by City</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Find by Service</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Beauty Tips</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">For Businesses</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Add Your Salon</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Business Login</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help for Owners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BeautyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
