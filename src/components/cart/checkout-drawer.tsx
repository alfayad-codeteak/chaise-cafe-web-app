import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerDescription, DrawerHeader } from "@/components/ui/drawer";
import { CheckoutForm } from "./checkout-form";

export function CheckoutDrawer({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh] flex flex-col h-full">
                <DrawerHeader className="text-left px-6 pt-6 shrink-0">
                    <DrawerTitle className="text-2xl font-bold">Checkout</DrawerTitle>
                    <DrawerDescription>
                        Complete your order
                    </DrawerDescription>
                </DrawerHeader>

                <div className="px-6 pb-6 flex-1 overflow-hidden">
                    <CheckoutForm onSuccess={() => setOpen(false)} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
