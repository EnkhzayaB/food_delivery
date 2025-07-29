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

export type AuthContextType = {
  isLoggedIn: boolean;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
};

type CartItem = {
  id: string;
  foodName: string;
  image: string;
  price: number;
  quantity: number;
};
