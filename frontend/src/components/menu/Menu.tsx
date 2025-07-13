"use client";
import { useEffect, useState } from "react";
import { FoodCards } from "./FoodCards";
import { Food, Category } from "@/types";

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
            <h2 className="font-semibold text-3xl mt-10 mb-4">
              {category.categoryName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {foods &&
                foods
                  .filter(
                    (food) =>
                      food.category.categoryName === category.categoryName
                  )
                  .map((food, index) => {
                    return <FoodCards food={food} key={index}></FoodCards>;
                  })}
            </div>
          </div>
        );
      })}
    </>
  );
};
