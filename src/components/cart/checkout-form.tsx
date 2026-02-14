"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Truck, CheckCircle2, User, Phone, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { saveOrder, type Order } from "@/lib/history";
import { createOrder } from "@/lib/api";
import { cn } from "@/lib/utils";

interface UserData {
    name: string;
    phone: string;
    address: string;
    timestamp: number;
}

interface CheckoutFormProps {
    onSuccess?: () => void;
    className?: string;
}

export function CheckoutForm({ onSuccess, className }: CheckoutFormProps) {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [instructions, setInstructions] = useState("");
    const [saveInfo, setSaveInfo] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const total = getTotalPrice();

    useEffect(() => {
        // Load saved user info if valid (30 days for user info, longer than just address)
        const savedData = localStorage.getItem("user_checkout_data");
        if (savedData) {
            try {
                const data: UserData = JSON.parse(savedData);
                const thirtyDays = 30 * 24 * 60 * 60 * 1000;
                if (Date.now() - data.timestamp < thirtyDays) {
                    setName(data.name || "");
                    setPhone(data.phone || "");
                    setAddress(data.address || "");
                    setSaveInfo(true);
                }
            } catch (e) {
                console.error("Failed to parse saved user data", e);
            }
        } else {
            // Fallback to old address key if exists logic could be added but simpler to start fresh or migrate.
            // I'll stick to new key "user_checkout_data" to cover all fields.
        }
    }, []);

    const handlePlaceOrder = async () => {
        if (!name.trim()) {
            toast.error("Please enter your name");
            return;
        }
        if (!phone.trim()) {
            toast.error("Please enter your phone number");
            return;
        }
        if (!address.trim()) {
            toast.error("Please enter a delivery address");
            return;
        }

        setIsSubmitting(true);

        const success = await createOrder(name, phone, address, instructions, items);

        if (!success) {
            toast.error("Failed to place order. Please try again.");
            setIsSubmitting(false);
            return;
        }

        if (saveInfo) {
            const data: UserData = {
                name,
                phone,
                address,
                timestamp: Date.now(),
            };
            localStorage.setItem("user_checkout_data", JSON.stringify(data));
        } else {
            localStorage.removeItem("user_checkout_data");
        }

        const newOrder: Order = {
            id: `#${Date.now().toString().slice(-6)}`,
            date: Date.now(),
            items: [...items],
            total,
            address,
            customerName: name,
            phoneNumber: phone,
            instructions: instructions.trim() || undefined,
            status: "Completed",
        };
        saveOrder(newOrder);

        // Simulate order placement
        toast.success("Order placed successfully!", {
            description: "You will pay via Cash on Delivery.",
        });

        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            clearCart();
            setIsSuccess(false);
            if (onSuccess) onSuccess();
        }, 3000);
    };

    if (isSuccess) {
        return (
            <div className={cn("flex flex-col items-center justify-center py-12 text-center h-full", className)}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
                >
                    <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
                <p className="text-muted-foreground">
                    Thank you, {name.split(' ')[0]}! We'll call you if needed.
                </p>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
                <div className="space-y-8 py-4">
                    {/* Personal Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <User className="h-5 w-5" />
                            <span>Contact Details</span>
                        </div>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-secondary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="e.g. 050 123 4567"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="pl-9 bg-secondary/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <MapPin className="h-5 w-5" />
                            <span>Delivery Address</span>
                        </div>
                        <Textarea
                            placeholder="Building, Street, Area..."
                            className="min-h-[100px] resize-none bg-secondary/20 border-border/50 focus:border-primary/50 transition-colors"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="save-info"
                                checked={saveInfo}
                                onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                            />
                            <Label htmlFor="save-info" className="text-sm text-muted-foreground cursor-pointer">
                                Save my details for next time
                            </Label>
                        </div>
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <FileText className="h-5 w-5" />
                            <span>Special Instructions (Optional)</span>
                        </div>
                        <Textarea
                            placeholder="e.g. Extra napkins, ring doorbell..."
                            className="min-h-[80px] resize-none bg-secondary/20 border-border/50 focus:border-primary/50 transition-colors"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
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
            </div>

            <div className="pt-4 mt-auto">
                <Button
                    className="w-full text-lg h-12 rounded-full font-semibold shadow-lg shadow-primary/20"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Placing Order...
                        </>
                    ) : (
                        `Place Order • AED ${total.toFixed(2)}`
                    )}
                </Button>
            </div>
        </div>
    );
}
