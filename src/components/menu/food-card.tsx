"use client";

import Image from "next/image";
import { MenuItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface FoodCardProps {
    item: MenuItem;
}



export function FoodCard({ item }: FoodCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(item);
        toast.success(`Added ${item.name} to cart`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <Card className="h-full border-none transition-all duration-300 overflow-hidden bg-card group rounded-2xl flex flex-col">
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                        src={item.image || "https://placehold.co/600x400/orange/white?text=Chaise+Cafe"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-4">
                        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                            {item.category}
                        </div>
                        <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                        </h3>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price</span>
                            <span className="text-lg font-bold text-primary">AED {item.price.toFixed(2)}</span>
                        </div>

                        <Button
                            size="icon"
                            className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
                            onClick={handleAddToCart}
                            aria-label={`Add ${item.name} to cart`}
                        >
                            <Plus className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
