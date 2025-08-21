"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface OrderTabProps {
  isLoggedIn: boolean;
}

export const OrderTab = ({ isLoggedIn }: OrderTabProps) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const fetchOrders = async () => {
    if (!isLoggedIn) return;

    setOrdersLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const ordersData = await response.json();
        console.log("Orders data received:", ordersData); // Debug log
        setOrders(ordersData);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const refreshOrders = () => {
    fetchOrders();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Order History</h3>
        <p className="text-gray-500 text-sm">
          Track your delicious food journey
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {ordersLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-3"></div>
            <p className="text-gray-500">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🍽️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Orders Yet?
            </h3>
            <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
              You haven't placed any orders yet. Start exploring our menu and
              satisfy your cravings!
            </p>
            <div className="mt-6">
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Browse Menu
              </button>
            </div>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    #{order._id ? order._id.slice(-4) : "N/A"}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">
                      ${order.totalPrice?.toFixed(2) || "0.00"}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Order #{order._id || "Unknown"}
                    </div>
                  </div>
                </div>

                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                    order.status === "PENDING"
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
                      : order.status === "DELIVERED"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : order.status === "CANCELED"
                      ? "bg-gray-100 text-gray-700 border border-gray-200"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {order.status || "UNKNOWN"}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Items Ordered
                </div>
                {order.foodOrderItems && order.foodOrderItems.length > 0 ? (
                  order.foodOrderItems.map((item: any) => {
                    console.log("Order item:", item); // Debug log
                    return (
                      <div
                        key={item._id || Math.random()}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shadow-sm">
                          {item.food?.image ? (
                            <img
                              src={item.food.image}
                              alt={item.food.foodName || "Food item"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.log(
                                  "Image failed to load:",
                                  item.food.image
                                ); // Debug log
                                e.currentTarget.src = "/food.png"; // Fallback image
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-lg">🍽️</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-700 truncate">
                            {item.food?.foodName || "Unknown Item"}
                          </div>
                          <div className="text-xs text-gray-500">
                            ${item.food?.price?.toFixed(2) || "0.00"} each
                          </div>
                        </div>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                          x{item.quantity || 1}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No items found for this order
                  </div>
                )}
              </div>

              {/* Order Details */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🕐</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Order Date
                    </div>
                    <div className="font-medium">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Date not available"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">📍</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Delivery Address
                    </div>
                    <div className="font-medium text-xs leading-relaxed">
                      {order.deliveryAddress || "Address not available"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};
