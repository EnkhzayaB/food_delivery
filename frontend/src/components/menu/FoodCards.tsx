import { Food } from "@/types";

export const FoodCards = ({ food }: { food: Food }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-md p-1.5 hover:shadow-2xl">
      <img
        src={food.image}
        alt={food.foodName}
        className="rounded-[20px] w-full h-64 object-cover"
      />
      <h3 className="text-md font-semibold mt-2 text-[#EF4444]">
        {food.foodName}
      </h3>
      <p className="text-sm text-gray-600">{food.ingredients}</p>
      <p className="text-sm font-bold mt-1">${food.price}</p>
    </div>
  );
};

// w-[200px] lg:w-[400px] xl:w-full
