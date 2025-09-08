"use client";

import React, { useState, useEffect, useMemo } from "react";
import { OrderTable } from "./OrderTable";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { OrderStats } from "./OrderStats";
import {
  fetchOrders,
  updateOrderStatus,
  bulkUpdateOrderStatus,
} from "./OrderAPI";
import { OrderItem } from "./OrderTableTypes";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Removed Tabs import as we're simplifying the UI

interface OrderDashboardProps {
  initialOrders?: OrderItem[];
}

export function OrderDashboard({ initialOrders = [] }: OrderDashboardProps) {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter orders based on selected status
  const filteredOrders = useMemo(() => {
    if (!statusFilter) return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  // Fetch orders from backend
  const handleFetchOrders = async () => {
    setIsLoading(true);
    const ordersData = await fetchOrders();
    setOrders(ordersData);
    setIsLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    if (initialOrders.length === 0) {
      handleFetchOrders();
    }
  }, []);

  // Handle status change - direct update without modal
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setIsUpdating(true);
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus as any } : order
        )
      );
    }
    setIsUpdating(false);
  };

  // Handle bulk status change
  const handleBulkStatusChange = async (
    orderIds: string[],
    newStatus: string
  ) => {
    console.log("🚀 Starting bulk status change:", { orderIds, newStatus });
    setIsUpdating(true);
    try {
      const result = await bulkUpdateOrderStatus(orderIds, newStatus);
      console.log("🔄 Bulk update result:", result);

      if (result.success) {
        console.log("✅ Bulk update successful, updating UI state");
        // Update the orders in state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            orderIds.includes(order._id)
              ? { ...order, status: newStatus as any }
              : order
          )
        );
        console.log("✨ UI state updated");
      } else {
        console.error("❌ Bulk update failed:", result);
      }
    } catch (error) {
      console.error("💥 Bulk status update failed:", error);
    }
    setIsUpdating(false);
  };

  // Handle order click to show details
  const handleOrderClick = (order: OrderItem) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  // Handle status card click to filter orders
  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
  };

  // Calculate statistics (removed tab functionality)
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    cancelled: orders.filter((o) => o.status === "CANCELLED").length,
  };

  return (
    <div className="w-full space-y-6">
      {/* Statistics Cards */}
      <OrderStats
        orders={orders}
        onStatusFilter={handleStatusFilter}
        activeFilter={statusFilter}
      />

      {/* Orders Table - Simplified without tabs */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Orders
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            {statusFilter
              ? `Showing ${statusFilter.toLowerCase()} orders`
              : "View and manage all customer orders"}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pt-2 pb-6">
          <OrderTable
            orders={filteredOrders}
            onStatusChange={handleStatusChange}
            onBulkStatusChange={handleBulkStatusChange}
            onOrderClick={handleOrderClick}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={orderDetailsOpen}
        onClose={() => setOrderDetailsOpen(false)}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
