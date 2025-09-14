"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Food, Category, CreateFoodRequest } from "../types/DishesTypes";
import { createFood, updateFood } from "../api/DishesAPI";
import { toast } from "sonner";

interface AddDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (food: Food) => void;
  categories: Category[];
  editingFood?: Food | null;
}

export function AddDishModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
  editingFood,
}: AddDishModalProps) {
  const [formData, setFormData] = useState<CreateFoodRequest>({
    foodName: "",
    price: 0,
    image: "",
    ingredients: [],
    category: "",
  });
  const [ingredientsText, setIngredientsText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingFood) {
      setFormData({
        foodName: editingFood.foodName,
        price: editingFood.price,
        image: editingFood.image,
        ingredients: editingFood.ingredients,
        category: editingFood.category?._id || "",
      });
      setIngredientsText(
        Array.isArray(editingFood.ingredients)
          ? editingFood.ingredients.join(", ")
          : String(editingFood.ingredients || "")
      );
    } else {
      setFormData({
        foodName: "",
        price: 0,
        image: "",
        ingredients: [],
        category: "",
      });
      setIngredientsText("");
    }
  }, [editingFood, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.foodName || !formData.category || formData.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const ingredients = ingredientsText
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient.length > 0);

      const foodData = {
        ...formData,
        ingredients,
      };

      let result: Food;
      if (editingFood) {
        result = await updateFood(editingFood._id, foodData);
      } else {
        result = await createFood(foodData);
      }

      onSuccess(result);
      onClose();
      toast.success(
        editingFood ? "Dish updated successfully" : "Dish created successfully"
      );
    } catch (error) {
      toast.error(
        editingFood ? "Failed to update dish" : "Failed to create dish"
      );
      console.error("Error saving dish:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingFood ? "Edit Dish" : "Add New Dish"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="foodName">Dish Name *</Label>
            <Input
              id="foodName"
              value={formData.foodName}
              onChange={(e) =>
                setFormData({ ...formData, foodName: e.target.value })
              }
              placeholder="Enter dish name"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              placeholder="lettuce, tomato, cheese, bacon (separated by commas)"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate ingredients with commas
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-500 hover:bg-red-600"
              disabled={loading}
            >
              {loading ? "Saving..." : editingFood ? "Update Dish" : "Add Dish"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
