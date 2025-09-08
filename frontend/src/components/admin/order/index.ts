// Order-related components and utilities - organized structure

// Main components
export { OrderDashboard } from "./components/OrderDashboard";
export { OrderDetailsModal } from "./components/OrderDetailsModal";
export { OrderStats } from "./components/OrderStats";
export { OrderStatusModal } from "./components/OrderStatusModal";

// Table components
export { OrderTable } from "./table/OrderTable";
export { OrderTableFilters } from "./table/OrderTableFilters";
export { OrderTablePagination } from "./table/OrderTablePagination";
export { OrderStatusColumn } from "./table/OrderStatusColumn";
export { OrderFoodColumn } from "./table/OrderFoodColumn";
export { createOrderColumns } from "./table/OrderTableColumns";

// API and types
export {
  fetchOrders,
  updateOrderStatus,
  bulkUpdateOrderStatus,
} from "./api/OrderAPI";
export type { OrderItem, OrderTableProps } from "./api/OrderTableTypes";
