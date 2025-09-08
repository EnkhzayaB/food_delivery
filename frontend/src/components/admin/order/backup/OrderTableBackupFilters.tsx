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

interface OrderTableBackupFiltersProps {
  emailFilter: string;
  setEmailFilter: (value: string) => void;
  dateFilter: { from?: Date; to?: Date };
  setDateFilter: (value: { from?: Date; to?: Date }) => void;
  selectedOrderIds: string[];
  onBulkStatusChange: (newStatus: string) => void;
  onQuickDateFilter: (type: string) => void;
  filteredOrdersLength: number;
}

export function OrderTableBackupFilters({
  emailFilter,
  setEmailFilter,
  dateFilter,
  setDateFilter,
  selectedOrderIds,
  onBulkStatusChange,
  onQuickDateFilter,
  filteredOrdersLength,
}: OrderTableBackupFiltersProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filter by customer email..."
          value={emailFilter}
          onChange={(event) => setEmailFilter(event.target.value)}
          className="max-w-md h-11 px-4 border-gray-200 focus:border-red-500 focus:ring-red-500 text-base"
        />

        {/* Date Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-11 px-4 border-gray-200 hover:bg-gray-50 text-base"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter.from ? (
                dateFilter.to ? (
                  <>
                    {format(dateFilter.from, "MMM dd")} -{" "}
                    {format(dateFilter.to, "MMM dd")}
                  </>
                ) : (
                  format(dateFilter.from, "MMM dd")
                )
              ) : (
                "Filter by date"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateFilter.from}
              selected={{
                from: dateFilter.from,
                to: dateFilter.to,
              }}
              onSelect={(range) => {
                setDateFilter({
                  from: range?.from,
                  to: range?.to,
                });
              }}
              numberOfMonths={2}
            />
            <div className="p-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDateFilter({})}
                className="w-full"
              >
                Clear filter
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Today Filter Button */}
        <Button
          variant="outline"
          onClick={() => onQuickDateFilter("today")}
          className="h-11 px-4 border-gray-200 hover:bg-gray-50 text-base"
        >
          Today
        </Button>

        {/* Clear Filter Button */}
        {(dateFilter.from || dateFilter.to || emailFilter) && (
          <Button
            variant="ghost"
            onClick={() => onQuickDateFilter("clear")}
            className="h-11 px-4 text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-base"
          >
            Clear all
          </Button>
        )}

        {selectedOrderIds.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-11 px-6 bg-black hover:bg-gray-800 text-white rounded-full flex items-center gap-3">
                Change delivery state
                <div className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                  {selectedOrderIds.length}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-base font-semibold py-3">
                Bulk Status Change
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onBulkStatusChange("PENDING")}
                className="py-3 px-4 text-base font-medium hover:bg-yellow-50 hover:text-yellow-800 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  Mark as Pending
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onBulkStatusChange("DELIVERED")}
                className="py-3 px-4 text-base font-medium hover:bg-green-50 hover:text-green-800 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Mark as Delivered
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onBulkStatusChange("CANCELLED")}
                className="py-3 px-4 text-base font-medium hover:bg-red-50 hover:text-red-800 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  Mark as Cancelled
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="text-base text-gray-500 font-medium">
        {filteredOrdersLength} orders
        {(dateFilter.from || dateFilter.to || emailFilter) && (
          <span className="ml-2 text-sm text-blue-600">
            ({emailFilter && "email filtered"}
            {emailFilter && (dateFilter.from || dateFilter.to) && ", "}
            {(dateFilter.from || dateFilter.to) && "date filtered"})
          </span>
        )}
      </div>
    </div>
  );
}
