"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { OrderItem } from "../api/OrderTableTypes";

interface OrderTableBackupPaginationProps {
  table: Table<OrderItem>;
  filteredOrdersLength: number;
}

export function OrderTableBackupPagination({
  table,
  filteredOrdersLength,
}: OrderTableBackupPaginationProps) {
  return (
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
  );
}
