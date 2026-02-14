"use client";

import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@/lib/types";
import { FoodCard } from "@/components/menu/food-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { fetchMenu } from "@/lib/api";

export function HomeMenuSection() {
    const { data: menuItems, isLoading } = useQuery({
        queryKey: ['menu'],
        queryFn: fetchMenu,
    });

    if (isLoading) {
        return (
            <section className="container mx-auto px-4 py-16 space-y-16">
                {[1, 2].map((i) => (
                    <div key={i} className="space-y-6">
                        <Skeleton className="h-10 w-48 rounded-lg" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((j) => (
                                <Skeleton key={j} className="h-[300px] w-full rounded-xl" />
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        );
    }

    const categories = Array.from(new Set(menuItems?.map((item) => item.category) || []));

    return (
        <section className="container mx-auto px-4 py-16 space-y-20">
            {categories.map((category) => {
                const categoryItems = menuItems?.filter(item => item.category === category).slice(0, 3); // Show top 3 items per category

                if (!categoryItems || categoryItems.length === 0) return null;

                return (
                    <div key={category} className="space-y-8">
                        <div className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-800">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground">
                                {category}
                            </h2>
                            <Button variant="ghost" asChild className="group">
                                <Link href={`/menu?category=${category}`} className="flex items-center gap-2 text-primary font-medium">
                                    View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryItems.map((item, idx) => (
                                <FoodCard key={item.id || `fallback-${category}-${idx}`} item={item} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
