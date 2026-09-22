"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS } from "@/data/products";
import type { CartLine, Product } from "@/types";

const STORAGE_KEY = "sensiplaytime-cart";

interface CartContextValue {
  lines: CartLine[];
  items: Array<{ product: Product; quantity: number }>;
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore any cart saved from a previous visit. Reading localStorage only
  // after mount avoids a server/client markup mismatch on first render — a
  // lazy useState initializer would run during the client's hydration
  // render too and produce a different result than the server's, which is
  // exactly the mismatch this effect exists to avoid.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration read from an external store (localStorage) on mount, not a synchronization loop; see comment above.
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      // Corrupt or blocked storage — start from an empty cart instead of
      // throwing during hydration.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage unavailable (private mode, quota) — cart still works for
      // this session, it just won't persist across reloads.
    }
  }, [lines, hydrated]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { productId, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.productId !== productId);
      return prev.map((l) => (l.productId === productId ? { ...l, quantity } : l));
    });
  }, []);

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = PRODUCTS.find((p) => p.id === line.productId);
          return product ? { product, quantity: line.quantity } : null;
        })
        .filter((item): item is { product: Product; quantity: number } => item !== null),
    [lines],
  );

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  const value: CartContextValue = {
    lines,
    items,
    itemCount,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart,
    removeFromCart,
    setQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
