"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "@/lib/api";
import { FoodCard } from "@/components/menu/food-card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedCarousel() {
    const { data: menuItems, isLoading } = useQuery({
        queryKey: ['menu'],
        queryFn: fetchMenu,
    });

    const featuredItems = menuItems?.filter((item) => item.featured) || [];

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {featuredItems.map((item) => (
                    <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                        <div className="p-1 h-full">
                            <FoodCard item={item} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
    );
}
