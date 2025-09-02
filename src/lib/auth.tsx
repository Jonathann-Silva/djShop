'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null | undefined;
  login: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    // This is a simple simulation. In a real app, you'd verify a token.
    const storedUser = localStorage.getItem('vitrine-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const login = (name: string, email: string) => {
    const newUser = { name, email };
    localStorage.setItem('vitrine-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('vitrine-user');
    setUser(null);
  };
  
  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
