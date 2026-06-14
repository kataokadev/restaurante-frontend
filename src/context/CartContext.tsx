"use client";

import { Produto } from "@/app/types/produto";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (produto: Produto) => void;
  removeItem: (produtoId: number) => void;
  updateQuantidade: (produtoId: number, quantidade: number) => void;
  clearCart: () => void;
  total: number;
  totalItens: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("carrinho");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(items));
  }, [items]);

  function addItem(produto: Produto) {
    setItems((prev) => {
      const existing = prev.find((i) => i.produto.id === produto.id);
      if (existing) {
        return prev.map((i) =>
          i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  }

  function removeItem(produtoId: number) {
    setItems((prev) => prev.filter((i) => i.produto.id !== produtoId));
  }

  function updateQuantidade(produtoId: number, quantidade: number) {
    if (quantidade <= 0) {
      removeItem(produtoId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.produto.id === produtoId ? { ...i, quantidade } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((acc, i) => acc + i.produto.preco * i.quantidade, 0);
  const totalItens = items.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantidade, clearCart, total, totalItens }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
