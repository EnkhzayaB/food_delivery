"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface CartTabProps {
  onCheckout: (deliveryAddress: string) => void;
  isLoading: boolean;
}

export const CartTab = ({ onCheckout, isLoading }: CartTabProps) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = total > 0 ? 0.99 : 0;

  const increase = (item: any) => {
    addToCart({ ...item, quantity: 1 });
  };

  const decrease = (item: any) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 });
    } else {
      addToCart({ ...item, quantity: -1 });
    }
  };

  const handleCheckout = () => {
    if (!deliveryAddress.trim()) {
      return;
    }
    onCheckout(deliveryAddress);
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-2">My cart</h3>

      {/* Scrollable cart items section */}
      <div className="max-h-[300px] overflow-y-auto mb-4 border rounded-lg p-2">
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-red-500 text-4xl mb-3">🍽️</div>
            <p className="text-gray-600 font-medium mb-2">Your cart is empty</p>
            <p className="text-gray-500 text-sm">
              Hungry? Add some delicious dishes to your cart and satisfy your
              cravings!
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-3 last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.foodName}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 px-3">
                <h4 className="text-sm font-bold text-red-600">
                  {item.foodName}
                </h4>
                <p className="text-xs text-gray-600">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-1 gap-2">
                  <button
                    onClick={() => decrease(item)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increase(item)}
                    className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-bold text-xl hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Fixed sections below */}
      <div className="mb-4">
        <label className="text-sm font-medium">Delivery location</label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Please share your complete address"
          className="w-full border px-3 py-2 rounded mt-1"
        />
      </div>

      <p className="text-[20px] font-semibold text-[#71717A]">Payment info</p>
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
        <button
          className="w-full bg-red-500 text-white font-semibold py-2 rounded mt-4 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCheckout}
          disabled={isLoading || cart.length === 0 || !deliveryAddress.trim()}
        >
          {isLoading ? "Уншиж банай..." : "Checkout"}
        </button>
      </div>
    </>
  );
};
