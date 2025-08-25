
import Header from '@/app/header';
import HeroSection from '@/components/hero-section';
import FeaturedCategories from '@/components/featured-categories';
import TopRatedSalons from '@/components/top-rated-salons';
import HowItWorks from '@/components/how-it-works';
import PromoteSalon from '@/components/promote-salon';
import BlogTeasers from '@/components/blog-teasers';
import AiStylist from '@/components/ai-stylist';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <TopRatedSalons />
        <HowItWorks />
        <PromoteSalon />
        <AiStylist />
        <BlogTeasers />
      </main>
      <Footer />
    </>
  );
}
