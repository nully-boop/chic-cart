import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  size: string | null;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string, size: string | null) => void;
  updateQuantity: (id: string, size: string | null, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const normalizedQuantity = Math.max(1, quantity);
      const itemSize = item.size ?? null;
      const existingItem = prev.find((i) => i.id === item.id && i.size === itemSize);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.size === itemSize
            ? { ...i, quantity: i.quantity + normalizedQuantity }
            : i
        );
      }
      return [...prev, { ...item, size: itemSize, quantity: normalizedQuantity }];
    });
  }, []);

  const removeItem = useCallback((id: string, size: string | null) => {
    setItems((prev) => prev.filter((i) => i.id !== id || i.size !== size));
  }, []);

  const updateQuantity = useCallback((id: string, size: string | null, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity } : i))
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
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
