import { Food } from "@/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const FoodCards = ({ food }: { food: Food }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>

      <DialogContent className="sm:max-w-[555px]">
        {/* <DialogHeader>
          <img
            src={food.image}
            alt={food.foodName}
            className="rounded-[20px] w-full h-64 object-cover"
          />
          <DialogTitle>
            <h1>{food.foodName}</h1>
          </DialogTitle>
          <DialogDescription>
            <p>{food.ingredients}</p>
            <p className="text-sm font-bold mt-1">${food.price}</p>
          </DialogDescription>
        </DialogHeader> */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              src={food.image}
              alt={food.foodName}
              className="rounded-[20px] w-full h-64 object-cover"
            />
          </div>
          <div>
            <h1 className="text-md font-semibold mt-2 text-[#EF4444]">
              {food.foodName}
            </h1>
            <p className="text-sm text-gray-600">{food.ingredients}</p>

            <div className="">
              <p className="text-lg font-normal">Total price</p>
              <p className="text-sm font-bold mt-1">${food.price}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// w-[200px] lg:w-[400px] xl:w-full
