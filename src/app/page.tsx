import { Hero } from "@/components/home/hero";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { Header } from "@/components/layout/header";
import { HomeMenuSection } from "@/components/home/home-menu-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Featured Items</h2>
        <FeaturedCarousel />
      </section>

      <HomeMenuSection />

      <section className="bg-orange-50 dark:bg-zinc-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-background rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">Sourced from the best farms around the world.</p>
            </div>
            <div className="p-6 bg-background rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">Hot and fresh delivered to your doorstep.</p>
            </div>
            <div className="p-6 bg-background rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Professional Baristas</h3>
              <p className="text-gray-600 dark:text-gray-400">Expertly crafted coffee for the perfect taste.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
