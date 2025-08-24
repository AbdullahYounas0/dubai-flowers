import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { CartItem, CartState, CartContextType } from '../types/cart';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartData, setCartData] = useLocalStorage<Omit<CartState, 'isOpen'>>('daffofils-cart', {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  const [isOpen, setIsOpen] = React.useState(false);

  // Calculate totals whenever items change
  const calculateTotals = useCallback((items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return { totalItems, totalPrice };
  }, []);

  // Update totals when items change
  useEffect(() => {
    const { totalItems, totalPrice } = calculateTotals(cartData.items);
    if (cartData.totalItems !== totalItems || cartData.totalPrice !== totalPrice) {
      setCartData(prev => ({
        ...prev,
        totalItems,
        totalPrice,
      }));
    }
  }, [cartData.items, calculateTotals, setCartData]);

  const addToCart = useCallback((product: any, quantity = 1, customizations?: CartItem['customizations']) => {
    const existingItemIndex = cartData.items.findIndex(item => 
      item.product.id === product.id && 
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...cartData.items];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartData(prev => ({ ...prev, items: updatedItems }));
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          inStock: product.inStock ?? true,
        },
        quantity,
        customizations,
        addedAt: new Date(),
      };

      setCartData(prev => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
    }

    // Show success notification
    toast.success(
      <div className="flex items-center space-x-3">
        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
        <div>
          <p className="font-semibold text-green-800">Added to cart! 🌸</p>
          <p className="text-sm text-gray-600">{product.name}</p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        className: "bg-green-50 border border-green-200",
        progressClassName: "bg-green-500",
      }
    );
  }, [cartData.items, setCartData]);

  const removeFromCart = useCallback((itemId: string) => {
    setCartData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
    }));

    toast.info("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  }, [setCartData]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  }, [setCartData, removeFromCart]);

  const clearCart = useCallback(() => {
    setCartData(prev => ({
      ...prev,
      items: [],
    }));

    toast.success("Cart cleared", {
      position: "top-right",
      autoClose: 2000,
    });
  }, [setCartData]);

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const cart: CartState = {
    ...cartData,
    isOpen,
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
