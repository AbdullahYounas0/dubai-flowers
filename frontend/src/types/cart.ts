export interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
  };
  quantity: number;
  customizations?: {
    wrappingStyle?: string;
    dedicationCard?: string;
    deliveryDate?: string;
  };
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

export interface CartContextType {
  cart: CartState;
  addToCart: (product: any, quantity?: number, customizations?: CartItem['customizations']) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}
