
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, MapPin, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";


export default function AccountPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  
  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="mt-8 text-4xl font-headline font-bold">Por favor, inicie a sessão</h1>
        <p className="mt-4 text-muted-foreground">
          Precisa de ter a sessão iniciada para ver esta página.
        </p>
        <Button asChild className="mt-8 bg-primary hover:bg-primary/90">
          <Link href="/login">Ir para o Login</Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-headline font-bold">Minha Conta</h1>
          <p className="text-muted-foreground">
            Gerir as suas informações, moradas e encomendas.
          </p>
        </div>
         <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações do Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">{user.displayName || 'Utilizador'}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="secondary" disabled>Editar Perfil</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
