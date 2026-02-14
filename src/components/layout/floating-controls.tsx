"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartWrapper } from "@/components/cart/cart-wrapper";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingControls() {
    const totalItems = useCartStore((state) => state.getTotalItems());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {totalItems > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    <CartWrapper>
                        <Button
                            variant="default"
                            size="icon"
                            className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group relative"
                            aria-label="Open cart"
                        >
                            <ShoppingCart className="h-6 w-6 transition-transform group-hover:rotate-12" />
                            <div className="absolute -top-2 -right-2">
                                <Badge className="h-6 w-6 flex items-center justify-center p-0 rounded-full bg-destructive text-destructive-foreground border-2 border-background font-bold shadow-sm">
                                    {totalItems}
                                </Badge>
                            </div>
                        </Button>
                    </CartWrapper>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
