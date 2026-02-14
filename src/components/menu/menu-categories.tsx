"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItem } from "@/lib/types";
import { FoodCard } from "@/components/menu/food-card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

import { fetchMenu } from "@/lib/api";

export function MenuCategories() {
    const [activeCategory, setActiveCategory] = useState("All");

    const { data: menuItems, isLoading } = useQuery({
        queryKey: ['menu'],
        queryFn: fetchMenu,
    });

    const categories = ['All', ...Array.from(new Set(menuItems?.map((item) => item.category) || []))];

    const filteredItems = activeCategory === 'All'
        ? menuItems
        : menuItems?.filter(item => item.category === activeCategory);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
            <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                <TabsList className="w-max h-auto flex flex-nowrap justify-start gap-2 bg-transparent p-0">
                    {categories.map((category) => (
                        <TabsTrigger
                            key={category}
                            value={category}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm sm:text-lg px-4 py-2 sm:px-6 sm:py-2 rounded-full border border-gray-200"
                        >
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <div className="min-h-[400px]">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems?.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FoodCard item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems?.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No items found in this category.
                    </div>
                )}
            </div>
        </Tabs>
    );
}
