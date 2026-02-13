"use client";

export type CartItem = {
  productId: string;
  sku: string;
  name: string;
  qty: number;
  price: number;
  unit: string;
};

const CART_KEY = "cenvora-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "qty"> & { qty?: number }) {
  const cart = getCart();
  const qty = item.qty ?? 1;
  const existing = cart.find((i) => i.productId === item.productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...item, qty });
  }
  setCart(cart);
  return cart;
}

export function updateCartItem(productId: string, qty: number) {
  const cart = getCart();
  const i = cart.find((x) => x.productId === productId);
  if (!i) return cart;
  if (qty <= 0) {
    setCart(cart.filter((x) => x.productId !== productId));
    return cart.filter((x) => x.productId !== productId);
  }
  i.qty = qty;
  setCart(cart);
  return cart;
}

export function removeFromCart(productId: string) {
  setCart(getCart().filter((i) => i.productId !== productId));
}

export function clearCart() {
  setCart([]);
}
