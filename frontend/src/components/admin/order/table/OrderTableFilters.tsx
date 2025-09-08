"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderTableFiltersProps {
  emailFilter: string;
  setEmailFilter: (value: string) => void;
  dateFilter: { from?: Date; to?: Date };
  setDateFilter: (value: { from?: Date; to?: Date }) => void;
  selectedOrderIds: string[];
  onBulkStatusChange?: (orderIds: string[], newStatus: string) => void;
  onQuickDateFilter: (type: string) => void;
  filteredOrdersLength: number;
  totalOrdersLength: number;
}

export function OrderTableFilters({
  emailFilter,
  setEmailFilter,
  dateFilter,
  setDateFilter,
  selectedOrderIds,
  onBulkStatusChange,
  onQuickDateFilter,
  filteredOrdersLength,
  totalOrdersLength,
}: OrderTableFiltersProps) {
  const handleBulkStatusChange = (newStatus: string) => {
    console.log("📋 OrderTableFilters handleBulkStatusChange called:", {
      selectedOrderIds,
      newStatus,
    });
    if (selectedOrderIds.length > 0 && onBulkStatusChange) {
      console.log("🔄 Calling onBulkStatusChange prop");
      onBulkStatusChange(selectedOrderIds, newStatus);
    } else {
      console.log("❌ No orders selected or onBulkStatusChange not provided");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter by customer email..."
            value={emailFilter}
            onChange={(event) => setEmailFilter(event.target.value)}
            className="h-11 w-80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-11 px-4 border-gray-200 hover:border-blue-500 hover:text-blue-600"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Filter by date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateFilter?.from}
                selected={dateFilter as { from?: Date; to?: Date }}
                onSelect={
                  setDateFilter as (
                    range: { from?: Date; to?: Date } | undefined
                  ) => void
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => onQuickDateFilter("today")}
            variant="outline"
            className="h-11 px-4 border-gray-200 hover:border-blue-500 hover:text-blue-600"
          >
            Today
          </Button>
          {(dateFilter.from || dateFilter.to || emailFilter) && (
            <Button
              onClick={() => onQuickDateFilter("clear")}
              variant="outline"
              className="h-11 px-4 border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-600"
            >
              Clear all
            </Button>
          )}
          {selectedOrderIds.length > 0 && onBulkStatusChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-11 px-6 bg-black hover:bg-gray-800 text-white rounded-full flex items-center gap-3">
                  Change delivery state
                  <div className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    {selectedOrderIds.length}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 p-2">
                <DropdownMenuLabel className="text-lg font-bold py-4 px-3">
                  Bulk Status Change
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  onClick={() => handleBulkStatusChange("PENDING")}
                  className="py-4 px-4 text-lg font-semibold hover:bg-yellow-50 hover:text-yellow-800 cursor-pointer rounded-lg mb-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    Mark as Pending
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleBulkStatusChange("DELIVERED")}
                  className="py-4 px-4 text-lg font-semibold hover:bg-green-50 hover:text-green-800 cursor-pointer rounded-lg mb-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    Mark as Delivered
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleBulkStatusChange("CANCELLED")}
                  className="py-4 px-4 text-lg font-semibold hover:bg-red-50 hover:text-red-800 cursor-pointer rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    Mark as Cancelled
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="text-base text-gray-500 font-medium">
          {filteredOrdersLength} of {totalOrdersLength} orders
          {dateFilter.from && dateFilter.to && (
            <span className="ml-2 text-sm text-blue-600">
              ({format(dateFilter.from, "MMM dd")} -{" "}
              {format(dateFilter.to, "MMM dd")})
            </span>
          )}
          {dateFilter.from && !dateFilter.to && (
            <span className="ml-2 text-sm text-blue-600">
              (from {format(dateFilter.from, "MMM dd")})
            </span>
          )}
          {emailFilter && (
            <span className="ml-2 text-sm text-green-600">
              (filtering by &quot;{emailFilter}&quot;)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
