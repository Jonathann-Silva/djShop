"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo de volta, ${userCredential.user.displayName || userCredential.user.email}!`,
      });
    } catch (error: any) {
      console.error("Erro no login:", error);
      throw new Error( "Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo, ${result.user.displayName}!`,
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        variant: "destructive",
        title: "Falha no Login com o Google",
        description: "Não foi possível fazer login com o Google. Tente novamente.",
      });
    }
  };


  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Sessão terminada",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
       console.error("Logout error:", error);
        toast({
            variant: "destructive",
            title: "Erro ao sair",
            description: "Ocorreu um problema ao terminar a sessão.",
        });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
