"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cartStore";
import { CartContent } from "@/components/cart/cart-content";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingControls() {
    const { theme, setTheme } = useTheme();
    const totalItems = useCartStore((state) => state.getTotalItems());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Bottom Left: Theme Toggle - Desktop Only */}
            <div className="fixed bottom-6 left-6 z-50 hidden md:block">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="h-14 w-14 rounded-full shadow-lg border-2 border-primary/10 hover:scale-110 transition-transform duration-300 bg-background/80 backdrop-blur-md"
                    aria-label="Toggle theme"
                >
                    <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
                    <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-500" />
                </Button>
            </div>

            {/* Bottom Right: Cart Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="default"
                            size="icon"
                            className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group relative"
                            aria-label="Open cart"
                        >
                            <ShoppingCart className="h-6 w-6 transition-transform group-hover:rotate-12" />
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-2 -right-2"
                                    >
                                        <Badge className="h-6 w-6 flex items-center justify-center p-0 rounded-full bg-destructive text-destructive-foreground border-2 border-background font-bold shadow-sm">
                                            {totalItems}
                                        </Badge>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md p-0 h-full flex flex-col gap-0">
                        <CartContent />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
