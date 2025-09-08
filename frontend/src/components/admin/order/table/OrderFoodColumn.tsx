"use client";

import { OrderItem } from "../api/OrderTableTypes";

interface OrderFoodColumnProps {
  order: OrderItem;
  onOrderClick?: (order: OrderItem) => void;
}

export function OrderFoodColumn({ order, onOrderClick }: OrderFoodColumnProps) {
  const totalItems =
    order.foodOrderItems?.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    ) || 0;

  const foodText = totalItems === 1 ? "1 food" : `${totalItems} foods`;

  const handleClick = () => {
    if (onOrderClick) {
      onOrderClick(order);
    }
  };

  return (
    <div
      className="text-base cursor-pointer hover:text-blue-600 hover:underline"
      onClick={handleClick}
    >
      {foodText}
    </div>
  );
}
