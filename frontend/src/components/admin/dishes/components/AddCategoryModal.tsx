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
import { Category, CreateCategoryRequest } from "../types/DishesTypes";
import { createCategory, updateCategory } from "../api/DishesAPI";
import { toast } from "sonner";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (category: Category) => void;
  editingCategory?: Category | null;
}

export function AddCategoryModal({
  isOpen,
  onClose,
  onSuccess,
  editingCategory,
}: AddCategoryModalProps) {
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    categoryName: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        categoryName: editingCategory.categoryName,
      });
    } else {
      setFormData({
        categoryName: "",
      });
    }
  }, [editingCategory, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setLoading(true);

    try {
      let result: Category;
      if (editingCategory) {
        result = await updateCategory(editingCategory._id, formData);
      } else {
        result = await createCategory(formData);
      }

      onSuccess(result);
      onClose();
      toast.success(
        editingCategory
          ? "Category updated successfully"
          : "Category created successfully"
      );
    } catch (error) {
      toast.error(
        editingCategory
          ? "Failed to update category"
          : "Failed to create category"
      );
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="categoryName">Category Name *</Label>
            <Input
              id="categoryName"
              value={formData.categoryName}
              onChange={(e) =>
                setFormData({ ...formData, categoryName: e.target.value })
              }
              placeholder="Enter category name"
              required
            />
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
              {loading
                ? "Saving..."
                : editingCategory
                ? "Update Category"
                : "Add Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
