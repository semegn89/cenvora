"use client";

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from "react";
import { getCart, setCart, type CartItem } from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  updateQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const persist = useCallback((newItems: CartItem[]) => {
    setCart(newItems);
    setItems(newItems);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "qty"> & { qty?: number }) => {
      const cart = getCart();
      const qty = item.qty ?? 1;
      const existing = cart.find((i) => i.productId === item.productId);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ ...item, qty });
      }
      persist(cart);
    },
    [persist]
  );

  const updateQty = useCallback(
    (productId: string, qty: number) => {
      const cart = getCart();
      const i = cart.find((x) => x.productId === productId);
      if (!i) return;
      if (qty <= 0) {
        persist(cart.filter((x) => x.productId !== productId));
        return;
      }
      i.qty = qty;
      persist(cart);
    },
    [persist]
  );

  const remove = useCallback(
    (productId: string) => {
      persist(getCart().filter((i) => i.productId !== productId));
    },
    [persist]
  );

  const clear = useCallback(() => {
    setCart([]);
    setItems([]);
  }, []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQty, remove, clear, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
