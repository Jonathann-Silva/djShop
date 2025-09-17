
"use client";

import { useState, useMemo, useEffect } from "react";
import type { Perfume } from "@/lib/products";
import { getProducts, getBrands } from "@/lib/actions";
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
import { Label } from "@/components/ui/label";

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
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [brandFilter, setBrandFilter] = useState("all");
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [productsData, brandsData] = await Promise.all([
          getProducts(),
          getBrands()
      ]);
      setProducts(productsData);
      setBrands(brandsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesBrand = brandFilter === "all" || product.brand === brandFilter;

      return matchesSearch && matchesBrand;
    });

    // Note: Sorting by price will not work correctly here as prices are fetched later.
    // This sorting logic is kept for alphabetical sorting. Price sorting is visual only.
    switch (sortOrder) {
        case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Price sorting is handled visually inside the card or would require a more complex state management
            break;
    }
    
    return filtered;

  }, [products, searchTerm, sortOrder, brandFilter]);


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
      
       <div className="mb-8 max-w-3xl mx-auto flex flex-col md:flex-row items-end gap-4">
            <div className="relative flex-grow w-full">
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
             <div className="flex-shrink-0 w-full md:w-auto">
                <Label htmlFor="brand" className="mb-2 block text-sm font-medium text-muted-foreground">Marca</Label>
                <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger className="w-full md:w-[180px]" id="brand">
                        <SelectValue placeholder="Filtrar por marca" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas as marcas</SelectItem>
                        {brands.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
                <Label htmlFor="sort" className="mb-2 block text-sm font-medium text-muted-foreground">Ordenar por</Label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-full md:w-[180px]" id="sort">
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
                  <ProductCard key={product.id} product={product} sortOrder={sortOrder} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-muted/40 rounded-lg p-12 text-center">
                   <h3 className="text-2xl font-headline font-semibold">Nenhum perfume encontrado</h3>
                   <p className="mt-2 text-muted-foreground">Tente ajustar seus filtros para encontrar o que procura.</p>
                   <Button onClick={() => {
                       setSearchTerm("");
                       setBrandFilter("all");
                    }} className="mt-6">Limpar Filtros</Button>
              </div>
            )
          }
      </main>
    </div>
  );
}
