"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { OrderItem } from "../api/OrderTableTypes";

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

interface OrderStatusColumnProps {
  order: OrderItem;
  onStatusChange: (orderId: string, newStatus: string) => void;
}

export function OrderStatusColumn({
  order,
  onStatusChange,
}: OrderStatusColumnProps) {
  const config = getStatusConfig(order.status);

  const handleStatusChange = (newStatus: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onStatusChange(order._id, newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80"
          onClick={(e) => e.stopPropagation()}
        >
          <Badge className={`${config.color} border-0 font-medium px-3 py-1`}>
            {order.status}
          </Badge>
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => handleStatusChange("PENDING", e)}
          className="cursor-pointer hover:bg-yellow-50"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Pending</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => handleStatusChange("DELIVERED", e)}
          className="cursor-pointer hover:bg-green-50"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Delivered</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => handleStatusChange("CANCELLED", e)}
          className="cursor-pointer hover:bg-red-50"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Cancelled</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
