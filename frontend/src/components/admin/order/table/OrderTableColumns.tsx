"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderItem } from "../api/OrderTableTypes";
import { OrderStatusColumn } from "./OrderStatusColumn";
import { OrderFoodColumn } from "./OrderFoodColumn";

export const createOrderColumns = (
  onStatusChange: (orderId: string, newStatus: string) => void,
  onOrderClick?: (order: OrderItem) => void
): ColumnDef<OrderItem>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="text-base font-medium text-gray-900">
        {row.getValue("_id")?.toString().slice(-6).toUpperCase() || "N/A"}
      </div>
    ),
  },
  {
    accessorFn: (row) => row.user?.email,
    id: "customer",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent"
      >
        Customer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className="lowercase text-base cursor-pointer hover:text-blue-600 hover:underline"
        onClick={() => onOrderClick && onOrderClick(row.original)}
      >
        {row.original.user?.email || "N/A"}
      </div>
    ),
  },
  {
    id: "food",
    header: "Food",
    cell: ({ row }) => (
      <OrderFoodColumn order={row.original} onOrderClick={onOrderClick} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent"
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-base">
          {date.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right font-semibold">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-right font-medium text-base">{formatted}</div>
      );
    },
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
    cell: ({ row }) => (
      <div className="text-base max-w-[200px] truncate">
        {row.getValue("deliveryAddress") || "No address"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Delivery Status",
    cell: ({ row }) => (
      <OrderStatusColumn order={row.original} onStatusChange={onStatusChange} />
    ),
  },
];
