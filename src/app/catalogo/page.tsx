
"use client";

import { useState, useMemo, useEffect } from "react";
import type { Perfume } from "@/lib/products";
import { getProducts } from "@/lib/actions";
import { ProductCard } from "@/components/product-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


function ProductsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-[250px] w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-10 w-28" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
        return products;
    }
    return products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [products, searchTerm]);


  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Our Perfume Collection
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our handpicked selection of exquisite fragrances. Use the
          filters to find the perfect scent for you.
        </p>
      </div>
      
       <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    id="search"
                    placeholder="Procurar perfume..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
        </div>

      <main>
          {loading ? <ProductsSkeleton /> : 
            filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-muted/40 rounded-lg p-12 text-center">
                   <h3 className="text-2xl font-headline font-semibold">Nenhum perfume encontrado</h3>
                   <p className="mt-2 text-muted-foreground">Tente ajustar seus filtros para encontrar o que procura.</p>
                   <Button onClick={() => setSearchTerm("")} className="mt-6">Limpar Filtros</Button>
              </div>
            )
          }
      </main>
    </div>
  );
}
