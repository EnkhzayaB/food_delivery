"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { OrderItem } from "../api/OrderTableTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig = {
  PENDING: {
    variant: "default" as const,
    color: "bg-yellow-100 text-yellow-800",
  },
  DELIVERED: {
    variant: "default" as const,
    color: "bg-green-100 text-green-800",
  },
  CANCELLED: {
    variant: "destructive" as const,
    color: "bg-red-100 text-red-800",
  },
};

const getStatusConfig = (status: string) =>
  statusConfig[status as keyof typeof statusConfig] || {
    variant: "secondary" as const,
    color: "bg-gray-100 text-gray-800",
  };

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
    header: "ID",
    cell: ({ row }) => (
      <div className="font-mono text-base font-medium w-16">
        {row.getValue<string>("_id").slice(-6)}
      </div>
    ),
  },
  {
    id: "user_email",
    accessorFn: (row) => row.user.email,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div
          className="lowercase text-base cursor-pointer hover:text-blue-600 hover:underline"
          onClick={() => onOrderClick && onOrderClick(order)}
        >
          {order.user?.email || "N/A"}
        </div>
      );
    },
  },
  {
    id: "food",
    header: "Food",
    cell: ({ row }) => {
      const order = row.original;
      const foodItems = order.foodOrderItems;

      if (!foodItems || foodItems.length === 0) {
        return <div className="max-w-[200px] text-gray-500">No items</div>;
      }

      const foodCount = foodItems.length;
      const totalQuantity = foodItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );

      return (
        <div className="max-w-[200px]">
          <span
            className="font-medium text-sm text-gray-900 cursor-pointer hover:text-blue-600 hover:underline"
            onClick={() => onOrderClick && onOrderClick(order)}
          >
            {foodCount} food{foodCount > 1 ? "s" : ""}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="text-base">{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-right font-medium text-base whitespace-nowrap min-w-[100px]">
          {formatted}
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
    cell: ({ row }) => {
      const address = row.getValue("deliveryAddress") as string;
      return (
        <div className="min-w-[150px] max-w-[200px] text-base">
          <div
            className="break-words overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              maxHeight: "3em",
            }}
            title={address}
          >
            {address}
          </div>
        </div>
      );
    },
    size: 180,
  },
  {
    accessorKey: "status",
    header: "Delivery Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const order = row.original;
      const config = getStatusConfig(status);

      return (
        <div className="min-w-[120px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${config.color} border-0 text-sm font-medium px-3 py-1 h-7 rounded-full hover:opacity-80 cursor-pointer`}
                onClick={(e) => e.stopPropagation()}
              >
                {status}
                <ChevronDown className="ml-2 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(order._id, "DELIVERED");
                }}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Delivered
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(order._id, "PENDING");
                }}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Pending
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(order._id, "CANCELLED");
                }}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Cancelled
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 140,
  },
];
