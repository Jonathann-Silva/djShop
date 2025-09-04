
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { ProductForm } from '@/components/product-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductTable } from '@/components/product-table';
import { getProducts, getCategories } from '@/lib/products';
import type { Product } from '@/lib/products';
import { PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminDashboard() {
  const products = getProducts();
  const categories = ['Todas as Categorias', ...getCategories()];
  const { user } = useAuth();
  const router = useRouter();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas as Categorias');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (selectedCategory === 'Todas as Categorias') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    // Se o estado de autenticação ainda está carregando, não faz nada
    if (user === undefined) {
      return;
    }
    // Se não há usuário ou o usuário não é o admin, redireciona
    if (!user || user.email !== 'admin@gmail.com') {
      router.replace('/');
    }
  }, [user, router]);

  // Mostra um estado de carregamento enquanto verifica o usuário
  if (user === undefined) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Se o usuário não for o admin, não renderiza nada (será redirecionado)
  if (!user || user.email !== 'admin@gmail.com') {
    return null;
  }

  // Se o usuário é o admin, mostra a página
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>
              Gerencie seus produtos aqui. Atualmente, os produtos são
              gerenciados estaticamente.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle />
                Adicionar Produto
              </Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        <CardContent>
          <ProductTable products={filteredProducts} />
        </CardContent>
      </Card>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
        </DialogHeader>
        <ProductForm onSave={() => setIsAddDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
