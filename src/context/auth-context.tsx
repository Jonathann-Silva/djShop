"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers = {
  "admin@gmail.com": { id: "1", name: "Admin User" },
  "user@gmail.com": { id: "2", name: "Regular User" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, pass: string) => {
    // This is a mock login. In a real app, you'd verify password against a backend.
    const foundUser = mockUsers[email as keyof typeof mockUsers];
    if (foundUser) {
      const userData = { ...foundUser, email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } else {
      throw new Error("Invalid credentials. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
