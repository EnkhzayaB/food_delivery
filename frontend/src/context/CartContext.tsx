"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
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
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      localStorage.setItem(`cart-${email}`, JSON.stringify(cart));
    }
  }, [cart, email]);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  const addToCart = (item: CartItem) => {
    const currentIndex = cart.findIndex((i) => i.id === item.id);
    if (currentIndex !== -1) {
      const updated = [...cart];
      updated[currentIndex].quantity += item.quantity;
      setCart(updated);
      // alert("Food is being added to the cart!");
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
