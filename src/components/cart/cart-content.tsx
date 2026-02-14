"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "./cart-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CheckoutForm } from "./checkout-form";

export function CartContent() {
    const { items, getTotalPrice } = useCartStore();
    const total = getTotalPrice();
    const [view, setView] = useState<"cart" | "checkout">("cart");

    if (items.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center space-y-4 p-6 text-center">
                <SheetHeader>
                    <SheetTitle className="sr-only">Cart</SheetTitle>
                    <SheetDescription className="sr-only">
                        Your shopping cart is currently empty
                    </SheetDescription>
                </SheetHeader>
                <div className="bg-secondary/20 p-6 rounded-full">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold">Your cart is empty</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                </div>
            </div>
        );
    }

    if (view === "checkout") {
        return (
            <div className="flex h-full flex-col overflow-hidden relative bg-background">
                <SheetHeader className="px-6 pt-6 pb-2 shrink-0 flex flex-row items-center gap-2 space-y-0">
                    <Button variant="ghost" size="icon" onClick={() => setView("cart")} className="-ml-2 h-8 w-8">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <SheetTitle>Checkout</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-hidden px-6 pb-6">
                    <CheckoutForm onSuccess={() => setView("cart")} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col overflow-hidden relative bg-background">
            <SheetHeader className="px-6 pt-6 pb-2 shrink-0">
                <SheetTitle>My Order ({items.length})</SheetTitle>
            </SheetHeader>

            <ScrollArea className="flex-1 w-full min-h-0">
                <div className="flex flex-col gap-6 px-6 py-4">
                    {items.map((item, index) => (
                        <div key={`${item.id}-${index}`}>
                            <CartItem item={item} />
                            <Separator className="mt-6 opacity-40" />
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="space-y-4 px-6 pb-6 pt-4 bg-background shrink-0 border-t z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="space-y-2">
                    <div className="flex justify-between text-base">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>AED {total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-lg pt-2 border-t mt-2">
                        <span>Total</span>
                        <span>AED {total.toFixed(2)}</span>
                    </div>
                </div>

                <Button
                    className="w-full text-lg h-12 rounded-full font-semibold shadow-lg shadow-primary/20"
                    size="lg"
                    onClick={() => setView("checkout")}
                >
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
}
