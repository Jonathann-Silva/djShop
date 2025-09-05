
'use client';

import { useMemo, useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGrid } from './product-grid';
import { getCategories, type Product } from '@/lib/products';
import { getTabSettings, type TabSetting } from '@/actions/tabs';
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
      const enabledCategories = settings.filter(s => s.isActive).map(s => s.category);
      setActiveCategories(['Promoções', ...enabledCategories]);
      setIsLoading(false);
    }
    loadSettings();
  }, []);

  const onSaleProducts = useMemo(() => products.filter(p => p.onSale), [products]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center mb-8">
        <Skeleton className="h-10 w-96 rounded-md" />
      </div>
    );
  }
  
  // Define a primeira aba ativa como padrão
  const defaultValue = activeCategories.length > 0 ? activeCategories[0] : '';

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
      {activeCategories.slice(1).map((category) => (
        <TabsContent key={category} value={category}>
          <ProductGrid products={products.filter((p) => p.category === category)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
