import { OrderItem } from "./OrderTableTypes";

// Fetch orders from backend
export const fetchOrders = async (): Promise<OrderItem[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        return result.data || [];
      }
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  newStatus: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.success;
    }
    return false;
  } catch (error) {
    console.error("Failed to update order status:", error);
    return false;
  }
};
