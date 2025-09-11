
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Perfume } from "@/lib/products";
import { getProducts, getBrands, getGenders, getScentProfiles } from "@/lib/actions";
import { ProductCard } from "@/components/product-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


function FiltersSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-headline font-semibold">Filters</h3>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full mt-4" />
      </CardContent>
    </Card>
  );
}

function ProductsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-[400px] w-full" />
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
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Perfume[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [scentProfiles, setScentProfiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || "all");
  const [selectedScent, setSelectedScent] = useState("all");
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [productsData, brandsData, gendersData, scentProfilesData] = await Promise.all([
        getProducts(),
        getBrands(),
        getGenders(),
        getScentProfiles()
      ]);
      setProducts(productsData);
      setBrands(brandsData);
      setGenders(gendersData);
      setScentProfiles(scentProfilesData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesBrand =
        selectedBrand === "all" || product.brand === selectedBrand;
      const matchesGender =
        selectedGender === "all" || product.gender === selectedGender;
      const matchesScent =
        selectedScent === "all" || product.scentProfile === selectedScent;
      
      return (
        matchesSearch &&
        matchesBrand &&
        matchesGender &&
        matchesScent
      );
    });
  }, [products, searchTerm, selectedBrand, selectedGender, selectedScent]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setSelectedGender('all');
    setSelectedScent('all');
  }
  
  const genderDisplay: { [key: string]: string } = {
    Masculine: "Masculino",
    Feminine: "Feminino",
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          {loading ? <FiltersSkeleton /> : (
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-headline font-semibold">Filters</h3>
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Perfume name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Select
                    value={selectedBrand}
                    onValueChange={setSelectedBrand}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={selectedGender}
                    onValueChange={setSelectedGender}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Genders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {genderDisplay[gender]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Scent Profile</Label>
                  <Select
                    value={selectedScent}
                    onValueChange={setSelectedScent}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Scents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Scents</SelectItem>
                      {scentProfiles.map((scent) => (
                        <SelectItem key={scent} value={scent}>
                          {scent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="ghost" onClick={resetFilters} className="w-full">
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </aside>

        <main className="lg:col-span-3">
          {loading ? <ProductsSkeleton /> : 
            filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-muted/40 rounded-lg p-12 text-center">
                   <h3 className="text-2xl font-headline font-semibold">No Perfumes Found</h3>
                   <p className="mt-2 text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                   <Button onClick={resetFilters} className="mt-6">Clear Filters</Button>
              </div>
            )
          }
        </main>
      </div>
    </div>
  );
}
