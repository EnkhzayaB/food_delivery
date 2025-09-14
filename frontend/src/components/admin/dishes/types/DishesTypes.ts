export interface Category {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Food {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string[];
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFoodRequest {
  foodName: string;
  price: number;
  image: string;
  ingredients: string[];
  category: string;
}

export interface CreateCategoryRequest {
  categoryName: string;
}

export interface UpdateFoodRequest extends Partial<CreateFoodRequest> {
  _id: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  _id: string;
}
