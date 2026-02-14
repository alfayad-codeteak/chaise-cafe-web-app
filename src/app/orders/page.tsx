"use client";

import { useEffect, useState } from "react";
import { getOrders, type Order } from "@/lib/history";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Clock, MapPin, CalendarDays, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setOrders(getOrders());
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="min-h-screen pt-24 flex items-center justify-center">Loading orders...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen pt-24 px-4 container mx-auto flex flex-col items-center justify-center text-center space-y-6">
                <div className="bg-secondary/20 p-8 rounded-full">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">No Past Orders</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        You haven't placed any orders yet. Check out our menu to order some delicious food!
                    </p>
                </div>
                <Button asChild size="lg" className="rounded-full">
                    <Link href="/menu">Browse Menu</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-1 gap-2">
                    <h1 className="text-3xl font-bold">My Orders</h1>
                    <Badge variant="outline" className="text-sm px-3 py-1 w-fit">
                        Past 7 Days
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6">
                {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="bg-secondary/5 pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-2">
                                        Order {order.id}
                                        <Badge className="bg-green-600 hover:bg-green-700">
                                            {order.status}
                                        </Badge>
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                        <CalendarDays className="h-3 w-3" />
                                        {format(order.date, "PPP p")}
                                    </CardDescription>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary">
                                        AED {order.total.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Total Amount</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider">
                                        <ShoppingBag className="h-4 w-4" /> Order Items
                                    </h3>
                                    <ScrollArea className="h-[150px] pr-4">
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-start text-sm group">
                                                    <div className="flex items-start gap-3">
                                                        <div className="relative h-12 w-12 rounded-md overflow-hidden shrink-0 border border-border/50 bg-secondary/10">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover transition-transform group-hover:scale-105"
                                                                sizes="48px"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium line-clamp-1">{item.name}</span>
                                                            <span className="text-xs text-muted-foreground mt-0.5">
                                                                {item.quantity} x AED {item.price.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="font-medium shrink-0 ml-2">
                                                        AED {(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider">
                                        <MapPin className="h-4 w-4" /> Delivery Details
                                    </h3>
                                    <div className="bg-secondary/10 p-4 rounded-lg text-sm space-y-2">
                                        <p className="font-medium">Delivery Address:</p>
                                        <p className="text-muted-foreground leading-relaxed">{order.address}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-500/10 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                                        <Clock className="h-4 w-4" />
                                        <span>Items delivered via Cash on Delivery</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
