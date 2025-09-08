'use client';

import { useMemo, useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGrid } from './product-grid';
import type { Product } from '@/lib/products';
import { getTabSettings } from '@/actions/tabs';
import { Skeleton } from './ui/skeleton';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface ProductTabsProps {
  products: Product[];
}

export function ProductTabs({ products }: ProductTabsProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const showSearchBar = ['Perfumes Masculino', 'Perfumes Femininos'].includes(
    activeTab
  );

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      const settings = await getTabSettings();
      const enabledCategories = settings
        .filter((s) => s.isActive)
        .map((s) => s.category);

      const onSaleProducts = products.filter((p) => p.onSale);
      const categoriesToShow = [];

      if (onSaleProducts.length > 0) {
        categoriesToShow.push('Promoções');
      }

      categoriesToShow.push(...enabledCategories);

      setActiveCategories(categoriesToShow);
      if (categoriesToShow.length > 0) {
        setActiveTab(categoriesToShow[0]);
      }
      setIsLoading(false);
    }
    loadSettings();
  }, [products]);

  const onSaleProducts = useMemo(
    () => products.filter((p) => p.onSale),
    [products]
  );

  const filteredProducts = (category: string) => {
    let baseProducts = [];
    if (category === 'Promoções') {
      baseProducts = onSaleProducts;
    } else {
      baseProducts = products.filter((p) => p.category === category);
    }

    if (showSearchBar && searchTerm) {
      return baseProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return baseProducts;
  };

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

  if (activeCategories.length === 0) {
    return null; // Não renderiza nada se não houver abas ativas
  }

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex justify-center mb-6">
        <TabsList>
          {activeCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {showSearchBar && (
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome do perfume..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {activeCategories.map((category) => (
        <TabsContent key={category} value={category}>
          <ProductGrid products={filteredProducts(category)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
