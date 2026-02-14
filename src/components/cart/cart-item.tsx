"use client";

import { CartItem as CartItemType } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <div className="flex gap-3">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border/50 bg-secondary/20">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between py-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-sm line-clamp-2 leading-tight">{item.name}</h3>
                    <p className="font-semibold text-sm whitespace-nowrap">AED {(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs text-muted-foreground font-medium">{item.category}</p>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-0.5">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-md hover:bg-background shadow-sm"
                                onClick={() => updateQuantity(item.id || "", item.quantity - 1)}
                            >
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-4 text-center text-xs font-medium tabular-nums">{item.quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-md hover:bg-background shadow-sm"
                                onClick={() => updateQuantity(item.id || "", item.quantity + 1)}
                            >
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.id || "")}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
