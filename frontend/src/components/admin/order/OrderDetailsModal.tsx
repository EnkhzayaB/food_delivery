"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderItem } from "./OrderTableTypes";
import { X, MapPin, User, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItem | null;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

const statusConfig = {
  PENDING: {
    color: "bg-yellow-100 text-yellow-800",
    label: "Pending",
  },
  DELIVERED: {
    color: "bg-green-100 text-green-800",
    label: "Delivered",
  },
  CANCELLED: {
    color: "bg-red-100 text-red-800",
    label: "Cancelled",
  },
} as const;

const defaultStatus = {
  color: "bg-gray-100 text-gray-800",
  label: "Unknown",
};

export function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onStatusChange,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const statusInfo =
    statusConfig[order.status as keyof typeof statusConfig] || defaultStatus;
  const orderDate = new Date(order.createdAt);
  const totalItems =
    order.foodOrderItems?.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    ) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Order #{order._id.slice(-6)}
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                {format(orderDate, "MMM dd, yyyy 'at' hh:mm a")}
              </DialogDescription>
            </div>
            <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                {order.user?.email || "N/A"}
              </p>
              <p className="text-sm flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                <span>
                  <span className="font-medium">Delivery Address:</span>
                  <br />
                  {order.deliveryAddress || "No address provided"}
                </span>
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 border-b border-gray-200 pb-2">
              Ordered Items ({totalItems} total)
            </h3>
            <div className="space-y-3">
              {order.foodOrderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.food?.image ? (
                      <img
                        src={item.food.image}
                        alt={item.food?.name || item.food?.foodName || "Food"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 text-lg">🍽️</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-lg">
                      {item.food?.name || item.food?.foodName || "Unknown Food"}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Quantity: {item.quantity || 0}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="text-2xl font-bold text-gray-900">
                      {item.quantity || 0}
                    </div>
                    <div className="text-xs text-gray-500">qty</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Items:</span>
                <span className="text-sm font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold text-gray-900">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
