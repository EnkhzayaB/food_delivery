export type OrderItem = {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  foodOrderItems: Array<{
    food: {
      _id: string;
      name?: string;
      foodName?: string;
      image?: string;
    };
    quantity: number;
  }>;
  totalPrice: number;
  deliveryAddress: string;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
};

export interface OrderTableProps {
  orders: OrderItem[];
  onStatusChange: (orderId: string, newStatus: string) => void;
  onBulkStatusChange?: (orderIds: string[], newStatus: string) => void;
  onOrderClick?: (order: OrderItem) => void;
  isLoading?: boolean;
}
