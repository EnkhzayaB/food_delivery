export type OrderItem = {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  foodOrderItems: Array<{
    food: {
      _id: string;
      name: string;
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
  isLoading?: boolean;
}
