"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Package, ChefHat } from "lucide-react";
import { Food, Category } from "../types/DishesTypes";
import {
  getAllFoods,
  getAllCategories,
  deleteFood,
  deleteCategory,
} from "../api/DishesAPI";
import { AddDishModal } from "./AddDishModal";
import { AddCategoryModal } from "./AddCategoryModal";
import { toast } from "sonner";

export function DishesManager() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [foodsData, categoriesData] = await Promise.all([
        getAllFoods(),
        getAllCategories(),
      ]);
      setFoods(foodsData);
      setCategories(categoriesData);
    } catch (error) {
      toast.error("Failed to load data");
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods =
    selectedCategory === "all"
      ? foods
      : foods.filter((food) => food.category?._id === selectedCategory);

  const handleDeleteFood = async (foodId: string) => {
    if (!confirm("Are you sure you want to delete this dish?")) return;

    try {
      await deleteFood(foodId);
      setFoods(foods.filter((food) => food._id !== foodId));
      toast.success("Dish deleted successfully");
    } catch (error) {
      toast.error("Failed to delete dish");
      console.error("Error deleting dish:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    console.log("Attempting to delete category:", categoryId);

    if (
      !confirm(
        "Are you sure you want to delete this category? This will affect all dishes in this category."
      )
    )
      return;

    try {
      console.log("Calling deleteCategory API...");
      await deleteCategory(categoryId);
      setCategories(categories.filter((cat) => cat._id !== categoryId));
      toast.success("Category deleted successfully");
      // Reload foods to refresh category references
      loadData();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error("Error deleting category:", error);
    }
  };

  const handleFoodUpdate = (updatedFood: Food) => {
    setFoods(
      foods.map((food) => (food._id === updatedFood._id ? updatedFood : food))
    );
    setEditingFood(null);
  };

  const handleFoodCreate = (newFood: Food) => {
    setFoods([...foods, newFood]);
    // Reload data to ensure consistency
    loadData();
  };

  const handleCategoryUpdate = (updatedCategory: Category) => {
    setCategories(
      categories.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat
      )
    );
    setEditingCategory(null);
  };

  const handleCategoryCreate = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
    // Reload data to ensure consistency
    loadData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dishes category header and filters */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Dishes category</h3>
          <Button
            onClick={() => setIsAddDishModalOpen(true)}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg px-6 py-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Dish
          </Button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Dishes {foods.length}
          </button>
          {categories.map((category) => {
            const count = foods.filter(
              (food) => food.category?._id === category._id
            ).length;
            return (
              <div key={category._id} className="relative group">
                <button
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category._id
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.categoryName} {count}
                </button>

                {/* Category Actions - Show on Hover */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCategory(category);
                    }}
                    className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                    title="Edit category"
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category._id);
                    }}
                    disabled={count > 0}
                    className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                      count > 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    title={
                      count > 0
                        ? "Cannot delete category with dishes"
                        : "Delete category"
                    }
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
          <Button
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Display dishes by category */}
      {selectedCategory === "all" ? (
        // Show all categories with their dishes
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryFoods = foods.filter(
              (food) => food.category?._id === category._id
            );
            if (categoryFoods.length === 0) return null;

            return (
              <div key={category._id} className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    {category.categoryName} ({categoryFoods.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryFoods.map((food) => (
                    <Card
                      key={food._id}
                      className="group overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={food.image || "/product2.png"}
                          alt={food.foodName}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setEditingFood(food)}
                          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                        >
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-gray-900">
                            {food.foodName}
                          </h5>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {Array.isArray(food.ingredients)
                              ? food.ingredients.join(", ")
                              : food.ingredients}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-bold text-gray-900">
                              ${food.price}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteFood(food._id)}
                              className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}

          {foods.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                <Package className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                No dishes found
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first dish
              </p>
              <Button
                onClick={() => setIsAddDishModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Dish
              </Button>
            </div>
          )}
        </div>
      ) : (
        // Show filtered category
        <div className="space-y-6">
          {(() => {
            const categoryFoods = foods.filter(
              (food) => food.category?._id === selectedCategory
            );
            const category = categories.find(
              (cat) => cat._id === selectedCategory
            );

            return (
              <>
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    {category?.categoryName} ({categoryFoods.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryFoods.map((food) => (
                    <Card
                      key={food._id}
                      className="group overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={food.image || "/product2.png"}
                          alt={food.foodName}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setEditingFood(food)}
                          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                        >
                          <Edit className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-gray-900">
                            {food.foodName}
                          </h5>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {Array.isArray(food.ingredients)
                              ? food.ingredients.join(", ")
                              : food.ingredients}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-bold text-gray-900">
                              ${food.price}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteFood(food._id)}
                              className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {categoryFoods.length === 0 && (
                  <div className="text-center py-16">
                    <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                      <Package className="h-12 w-12 text-gray-400 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      No dishes in this category
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Add your first dish to {category?.categoryName}
                    </p>
                    <Button
                      onClick={() => setIsAddDishModalOpen(true)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Dish
                    </Button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Modals */}
      <AddDishModal
        isOpen={isAddDishModalOpen || !!editingFood}
        onClose={() => {
          setIsAddDishModalOpen(false);
          setEditingFood(null);
        }}
        onSuccess={editingFood ? handleFoodUpdate : handleFoodCreate}
        categories={categories}
        editingFood={editingFood}
      />

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen || !!editingCategory}
        onClose={() => {
          setIsAddCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSuccess={
          editingCategory ? handleCategoryUpdate : handleCategoryCreate
        }
        editingCategory={editingCategory}
      />
    </div>
  );
}
