import { CartItem, MenuItem } from "./types";
import menuData from "@/data/menu.json";

export interface CreateOrderPayload {
    customer_name: string;
    customer_phone_number: string;
    address: string;
    total_amount: number;
    bill_no: string;
    urgency: "Normal" | "High";
    payment_mode: "cash" | "card";
    special_instructions: string;
    vat: number;
    tip: number;
    delivery_charge: number;
    water: boolean;
    water_count: number;
    items: {
        item_name: string;
        item_name_alt?: string;
        quantity: number;
        price: number;
        totalamount: number;
        vat: number;
    }[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.yaadro.ae/api/orders/create/public/shop123:yourIntegrationToken123";

export async function createOrder(
    name: string,
    phone: string,
    address: string,
    instructions: string,
    cartItems: CartItem[]
): Promise<boolean> {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Generate a pseudo-random bill number
    const billNo = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    const payload: CreateOrderPayload = {
        customer_name: name,
        customer_phone_number: phone,
        address: address,
        total_amount: totalAmount,
        bill_no: billNo,
        urgency: "Normal",
        payment_mode: "cash",
        special_instructions: instructions,
        vat: 0, // Default as per requirement
        tip: 0,
        delivery_charge: 0,
        water: false,
        water_count: 0,
        items: cartItems.map((item) => ({
            item_name: item.name,
            // item_name_alt: "", // Optional, skipping for now
            quantity: item.quantity,
            price: item.price,
            totalamount: item.price * item.quantity,
            vat: 0, // Default 0
        })),
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            return false;
        }

        return true;
    } catch (error) {
        console.error("Failed to create order:", error);
        return false;
    }
}

export async function fetchMenu(): Promise<MenuItem[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return menuData as MenuItem[];
}

