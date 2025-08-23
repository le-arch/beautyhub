
import Header from '@/app/header';
import TopRatedSalons from '@/components/top-rated-salons';
import FeaturedCategories from '@/components/featured-categories';
import Footer from '@/components/footer';

export default function CustomerDashboard() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 text-center">
            <h1 className="font-headline text-4xl font-bold">Welcome, Valued Customer!</h1>
            <p className="mt-2 text-muted-foreground">Explore top salons and services.</p>
        </section>
        <FeaturedCategories />
        <TopRatedSalons />
      </main>
      <Footer />
    </>
  );
}
