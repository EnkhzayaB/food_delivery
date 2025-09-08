"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Truck, DollarSign, Package } from "lucide-react";
import { OrderItem } from "../api/OrderTableTypes";

interface OrderStatsProps {
  orders: OrderItem[];
  onStatusFilter?: (status: string | null) => void;
  activeFilter?: string | null;
}

export function OrderStats({
  orders,
  onStatusFilter,
  activeFilter,
}: OrderStatsProps) {
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    cancelled: orders.filter((o) => o.status === "CANCELLED").length,
    totalRevenue: orders
      .filter((o) => o.status === "DELIVERED")
      .reduce((sum, order) => sum + order.totalPrice, 0),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card
        className={`border-0 shadow-sm bg-white cursor-pointer transition-all hover:shadow-md ${
          activeFilter === null ? "ring-2 ring-blue-200 bg-blue-50" : ""
        }`}
        onClick={() => onStatusFilter && onStatusFilter(null)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Orders
          </CardTitle>
          <Package className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <p className="text-xs text-gray-500">All time orders</p>
        </CardContent>
      </Card>

      <Card
        className={`border-0 shadow-sm bg-white cursor-pointer transition-all hover:shadow-md ${
          activeFilter === "PENDING"
            ? "ring-2 ring-yellow-200 bg-yellow-50"
            : ""
        }`}
        onClick={() => onStatusFilter && onStatusFilter("PENDING")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Pending
          </CardTitle>
          <Calendar className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <p className="text-xs text-gray-500">Awaiting delivery</p>
        </CardContent>
      </Card>

      <Card
        className={`border-0 shadow-sm bg-white cursor-pointer transition-all hover:shadow-md ${
          activeFilter === "DELIVERED"
            ? "ring-2 ring-green-200 bg-green-50"
            : ""
        }`}
        onClick={() => onStatusFilter && onStatusFilter("DELIVERED")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Delivered
          </CardTitle>
          <Truck className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.delivered}
          </div>
          <p className="text-xs text-gray-500">Successfully delivered</p>
        </CardContent>
      </Card>

      <Card
        className={`border-0 shadow-sm bg-white cursor-pointer transition-all hover:shadow-md ${
          activeFilter === "CANCELLED" ? "ring-2 ring-red-200 bg-red-50" : ""
        }`}
        onClick={() => onStatusFilter && onStatusFilter("CANCELLED")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Cancelled
          </CardTitle>
          <Package className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.cancelled}
          </div>
          <p className="text-xs text-gray-500">Cancelled orders</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            ${stats.totalRevenue.toFixed(2)}
          </div>
          <p className="text-xs text-gray-500">From delivered orders</p>
        </CardContent>
      </Card>
    </div>
  );
}
