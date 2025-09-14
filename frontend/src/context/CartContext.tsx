"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

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
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const savedCart = localStorage.getItem(`cart-${user.id}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    } else {
      // For non-signed-in users, use general cart
      const savedCart = localStorage.getItem("cart-guest");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    if (isSignedIn && user) {
      localStorage.setItem(`cart-${user.id}`, JSON.stringify(cart));
    } else {
      localStorage.setItem("cart-guest", JSON.stringify(cart));
    }
  }, [cart, isSignedIn, user]);

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
