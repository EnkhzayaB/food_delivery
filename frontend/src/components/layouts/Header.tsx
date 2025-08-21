"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CustomAlertDialog } from "@/components/dialogs/CustomAlertDialog";
import { CartTab } from "./CartTab";
import { OrderTab } from "./OrderTab";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const { isLoggedIn, email, logout } = useAuth();
  const { cart, clearCart } = useCart();
  const [tab, setTab] = useState<"cart" | "order">("cart");
  const [isLoading, setIsLoading] = useState(false);

  // Alert dialog states
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type: "success" | "error" | "warning";
  }>({
    isOpen: false,
    title: "",
    description: "",
    type: "success",
  });

  const showAlert = (
    title: string,
    description: string,
    type: "success" | "error" | "warning" = "success"
  ) => {
    setAlertDialog({
      isOpen: true,
      title,
      description,
      type,
    });
  };

  const closeAlert = () => {
    setAlertDialog({ ...alertDialog, isOpen: false });
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const checkout = async (deliveryAddress: string) => {
    if (!isLoggedIn) {
      showAlert(
        "Login Required",
        "Та захиалга өгөхийн тулд нэвтэрнэ үү!",
        "warning"
      );
      return;
    }

    if (cart.length === 0) {
      showAlert("Empty Cart", "Сагс хоосон байна!", "warning");
      return;
    }

    if (!deliveryAddress.trim()) {
      showAlert(
        "Delivery Address Required",
        "Хүргэлтийн хаягаа бичнэ үү!",
        "warning"
      );
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      let userId = "";
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          userId = payload.id;
        } catch (err) {
          console.error("token буруу байна:", err);
          showAlert(
            "Authentication Error",
            "Invalid token. Please login again.",
            "error"
          );
          return;
        }
      }

      const orderData = {
        user: userId,
        foodOrderItems: cart.map((item) => ({
          food: item.id,
          quantity: item.quantity,
        })),
        totalPrice:
          cart.reduce((total, item) => total + item.price * item.quantity, 0) +
          0.99,
        deliveryAddress: deliveryAddress,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        showAlert("Order Success", "Захиалга амжилттай илгээгдлээ!", "success");
        clearCart();
      } else {
        showAlert(
          "Order Error",
          "Захиалга илгээхэд алдаа гарлаа: " + result.message,
          "error"
        );
      }
    } catch (error) {
      console.log("checkout aldaa:", error);
      showAlert("Order Error", "zahialga hiilgehed aldaa garlaa", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold">
          NomNom
        </Link>
        <span className="text-sm text-gray-300">Swift delivery</span>
      </div>

      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <div className="relative cursor-pointer">
              <div className="w-10 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>

              {totalQuantity > 0 && (
                <div className="absolute top-0 right-0 -mt-1 -mr-1 sm:-mt-2 sm:-mr-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  {totalQuantity}
                </div>
              )}
            </div>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[600px] lg:w-[700px] transition-all duration-300 ease-out">
            <SheetHeader className="h-full flex flex-col">
              <SheetTitle>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold flex gap-3 items-center text-gray-800">
                    <div className="p-2 bg-red-100 rounded-full">
                      <ShoppingCart className="w-6 h-6 text-red-600" />
                    </div>
                    Order detail
                  </h2>
                </div>
              </SheetTitle>

              {/* Tab Navigation */}
              <div className="flex justify-between mb-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-2 shadow-lg border border-gray-200">
                <button
                  onClick={() => setTab("cart")}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-colors duration-200 ${
                    tab === "cart"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white hover:shadow-md"
                  }`}
                >
                  Cart
                </button>
                <button
                  onClick={() => setTab("order")}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-colors duration-200 ${
                    tab === "order"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white hover:shadow-md"
                  }`}
                >
                  Order
                </button>
              </div>

              {/* Content Area - Full height below tabs */}
              <div className="flex-1 min-h-0">
                {tab === "cart" ? (
                  <CartTab onCheckout={checkout} isLoading={isLoading} />
                ) : (
                  <OrderTab isLoggedIn={isLoggedIn} />
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
                  logout();
                  clearCart();
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

      <CustomAlertDialog
        isOpen={alertDialog.isOpen}
        onClose={closeAlert}
        title={alertDialog.title}
        description={alertDialog.description}
        type={alertDialog.type}
      />
    </header>
  );
};
