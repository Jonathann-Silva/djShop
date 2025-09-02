import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProductTable } from '@/components/product-table';
import { getProducts } from '@/lib/products';

export default function AdminDashboard() {
  const products = getProducts();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>
            Gerencie seus produtos aqui. Atualmente, os produtos são
            gerenciados estaticamente.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1" disabled>
          <PlusCircle />
          Adicionar Produto
        </Button>
      </CardHeader>
      <CardContent>
        <ProductTable products={products} />
      </CardContent>
    </Card>
  );
}
