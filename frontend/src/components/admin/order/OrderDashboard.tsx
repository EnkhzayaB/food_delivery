"use client";

import React, { useState, useEffect } from "react";
import { OrderTable } from "./OrderTable";
import { OrderStatusModal } from "./OrderStatusModal";
import { OrderStats } from "./OrderStats";
import { fetchOrders, updateOrderStatus } from "./OrderAPI";
import { OrderItem } from "./OrderTableTypes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface OrderDashboardProps {
  initialOrders?: OrderItem[];
}

export function OrderDashboard({ initialOrders = [] }: OrderDashboardProps) {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [filteredOrders, setFilteredOrders] =
    useState<OrderItem[]>(initialOrders);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [currentOrderStatus, setCurrentOrderStatus] = useState<string>("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter orders based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === activeTab.toUpperCase())
      );
    }
  }, [orders, activeTab]);

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

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: string) => {
    const order = orders.find((o) => o._id === orderId);
    if (order) {
      setSelectedOrderId(orderId);
      setCurrentOrderStatus(order.status);
      setStatusModalOpen(true);
    }
  };

  // Confirm status change
  const handleStatusConfirm = async (newStatus: string) => {
    setIsUpdating(true);
    const success = await updateOrderStatus(selectedOrderId, newStatus);

    if (success) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrderId
            ? { ...order, status: newStatus as any }
            : order
        )
      );
      setStatusModalOpen(false);
    }
    setIsUpdating(false);
  };

  // Calculate statistics for tabs
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    cancelled: orders.filter((o) => o.status === "CANCELLED").length,
  };

  return (
    <div className="w-full space-y-6">
      {/* Mini Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Last updated: {format(new Date(), "MMM dd, HH:mm")}
        </div>
        <Button
          onClick={handleFetchOrders}
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="shadow-sm"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <OrderStats orders={orders} />

      {/* Orders Table with Tabs */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Orders
          </CardTitle>
          <CardDescription className="text-gray-600">
            View and manage customer orders by status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-lg p-1">
                <TabsTrigger
                  value="all"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  All Orders
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {stats.total}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Pending
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-yellow-100 text-yellow-800"
                  >
                    {stats.pending}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="delivered"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Delivered
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-green-100 text-green-800"
                  >
                    {stats.delivered}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="cancelled"
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Cancelled
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-red-100 text-red-800"
                  >
                    {stats.cancelled}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="m-0">
              <div className="p-6">
                <OrderTable
                  orders={filteredOrders}
                  onStatusChange={handleStatusChange}
                  isLoading={isLoading}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Status Change Modal */}
      <OrderStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onConfirm={handleStatusConfirm}
        currentStatus={currentOrderStatus}
        orderId={selectedOrderId}
        isLoading={isUpdating}
      />
    </div>
  );
}
