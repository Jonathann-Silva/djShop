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

// Mock data for demonstration
const addresses = [
  {
    id: 1,
    type: "Home",
    street: "123 Perfume Lane",
    city: "Scent City, ST 12345",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    street: "456 Fragrance Ave",
    city: "Aroma Town, AT 67890",
    isDefault: false,
  },
];

const orders = [
  {
    id: "ORD-001",
    date: "2023-10-26",
    total: 180.0,
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "2023-11-15",
    total: 220.0,
    status: "Shipped",
  },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
     // Or a loading spinner
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="mt-8 text-4xl font-headline font-bold">Please log in</h1>
        <p className="mt-4 text-muted-foreground">
          You need to be logged in to view this page.
        </p>
        <Button asChild className="mt-8 bg-primary hover:bg-primary/90">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    )
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };


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
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="secondary">Editar Perfil</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Moradas Guardadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      {address.type}{" "}
                      {address.isDefault && (
                        <span className="text-xs bg-primary/20 text-primary-dark font-medium px-2 py-0.5 rounded-full ml-2">
                          Padrão
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.street}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
             <Button variant="secondary">Adicionar Nova Morada</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Histórico de Encomendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order, index) => (
                <>
                  <div key={order.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Encomenda #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Data: {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="font-semibold">${order.total.toFixed(2)}</p>
                       <p className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-amber-600'}`}>{order.status === 'Delivered' ? 'Entregue' : 'Enviado'}</p>
                    </div>
                  </div>
                  {index < orders.length -1 && <Separator />}
                </>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
