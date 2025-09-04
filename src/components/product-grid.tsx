'use client';

import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products';
import { useMemo } from 'react';

interface ProductGridProps {
  products: Product[];
}

const BRANDS = ['Apple', 'Xiaomi', 'Samsung', 'Paco Rabanne', 'Dior'];

const getBrandFromProductName = (name: string): string | null => {
  const lowerCaseName = name.toLowerCase();
  for (const brand of BRANDS) {
    if (lowerCaseName.includes(brand.toLowerCase())) {
      return brand;
    }
  }
  // Fallback for iPhone specifically
  if (lowerCaseName.includes('iphone')) return 'Apple';
  return null;
}

export function ProductGrid({ products }: ProductGridProps) {
  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    const unbranded: Product[] = [];

    products.forEach((product) => {
      const brand = getBrandFromProductName(product.name);
      if (brand) {
        if (!groups[brand]) {
          groups[brand] = [];
        }
        groups[brand].push(product);
      } else {
        unbranded.push(product);
      }
    });
    
    // Sort brands alphabetically, but keep "Outros" at the end
    const sortedGroups: Record<string, Product[]> = {};
    Object.keys(groups).sort().forEach(brand => {
        sortedGroups[brand] = groups[brand];
    });

    if (unbranded.length > 0) {
      sortedGroups['Outros'] = unbranded;
    }

    return sortedGroups;
  }, [products]);

  const hasContent = products.length > 0;
  const hasMultipleGroups = Object.keys(groupedProducts).length > 1;

  if (!hasContent) {
    return (
      <div className="text-center py-10 col-span-full">
        <h2 className="text-2xl font-semibold">Nenhum produto encontrado</h2>
        <p className="text-muted-foreground">Tente ajustar sua busca ou filtros.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {Object.entries(groupedProducts).map(([brand, brandProducts]) => (
        <section key={brand}>
          { (hasMultipleGroups || brand !== 'Outros') && (
            <h2 className="text-2xl font-bold font-headline mb-4 pb-2 border-b-2 border-primary">
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
