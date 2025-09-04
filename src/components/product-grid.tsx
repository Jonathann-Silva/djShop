
'use client';

import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products';
import { useMemo, useEffect, useState } from 'react';
import { getBrands } from '@/actions/brands';
import { Skeleton } from './ui/skeleton';

interface ProductGridProps {
  products: Product[];
  groupByBrand?: boolean;
}

const getBrandFromProductName = (name: string, brands: string[]): string | null => {
  const lowerCaseName = name.toLowerCase();
  for (const brand of brands) {
    if (lowerCaseName.includes(brand.toLowerCase())) {
      return brand;
    }
  }
  // Fallback para iPhone especificamente, se "Apple" estiver nas marcas.
  if (brands.includes('Apple') && lowerCaseName.includes('iphone')) return 'Apple';
  return null;
}

export function ProductGrid({ products, groupByBrand = true }: ProductGridProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBrands() {
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
        setIsLoading(false);
    }
    loadBrands();
  }, []);

  const groupedProducts = useMemo(() => {
    if (!groupByBrand || isLoading || brands.length === 0) return { 'all': products };

    const groups: Record<string, Product[]> = {};
    const unbranded: Product[] = [];

    products.forEach((product) => {
      const brand = getBrandFromProductName(product.name, brands);
      if (brand) {
        if (!groups[brand]) {
          groups[brand] = [];
        }
        groups[brand].push(product);
      } else {
        unbranded.push(product);
      }
    });
    
    const sortedGroups: Record<string, Product[]> = {};
    // Garante que a ordem das marcas definidas no admin seja respeitada
    brands.forEach(brand => {
        if (groups[brand]) {
            sortedGroups[brand] = groups[brand];
        }
    });

    if (unbranded.length > 0) {
      sortedGroups['Outros'] = unbranded;
    }

    return sortedGroups;
  }, [products, brands, isLoading, groupByBrand]);

  const hasContent = products.length > 0;
  
  if (isLoading && groupByBrand) {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/4" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
             <div className="space-y-4">
                <Skeleton className="h-8 w-1/4" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
    )
  }

  if (!hasContent) {
    return (
      <div className="text-center py-10 col-span-full">
        <h2 className="text-2xl font-semibold">Nenhum produto encontrado</h2>
        <p className="text-muted-foreground">Tente ajustar sua busca ou filtros.</p>
      </div>
    );
  }
  
  const visibleGroups = Object.entries(groupedProducts).filter(([, brandProducts]) => brandProducts.length > 0);
  
  if (!groupByBrand) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )
  }

  return (
    <div className="space-y-8">
      {visibleGroups.map(([brand, brandProducts]) => (
        <section key={brand}>
          { (brand !== 'Outros' && brand !== 'all') && (
            <h2 className="text-2xl font-bold font-headline mb-4 pb-2 border-b-2 border-primary text-center">
              {brand}
            </h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
