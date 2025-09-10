'use client';

import { useEffect, useState, useMemo } from 'react';
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
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => ['Todas as Categorias', ...getCategories()], []);
  const { user } = useAuth();
  const router = useRouter();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas as Categorias');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todas as Categorias') {
      return allProducts;
    } else {
      return allProducts.filter((p) => p.category === selectedCategory);
    }
  }, [selectedCategory, allProducts]);

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (!user || user.email !== 'admin@gmail.com') {
      router.replace('/');
    }
  }, [user, router]);

  if (user === undefined) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user || user.email !== 'admin@gmail.com') {
    return null;
  }

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>
              Gerencie seus produtos e veja o catálogo completo.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
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
