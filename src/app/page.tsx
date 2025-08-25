
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  MapPin,
  Star,
  Heart,
  MessageCircle,
  Clock,
  TrendingUp,
  Navigation,
  Sparkles
} from 'lucide-react';
import SalonCard from '@/components/salon-card';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import FeaturedCategories from '@/components/featured-categories';
import TopRatedSalons from '@/components/top-rated-salons';
import HowItWorks from '@/components/how-it-works';
import PromoteSalon from '@/components/promote-salon';
import AiStylist from '@/components/ai-stylist';
import BlogTeasers from '@/components/blog-teasers';
import HeroSection from '@/components/hero-section';

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <TopRatedSalons />
        <HowItWorks />
        <PromoteSalon />
        <AiStylist />
        <BlogTeasers />
      </main>
      <Footer />
    </div>
  );
}
