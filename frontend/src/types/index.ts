export type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: {
    categoryName: string;
    categoryId: string;
  };
};
export type Category = {
  _id: string;
  categoryName: string;
};
