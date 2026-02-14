"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu as MenuIcon, Home, Coffee, Star, History } from "lucide-react";
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
import { CartWrapper } from "@/components/cart/cart-wrapper";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
    const totalItems = useCartStore((state) => state.getTotalItems());
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
                                <Link
                                    href="/orders"
                                    className="flex items-center gap-3 text-lg font-medium py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <History className="h-5 w-5" />
                                    My Orders
                                </Link>
                            </nav>

                            <div className="mt-auto px-2 pb-4 flex flex-col gap-4 items-center">
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
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/orders">
                                            My Orders
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
                        <CartWrapper>
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
                        </CartWrapper>
                    </div>
                </div>
            </div>
        </header>
    );
}
