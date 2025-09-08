import { OrderItem } from "./OrderTableTypes";
import { baseurl } from "@/utils/baseUrl";

// Fetch orders from backend
export const fetchOrders = async (): Promise<OrderItem[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseurl}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await fetch(`${baseurl}/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

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

// Bulk update order status
export const bulkUpdateOrderStatus = async (
  orderIds: string[],
  newStatus: string
): Promise<{
  success: boolean;
  modifiedCount?: number;
  orders?: OrderItem[];
}> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseurl}/order/bulk-update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderIds, status: newStatus }),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: result.success,
        modifiedCount: result.data?.modifiedCount,
        orders: result.data?.orders,
      };
    }
    return { success: false };
  } catch (error) {
    console.error("Failed to bulk update order status:", error);
    return { success: false };
  }
};
