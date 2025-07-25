"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FoodCards } from "./FoodCards";
import { Food, Category } from "@/types";
import { log } from "console";
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

export const Menu = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchFoods();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`
      );
      const responseData = await response.json();
      setCategory(responseData.data);
      console.log("data", responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food`
      );
      const responseData = await response.json();
      setFoods(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {category.map((category, index) => {
        return (
          <div key={index}>
            <h2 className="font-semibold text-3xl mt-10 mb-4 mx-6 md:mx-25 2xl:mx-26">
              {category.categoryName}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mx-6 md:mx-25 2xl:mx-26">
              {foods &&
                foods
                  .filter(
                    (food) =>
                      food.category?.categoryName === category.categoryName
                  )
                  .slice(0, 8)
                  .map((food, index) => {
                    return <FoodCards food={food} key={index}></FoodCards>;
                  })}
              {/* <Link href={"/category"}> */}
              <div className="bg-gray-100 rounded-[20px] shadow-md p-1.5 hover:shadow-2xl flex justify-center items-center hover:bg-gray-200">
                <p className="text-md font-semibold mt-2 text-[#EF4444]">
                  {" "}
                  See more
                </p>
              </div>
              {/* </Link> */}
            </div>
          </div>
        );
      })}
    </>
  );
};
