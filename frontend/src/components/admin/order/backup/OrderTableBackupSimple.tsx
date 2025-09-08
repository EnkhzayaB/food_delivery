"use client";

import * as React from "react";
import { OrderTableProps } from "../api/OrderTableTypes";
import { createOrderColumns } from "../table/OrderTableColumns";
import { OrderTableBackupFilters } from "./OrderTableBackupFilters";
import { OrderTableBackupPagination } from "./OrderTableBackupPagination";
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
import { startOfDay, endOfDay } from "date-fns";

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
      <OrderTableBackupFilters
        emailFilter={emailFilter}
        setEmailFilter={setEmailFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        selectedOrderIds={selectedOrderIds}
        onBulkStatusChange={handleBulkStatusChange}
        onQuickDateFilter={setQuickDateFilter}
        filteredOrdersLength={table.getFilteredRowModel().rows.length}
      />

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

      <OrderTableBackupPagination
        table={table}
        filteredOrdersLength={table.getFilteredRowModel().rows.length}
      />
    </div>
  );
}
