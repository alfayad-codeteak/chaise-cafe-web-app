import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Truck, CheckCircle2 } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerDescription, DrawerFooter, DrawerHeader } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { saveOrder, type Order } from "@/lib/history";

interface AddressData {
    address: string;
    timestamp: number;
}

export function CheckoutDrawer({ children }: { children: React.ReactNode }) {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [saveAddress, setSaveAddress] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const total = getTotalPrice();

    useEffect(() => {
        if (open) {
            // Load saved address if valid (7 days)
            const savedData = localStorage.getItem("user_address_data");
            if (savedData) {
                try {
                    const { address, timestamp }: AddressData = JSON.parse(savedData);
                    const sevenDays = 7 * 24 * 60 * 60 * 1000;
                    if (Date.now() - timestamp < sevenDays) {
                        setAddress(address);
                        setSaveAddress(true);
                    }
                } catch (e) {
                    console.error("Failed to parse saved address", e);
                }
            }
        }
    }, [open]);

    const handlePlaceOrder = () => {
        if (!address.trim()) {
            toast.error("Please enter a delivery address");
            return;
        }

        if (saveAddress) {
            const data: AddressData = {
                address,
                timestamp: Date.now(),
            };
            localStorage.setItem("user_address_data", JSON.stringify(data));
        } else {
            localStorage.removeItem("user_address_data");
        }

        const newOrder: Order = {
            id: `#${Date.now().toString().slice(-6)}`,
            date: Date.now(),
            items: [...items],
            total,
            address,
            status: "Completed",
        };
        saveOrder(newOrder);

        // Simulate order placement
        toast.success("Order placed successfully!", {
            description: "You will pay via Cash on Delivery.",
        });

        setIsSuccess(true);
        setTimeout(() => {
            clearCart();
            setOpen(false);
            setIsSuccess(false);
        }, 3000);
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
                <DrawerHeader className="text-left px-6 pt-6">
                    <DrawerTitle className="text-2xl font-bold">Checkout</DrawerTitle>
                    <DrawerDescription>
                        Complete your order
                    </DrawerDescription>
                </DrawerHeader>

                <ScrollArea className="px-6 overflow-y-auto">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
                            </motion.div>
                            <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
                            <p className="text-muted-foreground">
                                Thank you for your order. We'll start preparing it right away.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8 py-4">
                            {/* Address Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-medium">
                                    <MapPin className="h-5 w-5" />
                                    <span>Delivery Address</span>
                                </div>
                                <Textarea
                                    placeholder="Enter your full delivery address..."
                                    className="min-h-[120px] resize-none bg-secondary/20 border-border/50 focus:border-primary/50 transition-colors"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="save-address"
                                        checked={saveAddress}
                                        onCheckedChange={(checked) => setSaveAddress(checked as boolean)}
                                    />
                                    <Label htmlFor="save-address" className="text-sm text-muted-foreground cursor-pointer">
                                        Save this address for next time
                                    </Label>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary font-medium">
                                    <Truck className="h-5 w-5" />
                                    <span>Payment Method</span>
                                </div>
                                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Cash on Delivery</span>
                                        <span className="text-xs text-muted-foreground">Pay when your order arrives</span>
                                    </div>
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="space-y-4 pt-4 border-t">
                                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Order Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Items ({items.length})</span>
                                        <span>AED {total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                                        <span>Total to Pay</span>
                                        <span className="text-primary">AED {total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </ScrollArea>

                {!isSuccess && (
                    <DrawerFooter className="px-6 pb-6 pt-2">
                        <Button
                            className="w-full text-lg h-12 rounded-full font-semibold shadow-lg shadow-primary/20"
                            size="lg"
                            onClick={handlePlaceOrder}
                        >
                            Place Order • AED {total.toFixed(2)}
                        </Button>
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    );
}
