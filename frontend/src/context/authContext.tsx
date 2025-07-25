"use client";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  email: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = decodeToken(token);
      if (userData?.email) {
        setIsLoggedIn(true);
        setEmail(userData.email);
      }
    }
  }, []);

  const login = (user: UserType, token: string) => {
    setIsLoggedIn(true);
    setEmail(user.email);
    setUserId(user._id); // хэрвээ хэрэглэж байгаа бол
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setEmail("");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    return decoded;
  } catch (error) {
    return null;
  }
}
