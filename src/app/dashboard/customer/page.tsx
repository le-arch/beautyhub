
import TopRatedSalons from '@/components/top-rated-salons';
import FeaturedCategories from '@/components/featured-categories';
import AiStylist from '@/components/ai-stylist';
import HeroSection from '@/components/hero-section';

export default function CustomerDashboard() {
  return (
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <TopRatedSalons />
        <AiStylist />
      </main>
  );
}
