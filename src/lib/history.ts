import { MenuItem } from "./types";

export interface OrderItem extends MenuItem {
    quantity: number;
}

export interface Order {
    id: string;
    date: number; // timestamp
    items: OrderItem[];
    total: number;
    address: string;
    customerName: string;
    phoneNumber: string;
    instructions?: string;
    status: "Pending" | "Completed" | "Cancelled";
}

const STORAGE_KEY = "chaise_orders_history";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function getOrders(): Order[] {
    if (typeof window === "undefined") return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];

        const orders: Order[] = JSON.parse(stored);
        const now = Date.now();

        // Filter out orders older than 7 days
        const validOrders = orders.filter(order => (now - order.date) < SEVEN_DAYS_MS);

        // If we filtered out some items, update storage
        if (validOrders.length !== orders.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validOrders));
        }

        return validOrders.sort((a, b) => b.date - a.date); // Newest first
    } catch (error) {
        console.error("Failed to parse orders:", error);
        return [];
    }
}

export function saveOrder(order: Order): void {
    if (typeof window === "undefined") return;

    try {
        const orders = getOrders();
        orders.unshift(order); // Add to beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
        console.error("Failed to save order:", error);
    }
}
