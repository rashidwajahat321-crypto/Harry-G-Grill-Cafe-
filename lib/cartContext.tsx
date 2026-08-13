"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CartLine = { id: string; name: string; price: number; qty: number };

type CartContextType = {
  cart: Record<string, CartLine>;
  addItem: (id: string, name: string, price: number) => void;
  decItem: (id: string) => void;
  clearCart: () => void;
  count: number;
  total: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  step: "cart" | "details" | "confirm";
  setStep: (s: "cart" | "details" | "confirm") => void;
  lastOrder: { orderNumber: string; total: number } | null;
  setLastOrder: (o: { orderNumber: string; total: number } | null) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "details" | "confirm">("cart");
  const [lastOrder, setLastOrder] = useState<{ orderNumber: string; total: number } | null>(null);

  const addItem = useCallback((id: string, name: string, price: number) => {
    setCart((prev) => {
      const existing = prev[id];
      return { ...prev, [id]: { id, name, price, qty: (existing?.qty ?? 0) + 1 } };
    });
  }, []);

  const decItem = useCallback((id: string) => {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const nextQty = existing.qty - 1;
      const next = { ...prev };
      if (nextQty <= 0) {
        delete next[id];
      } else {
        next[id] = { ...existing, qty: nextQty };
      }
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  // Body scroll lock lives here so it's applied consistently no matter
  // which UI opens the drawer (nav button, floating bar, menu "Add").
  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
    if (typeof document !== "undefined") document.body.classList.add("no-scroll");
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    if (typeof document !== "undefined") document.body.classList.remove("no-scroll");
  }, []);

  const { count, total } = useMemo(() => {
    let c = 0;
    let t = 0;
    Object.values(cart).forEach((line) => {
      c += line.qty;
      t += line.qty * line.price;
    });
    return { count: c, total: t };
  }, [cart]);

  const value: CartContextType = {
    cart,
    addItem,
    decItem,
    clearCart,
    count,
    total,
    drawerOpen,
    openDrawer,
    closeDrawer,
    step,
    setStep,
    lastOrder,
    setLastOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
