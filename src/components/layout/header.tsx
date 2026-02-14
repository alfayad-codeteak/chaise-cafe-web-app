"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu as MenuIcon, Home, Coffee, Star, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { CartContent } from "@/components/cart/cart-content";
import { ThemeToggle } from "@/components/theme-toggle"; // We'll need to create this
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
    const totalItems = useCartStore((state) => state.getTotalItems());
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="fixed top-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="container relative mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-6">
                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden h-10 w-10">
                                <MenuIcon className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[85vw] max-w-xs p-6 flex flex-col h-full bg-background border-r">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <SheetDescription className="sr-only">
                                Main navigation menu for mobile devices
                            </SheetDescription>

                            <div className="flex items-center justify-center mb-8 mt-6">
                                <div className="relative h-52 w-52 overflow-hidden rounded-full shadow-md">
                                    <Image
                                        src="/company-logo.png"
                                        alt="Chaise Logo"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <nav className="flex flex-col items-center gap-4 mt-4">
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <Home className="h-5 w-5" />
                                    Home
                                </Link>
                                <Link
                                    href="/menu"
                                    className="flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <Coffee className="h-5 w-5" />
                                    Menu
                                </Link>
                                <Link
                                    href="/#features"
                                    className="flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <Star className="h-5 w-5" />
                                    Features
                                </Link>
                            </nav>

                            <div className="mt-auto px-2 pb-4 flex flex-col gap-4 items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="gap-2"
                                >
                                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span>Toggle Theme</span>
                                </Button>
                                <p className="text-sm text-muted-foreground text-center">
                                    © 2024 Chaise
                                </p>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/">
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/menu">
                                            Menu
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Centered Bigger Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/" className="block">
                        <div className="relative h-32 w-32 overflow-hidden">
                            <Image
                                src="/company-logo.png"
                                alt="Chaise Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    <div className="hidden md:block">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={mounted && totalItems > 0 ? "default" : "outline"} size="icon" className="relative h-10 w-10">
                                    <ShoppingCart className="h-5 w-5" />
                                    {mounted && totalItems > 0 && (
                                        <Badge
                                            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground"
                                        >
                                            {totalItems}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:max-w-md p-0 h-full flex flex-col gap-0">
                                <CartContent />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
