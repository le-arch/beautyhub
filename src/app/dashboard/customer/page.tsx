
import CustomerDashboardHeader from '@/app/dashboard/customer/header';
import TopRatedSalons from '@/components/top-rated-salons';
import FeaturedCategories from '@/components/featured-categories';
import Footer from '@/components/footer';
import AiStylist from '@/components/ai-stylist';
import CustomerDashboardLayout from '@/app/dashboard/customer/layout';
import HeroSection from '@/components/hero-section';

export default function CustomerDashboard() {
  return (
    <CustomerDashboardLayout>
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <TopRatedSalons />
        <AiStylist />
      </main>
    </CustomerDashboardLayout>
  );
}
