"use client";
import { useState } from "react";
import { Food } from "@/types";
import { useCart } from "@/context/CartContext";
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
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <div className="bg-white rounded-[20px] shadow-md hover:shadow-2xl">
          <img
            src={food.image}
            alt={food.foodName}
            className="rounded-t-[20px] w-full h-50 sm:h-64 object-cover"
          />
          <div className="px-2">
            <h3 className="text-base md:text-2xl font-semibold mt-2 text-[#EF4444]">
              {food.foodName}
            </h3>
            <p className="text-sm text-gray-600">{food.ingredients}</p>
            <p className="text-sm font-bold mt-1">${food.price}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img
                src={food.image}
                alt={food.foodName}
                className="rounded w-full h-64 object-cover"
              />
            </div>
            <div className="flex justify-evenly flex-col">
              <div>
                <DialogTitle>
                  <p className="text-md font-semibold mt-2 text-[#EF4444]">
                    {food.foodName}
                  </p>
                </DialogTitle>
                <DialogDescription>
                  {" "}
                  <p className="text-sm text-gray-600">{food.ingredients}</p>
                </DialogDescription>
              </div>
              <div className="flex gap-8 items-center">
                <div className="flex flex-col">
                  <p className="text-lg font-normal">Total price</p>
                  <p className="text-sm font-bold mt-1">${food.price}</p>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Button
                    className="bg-gray-100 text-black border-gray-600 rounded-full hover:bg-black hover:text-white"
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    -
                  </Button>
                  <p>{quantity}</p>
                  <Button
                    className="bg-gray-100 text-black border-gray-600 rounded-full hover:bg-black hover:text-white"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setOpen(false);
                    if (quantity === 0) return;

                    addToCart({
                      id: food._id,
                      foodName: food.foodName,
                      price: food.price,
                      image: food.image,
                      quantity,
                    });
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

// w-[200px] lg:w-[400px] xl:w-full
