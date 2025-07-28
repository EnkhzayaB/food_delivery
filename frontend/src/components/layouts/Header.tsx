"use client";
import Link from "next/link";
import { Food } from "@/types";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type CartItem = {
  id: string;
  foodName: string;
  image: string;
  price: number;
  quantity: number;
};

export const Header = () => {
  const { isLoggedIn, email, logout } = useAuth();
  const [tab, setTab] = useState<"cart" | "order">("cart");

  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0); // hoolnii niit too
  // reduce() buh elementuudiig neg utgand oruuldg.  sum n 0 s ehlen

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // hoolnii niit une
  {
    /* toFixed n toog taslalaas hoish 2 oron awd string bolgd butsaadg. */
  }

  const shipping = total > 0 ? 0.99 : 0;

  const increase = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  const decrease = (item: CartItem) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: -1 });
    }
  };

  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-8 h-8" />
        <div>
          <h1 className="font-bold text-xl">
            Nom<span className="text-red-500">Nom</span>
          </h1>
          <p className="text-sm text-gray-300">Swift delivery</p>
        </div>
      </div>

      <div className="flex gap-2 items-center md:gap-4">
        <Sheet>
          <SheetTrigger>
            <div className="relative">
              <div className="w-10 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>

              {totalCount > 0 && (
                <div className="absolute top-0 right-0 -mt-1 -mr-1 sm:-mt-2 sm:-mr-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  {totalCount}
                </div>
              )}
            </div>
          </SheetTrigger>
          <SheetContent className="w-[200px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold flex gap-2.5">
                    {" "}
                    <ShoppingCart />
                    Order detail
                  </h2>
                </div>
              </SheetTitle>
              <SheetDescription>
                {" "}
                <div className="flex justify-between mb-4 bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setTab("cart")}
                    className={`flex-1 py-2 rounded-full font-medium ${
                      tab === "cart" ? "bg-red-500 text-white" : "text-gray-700"
                    }`}
                  >
                    Cart
                  </button>
                  <button
                    onClick={() => setTab("order")}
                    className={`flex-1 py-2 rounded-full font-medium ${
                      tab === "order"
                        ? "bg-red-500 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    Order
                  </button>
                </div>
              </SheetDescription>
              <div className="w-full max-w-md mx-auto p-4 rounded-lg shadow-md md:max-w-lg">
                {tab === "cart" ? (
                  <>
                    <h3 className="text-lg font-semibold mb-2">My cart</h3>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between mb-4 border-b pb-3"
                      >
                        <img
                          src={item.image}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1 px-3">
                          <h4 className="text-sm font-bold text-red-600">
                            {item.foodName}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {item.price.toFixed(2)}
                            {/* toFixed n toog taslalaas hoish 2 oron awd string bolgd butsaadg. */}
                          </p>
                          <div className="flex items-center mt-1 gap-2">
                            <button
                              onClick={() => decrease(item)}
                              className="w-6 h-6 rounded-full border flex items-center justify-center"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => increase(item)}
                              className="w-6 h-6 rounded-full border flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 font-bold text-xl"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <div className="mb-4">
                      <label className="text-sm font-medium">
                        Delivery location
                      </label>
                      <input
                        type="text"
                        placeholder="Please share your complete address"
                        className="w-full border px-3 py-2 rounded mt-1"
                      />
                    </div>

                    <p className="text-[20px] font-semibold text-[#71717A]">
                      Payment info
                    </p>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>Items</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold mt-2 border-t pt-2">
                        <span>Total</span>
                        <span>${(total + shipping).toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-red-500 text-white font-semibold py-2 rounded mt-4 hover:bg-red-600">
                        Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold mb-2">My orders</h3>
                    <p className="text-gray-500 text-sm">
                      No orders placed yet.
                    </p>
                  </>
                )}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {isLoggedIn ? (
          <div className="relative group">
            <button className="bg-red-500 p-2 rounded-full">
              <User className="text-white" />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black p-4 shadow rounded top-full right-0">
              <p>{email}</p>
              <button
                onClick={() => {
                  logout(clearCart);
                }}
                className="mt-2 bg-gray-200 px-2 py-1 rounded"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link href="/register">
              <button className="border border-white px-3 py-1 rounded">
                Sign up
              </button>
            </Link>
            <Link href="/log">
              <button className="bg-red-500 px-3 py-1 rounded">Log in</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
