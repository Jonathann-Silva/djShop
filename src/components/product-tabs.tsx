'use client';

import { useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGrid } from './product-grid';
import { getCategories, type Product } from '@/lib/products';

interface ProductTabsProps {
  products: Product[];
}

export function ProductTabs({ products }: ProductTabsProps) {
  const categories = useMemo(() => getCategories(), []);

  return (
    <Tabs defaultValue={categories[0]} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <ProductGrid products={products.filter((p) => p.category === category)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
