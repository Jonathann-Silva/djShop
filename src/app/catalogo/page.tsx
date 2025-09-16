
"use client";

import { useState, useMemo, useEffect } from "react";
import type { Perfume } from "@/lib/products";
import { getProducts } from "@/lib/actions";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRealTimePrice } from "@/ai/flows/get-real-time-price-flow";
import { Label } from "@/components/ui/label";

type ProductWithPrice = Perfume & { price: number | null };

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
  const [products, setProducts] = useState<ProductWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const productsData = await getProducts();
      
      // Fetch prices for all products
      const productsWithPrices = await Promise.all(productsData.map(async (p) => {
          let price: number | null = null;
          if(p.priceUrl) {
              try {
                  const priceResult = await getRealTimePrice({ url: p.priceUrl });
                  if (priceResult && typeof priceResult.price === 'number') {
                      const margin = 1 + p.profitMargin / 100;
                      price = priceResult.price * margin;
                  }
              } catch(error) {
                  console.error(`Failed to fetch price for ${p.name}:`, error);
              }
          }
          return { ...p, price };
      }));

      setProducts(productsWithPrices);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    switch (sortOrder) {
        case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "price-asc":
            filtered.sort((a, b) => {
                if (a.price === null) return 1;
                if (b.price === null) return -1;
                return a.price - b.price;
            });
            break;
        case "price-desc":
            filtered.sort((a, b) => {
                 if (a.price === null) return 1;
                if (b.price === null) return -1;
                return b.price - a.price;
            });
            break;
        default:
            break;
    }
    
    return filtered;

  }, [products, searchTerm, sortOrder]);


  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          A Nossa Coleção de Perfumes
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a nossa seleção escolhida a dedo de fragrâncias requintadas. Use os filtros para encontrar o perfume perfeito para si.
        </p>
      </div>
      
       <div className="mb-8 max-w-md mx-auto flex items-end gap-4">
            <div className="relative flex-grow">
                 <Label htmlFor="search" className="mb-2 block text-sm font-medium text-muted-foreground">Procurar</Label>
                <Search className="absolute left-3 bottom-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    id="search"
                    placeholder="Procurar perfume..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="flex-shrink-0">
                <Label htmlFor="sort" className="mb-2 block text-sm font-medium text-muted-foreground">Ordenar por</Label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px]" id="sort">
                        <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">A-Z</SelectItem>
                        <SelectItem value="name-desc">Z-A</SelectItem>
                        <SelectItem value="price-asc">Menor Preço</SelectItem>
                        <SelectItem value="price-desc">Maior Preço</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

      <main>
          {loading ? <ProductsSkeleton /> : 
            filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAndSortedProducts.map((product) => (
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
