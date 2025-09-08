"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

type CartItem = {
  id: string;
  foodName: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { email } = useAuth();

  useEffect(() => {
    if (email) {
      const savedCart = localStorage.getItem(`cart-${email}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    } else {
      // Clear cart when user logs out (email becomes null)
      setCart([]);
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      localStorage.setItem(`cart-${email}`, JSON.stringify(cart));
    }
  }, [cart, email]);

  const addToCart = (item: CartItem) => {
    const currentIndex = cart.findIndex((i) => i.id === item.id);
    if (currentIndex !== -1) {
      const updated = [...cart];
      updated[currentIndex].quantity += item.quantity;
      setCart(updated);
    } else {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart CartProvidertai bh heregtei");
  return context;
};
