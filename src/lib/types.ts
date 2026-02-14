export interface MenuItem {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  isVeg?: boolean;
  isSpicy?: boolean;
  featured?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
