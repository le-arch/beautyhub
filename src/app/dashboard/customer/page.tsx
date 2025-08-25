
import CustomerDashboardHeader from '@/app/dashboard/customer/header';
import TopRatedSalons from '@/components/top-rated-salons';
import FeaturedCategories from '@/components/featured-categories';
import Footer from '@/components/footer';
import AiStylist from '@/components/ai-stylist';

export default function CustomerDashboard() {
  return (
    <>
      <CustomerDashboardHeader />
      <main className="flex-1">
        <section className="py-12 text-center bg-secondary">
            <h1 className="font-headline text-4xl font-bold">Welcome, Valued Customer!</h1>
            <p className="mt-2 text-muted-foreground">Explore top salons, services, and get AI-powered recommendations.</p>
        </section>
        <FeaturedCategories />
        <TopRatedSalons />
        <AiStylist />
      </main>
      <Footer />
    </>
  );
}
