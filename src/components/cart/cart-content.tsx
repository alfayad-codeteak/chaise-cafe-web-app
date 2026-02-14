"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "./cart-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export function CartContent() {
    const { items, getTotalPrice } = useCartStore();
    const total = getTotalPrice();

    if (items.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center space-y-4">
                <SheetHeader>
                    <SheetTitle className="sr-only">Cart</SheetTitle>
                    <SheetDescription className="sr-only">
                        Your shopping cart is currently empty
                    </SheetDescription>
                </SheetHeader>
                <ShoppingBag className="h-16 w-16 text-gray-300" />
                <div className="text-xl font-medium text-gray-900">Your cart is empty</div>
                <div className="text-sm text-gray-500">Add some delicious items to get started!</div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col overflow-hidden">
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
            <div className="space-y-4 px-6 pb-6 pt-4 bg-background shrink-0 border-t z-10">
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
                <Button className="w-full text-lg h-12 rounded-full" size="lg">
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
}
