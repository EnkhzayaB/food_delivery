"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, XCircle, CheckCircle2 } from "lucide-react";

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newStatus: string) => void;
  currentStatus: string;
  orderId: string;
  isLoading?: boolean;
}

const statusOptions = [
  {
    value: "PENDING",
    label: "Pending",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800",
    description: "Order is being prepared",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-800",
    description: "Order has been delivered successfully",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    icon: XCircle,
    color: "bg-red-100 text-red-800",
    description: "Order has been cancelled",
  },
];

export function OrderStatusModal({
  isOpen,
  onClose,
  onConfirm,
  currentStatus,
  orderId,
  isLoading = false,
}: OrderStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const currentInfo = statusOptions.find((opt) => opt.value === currentStatus);
  const selectedInfo = statusOptions.find(
    (opt) => opt.value === selectedStatus
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-0 shadow-lg">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Truck className="h-5 w-5 text-red-500" />
            Change Delivery Status
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Update the delivery status for order #{orderId.slice(-6)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Current Status
            </label>
            <div className="flex items-center gap-2">
              {currentInfo && (
                <>
                  <Badge className={currentInfo.color}>
                    {currentInfo.label}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {currentInfo.description}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* New Status Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Select New Status
            </label>
            <div className="space-y-2">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedStatus === option.value;
                const isCurrent = currentStatus === option.value;

                return (
                  <div
                    key={option.value}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all
                      ${
                        isSelected
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }
                      ${isCurrent ? "opacity-50" : ""}
                    `}
                    onClick={() =>
                      !isCurrent && setSelectedStatus(option.value)
                    }
                  >
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => setSelectedStatus(option.value)}
                      disabled={isCurrent}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <Icon
                      className={`h-4 w-4 ${
                        isCurrent ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${
                            isCurrent ? "text-gray-400" : "text-gray-900"
                          }`}
                        >
                          {option.label}
                        </span>
                        {isCurrent && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          isCurrent ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedStatus !== currentStatus && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-800 font-medium">
                  Status will change:
                </span>
                <Badge className={currentInfo?.color}>
                  {currentInfo?.label}
                </Badge>
                <span className="text-blue-600">→</span>
                <Badge className={selectedInfo?.color}>
                  {selectedInfo?.label}
                </Badge>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              selectedStatus !== currentStatus && onConfirm(selectedStatus)
            }
            disabled={selectedStatus === currentStatus || isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
