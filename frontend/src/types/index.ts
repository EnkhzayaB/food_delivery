export type Food = {
  _id: string;
  foodName: string;
  price: string;
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

export type AuthContextType = {
  isLoggedIn: boolean;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
};
