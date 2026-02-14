import { MenuItem } from "@/lib/types";

// Helper to generate a consistent ID
const generateId = (item: any, index: number) => {
    // Generate a truly unique ID using index and random string to solve key issues
    const safeName = item.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    // Use a stable ID if possible? No, we want to fix duplicates. 
    // But stable across renders is better. 
    // Let's stick to index but being super explicit.
    return `item-${index}-${safeName}`;
};

export async function fetchMenu(): Promise<MenuItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        const response = await import('@/data/menu.json');
        const data = response.default as any[];

        return data.map((item, index) => ({
            ...item,
            id: generateId(item, index),
            image: item.image || ""
        }));
    } catch (error) {
        console.error("Failed to fetch menu:", error);
        return [];
    }
}
