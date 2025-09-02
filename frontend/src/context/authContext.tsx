"use client";
import { createContext, useState, useEffect, useContext } from "react";

type AuthContextType = {
  email: string | null;
  role: string | null;
  isLoggedIn: boolean;
  login: (token: string, email: string, role?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (token && email) {
      setIsLoggedIn(true);
      setEmail(email);
      setRole(role);
    }
  }, []);

  const login = (token: string, email: string, userRole?: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    if (userRole) {
      localStorage.setItem("role", userRole);
      setRole(userRole);
    }
    setIsLoggedIn(true);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setEmail(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ email, role, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth AuthProvidertai bh heregtei");
  }
  return context;
};
