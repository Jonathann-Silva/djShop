
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Perfume } from '@/lib/products';
import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Venus, Mars } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [brandFilter, setBrandFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState<'Feminine' | 'Masculine'>(
    'Feminine'
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const { filteredAndSortedProducts, availableBrands } = useMemo(() => {
    const genderFilteredProducts = products.filter(
      (product) => product.gender === genderFilter
    );

    const currentBrands = [
      ...new Set(genderFilteredProducts.map((p) => p.brand)),
    ].sort();

    let filtered = genderFilteredProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesBrand =
        brandFilter === 'all' || product.brand === brandFilter;
      return matchesSearch && matchesBrand;
    });

    switch (sortOrder) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }

    return {
      filteredAndSortedProducts: filtered,
      availableBrands: currentBrands,
    };
  }, [products, searchTerm, sortOrder, brandFilter, genderFilter]);

  const handleGenderChange = (value: string) => {
    setGenderFilter(value as 'Feminine' | 'Masculine');
    setBrandFilter('all');
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          A Nossa Coleção de Perfumes
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a nossa seleção escolhida a dedo de fragrâncias requintadas.
          Use os filtros para encontrar o perfume perfeito para si.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <Tabs
          value={genderFilter}
          onValueChange={handleGenderChange}
          className="w-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Feminine">
              <Venus className="mr-2 h-4 w-4" />
              Feminino
            </TabsTrigger>
            <TabsTrigger value="Masculine">
              <Mars className="mr-2 h-4 w-4" />
              Masculino
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mb-8 max-w-3xl mx-auto flex flex-col md:flex-row items-end gap-4">
        <div className="relative flex-grow w-full">
          <Label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Procurar
          </Label>
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
          <Label
            htmlFor="sort"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Ordenar por
          </Label>
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

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <Button
          variant={brandFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setBrandFilter('all')}
          className="px-4"
        >
          Todas as Marcas
        </Button>
        {availableBrands.map((brand) => (
          <Button
            key={brand}
            variant={brandFilter === brand ? 'default' : 'outline'}
            onClick={() => setBrandFilter(brand)}
            className="px-4"
          >
            {brand}
          </Button>
        ))}
      </div>

      <main>
        {loading ? (
          <ProductsSkeleton />
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-muted/40 rounded-lg p-12 text-center">
            <h3 className="text-2xl font-headline font-semibold">
              Nenhum perfume encontrado
            </h3>
            <p className="mt-2 text-muted-foreground">
              Tente ajustar seus filtros para encontrar o que procura.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setBrandFilter('all');
              }}
              className="mt-6"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
