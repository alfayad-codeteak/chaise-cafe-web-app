"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CartContent } from "./cart-content";

export function CartWrapper({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md p-0 h-full flex flex-col gap-0 border-l">
                <SheetTitle className="sr-only">Cart</SheetTitle>
                <SheetDescription className="sr-only">Your Shopping Cart</SheetDescription>
                <CartContent />
            </SheetContent>
        </Sheet>
    );
}
