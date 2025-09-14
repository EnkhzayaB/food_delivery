import { baseurl } from "@/utils/baseUrl";
import {
  Food,
  Category,
  CreateFoodRequest,
  CreateCategoryRequest,
  UpdateFoodRequest,
  UpdateCategoryRequest,
} from "../types/DishesTypes";

// Food API functions
export const getAllFoods = async (): Promise<Food[]> => {
  const response = await fetch(`${baseurl}/food`);
  const data = await response.json();
  return data.success ? data.data : [];
};

export const createFood = async (
  foodData: CreateFoodRequest
): Promise<Food> => {
  const response = await fetch(`${baseurl}/food`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(foodData),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to create food");
  }
  return data.data;
};

export const updateFood = async (
  foodId: string,
  foodData: Partial<CreateFoodRequest>
): Promise<Food> => {
  const response = await fetch(`${baseurl}/food/${foodId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(foodData),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to update food");
  }
  return data.data;
};

export const deleteFood = async (foodId: string): Promise<void> => {
  const response = await fetch(`${baseurl}/food/${foodId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to delete food");
  }
};

// Category API functions
export const getAllCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${baseurl}/category`);
  const data = await response.json();
  return data.success ? data.data : [];
};

export const createCategory = async (
  categoryData: CreateCategoryRequest
): Promise<Category> => {
  const response = await fetch(`${baseurl}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to create category");
  }
  return data.data;
};

export const updateCategory = async (
  categoryId: string,
  categoryData: Partial<CreateCategoryRequest>
): Promise<Category> => {
  const response = await fetch(`${baseurl}/category/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to update category");
  }
  return data.data;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  const response = await fetch(`${baseurl}/category/${categoryId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to delete category");
  }
};
