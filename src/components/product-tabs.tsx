'use client';

import { useMemo, useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGrid } from './product-grid';
import type { Product } from '@/lib/products';
import { getTabSettings } from '@/actions/tabs';
import { Skeleton } from './ui/skeleton';

interface ProductTabsProps {
  products: Product[];
}

export function ProductTabs({ products }: ProductTabsProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getTabSettings();
      const enabledCategories = settings
        .filter((s) => s.isActive)
        .map((s) => s.category);
      
      const onSaleProducts = products.filter(p => p.onSale);
      const categoriesToShow = [];

      // Adiciona 'Promoções' apenas se houver produtos em promoção
      if (onSaleProducts.length > 0) {
        categoriesToShow.push('Promoções');
      }

      // Adiciona as outras categorias ativas
      categoriesToShow.push(...enabledCategories);
      
      setActiveCategories(categoriesToShow);
      setIsLoading(false);
    }
    loadSettings();
  }, [products]);

  const onSaleProducts = useMemo(() => products.filter((p) => p.onSale), [
    products,
  ]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center">
          <Skeleton className="h-10 w-96 rounded-md" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Define a primeira aba ativa como padrão
  const defaultValue = activeCategories.length > 0 ? activeCategories[0] : '';
  
  if (activeCategories.length === 0) {
    return null; // Não renderiza nada se não houver abas ativas
  }

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList>
          {activeCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {activeCategories.includes('Promoções') && (
        <TabsContent value="Promoções">
          <ProductGrid products={onSaleProducts} groupByBrand={false} />
        </TabsContent>
      )}
      {activeCategories
        .filter((c) => c !== 'Promoções')
        .map((category) => (
          <TabsContent key={category} value={category}>
            <ProductGrid
              products={products.filter((p) => p.category === category)}
            />
          </TabsContent>
        ))}
    </Tabs>
  );
}
