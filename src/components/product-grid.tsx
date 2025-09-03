'use client';

import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/products';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 col-span-full">
            <h2 className="text-2xl font-semibold">Nenhum produto encontrado</h2>
            <p className="text-muted-foreground">Tente ajustar sua busca ou filtros.</p>
        </div>
      )}
    </div>
  );
}
