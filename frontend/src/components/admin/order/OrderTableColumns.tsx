"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { OrderItem } from "./OrderTableTypes";

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
  onStatusChange: (orderId: string, newStatus: string) => void
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
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
      return <div className="lowercase text-base">{order.user.email}</div>;
    },
  },
  {
    id: "food",
    header: "Food",
    cell: ({ row }) => {
      const order = row.original;
      const foodCount = order.foodOrderItems.length;
      const firstFood = order.foodOrderItems[0]?.food.name || "No items";

      return (
        <div className="max-w-[200px]">
          <div className="font-medium text-base">{firstFood}</div>
          {foodCount > 1 && (
            <div className="text-sm text-gray-500">
              +{foodCount - 1} more items
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
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
      const config = getStatusConfig(status);
      return (
        <div className="min-w-[120px]">
          <Badge
            variant={config.variant}
            className={`${config.color} text-sm font-medium px-3 py-1 whitespace-nowrap`}
          >
            {status}
          </Badge>
        </div>
      );
    },
    size: 140,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="min-w-[80px] flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onStatusChange(order._id, "PENDING")}
                disabled={order.status === "PENDING"}
              >
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange(order._id, "DELIVERED")}
                disabled={order.status === "DELIVERED"}
              >
                Mark as Delivered
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange(order._id, "CANCELLED")}
                disabled={order.status === "CANCELLED"}
              >
                Mark as Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    size: 80,
  },
];
