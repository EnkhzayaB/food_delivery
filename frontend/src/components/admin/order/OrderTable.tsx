"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { OrderTableProps } from "./OrderTableTypes";
import { createOrderColumns } from "./OrderTableColumns";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import {
  format,
  startOfDay,
  endOfDay,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OrderTable({
  orders,
  onStatusChange,
  onBulkStatusChange,
  onOrderClick,
  isLoading,
}: OrderTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "createdAt", desc: true }, // Default sort: newest orders first
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [emailFilter, setEmailFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState<{
    from?: Date;
    to?: Date;
  }>({});

  // Filter orders by date range and email
  const filteredOrders = React.useMemo(() => {
    let filtered = orders;

    // Filter by email if emailFilter is set
    if (emailFilter) {
      filtered = filtered.filter((order) => {
        const email = order.user?.email || "";
        return email.toLowerCase().includes(emailFilter.toLowerCase());
      });
    }

    // Filter by date range if dateFilter is set
    if (dateFilter.from || dateFilter.to) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);

        if (dateFilter.from && orderDate < dateFilter.from) return false;
        if (dateFilter.to) {
          const endDate = new Date(dateFilter.to);
          endDate.setHours(23, 59, 59, 999); // Include the entire end date
          if (orderDate > endDate) return false;
        }

        return true;
      });
    }

    return filtered;
  }, [orders, dateFilter, emailFilter]);

  const columns = createOrderColumns(onStatusChange, onOrderClick);

  const table = useReactTable({
    data: filteredOrders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedOrderIds = selectedRows.map((row) => row.original._id);

  const handleBulkStatusChange = (newStatus: string) => {
    console.log("📋 OrderTable handleBulkStatusChange called:", {
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

  // Quick filter functions
  const setQuickDateFilter = (type: string) => {
    const today = new Date();

    if (type === "today") {
      setDateFilter({
        from: startOfDay(today),
        to: endOfDay(today),
      });
    } else if (type === "clear") {
      setDateFilter({});
      setEmailFilter(""); // Also clear email filter
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
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
            onClick={() => setQuickDateFilter("today")}
            className="h-11 px-4 border-gray-200 hover:bg-gray-50 text-base"
          >
            Today
          </Button>

          {/* Clear Filter Button */}
          {(dateFilter.from || dateFilter.to || emailFilter) && (
            <Button
              variant="ghost"
              onClick={() => setQuickDateFilter("clear")}
              className="h-11 px-4 text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-base"
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
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="text-base font-semibold py-3">
                  Bulk Status Change
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleBulkStatusChange("PENDING")}
                  className="py-3 px-4 text-base font-medium hover:bg-yellow-50 hover:text-yellow-800 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    Mark as Pending
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleBulkStatusChange("DELIVERED")}
                  className="py-3 px-4 text-base font-medium hover:bg-green-50 hover:text-green-800 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Mark as Delivered
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleBulkStatusChange("CANCELLED")}
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
          {table.getFilteredRowModel().rows.length} of {filteredOrders.length}{" "}
          orders
          {(dateFilter.from || dateFilter.to || emailFilter) && (
            <span className="ml-2 text-sm text-blue-600">
              ({emailFilter && "email filtered"}
              {emailFilter && (dateFilter.from || dateFilter.to) && ", "}
              {(dateFilter.from || dateFilter.to) && "date filtered"})
            </span>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-gray-200">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-semibold text-gray-700 text-base"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-gray-100 hover:bg-gray-50/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-gray-900 text-base py-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="flex-1 text-base text-gray-500">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        {/* Numbered Pagination */}
        <div className="flex items-center space-x-1">
          {(() => {
            const currentPage = table.getState().pagination.pageIndex + 1;
            const totalPages = table.getPageCount();
            const pageNumbers = [];

            // Always show first page
            if (totalPages > 0) pageNumbers.push(1);

            // Show pages around current page
            const startPage = Math.max(2, currentPage - 2);
            const endPage = Math.min(totalPages - 1, currentPage + 2);

            // Add ellipsis if needed
            if (startPage > 2) pageNumbers.push("...");

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
              if (i !== 1 && i !== totalPages) pageNumbers.push(i);
            }

            // Add ellipsis if needed
            if (endPage < totalPages - 1) pageNumbers.push("...");

            // Always show last page
            if (totalPages > 1) pageNumbers.push(totalPages);

            return pageNumbers.map((pageNum, index) => {
              if (pageNum === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-gray-500"
                  >
                    ...
                  </span>
                );
              }

              const isActive = pageNum === currentPage;
              return (
                <Button
                  key={pageNum}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(Number(pageNum) - 1)}
                  className={`min-w-[40px] h-10 ${
                    isActive
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
