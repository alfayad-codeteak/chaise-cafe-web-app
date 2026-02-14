import { Header } from "@/components/layout/header";
import { MenuCategories } from "@/components/menu/menu-categories";

export default function MenuPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Explore our delicious offerings, from fresh coffee to hearty meals.</p>

                <MenuCategories />
            </div>
        </main>
    );
}
