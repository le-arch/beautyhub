import AiStylist from "@/components/ai-stylist";
import FeaturedCategories from "@/components/featured-categories";
import HeroSection from "@/components/hero-section";
import TopRatedSalons from "@/components/top-rated-salons";

export default function CustomerDashboard() {
  return (
    <>
        <HeroSection />
        <FeaturedCategories />
        <TopRatedSalons />
        <AiStylist />
    </>
  );
}
