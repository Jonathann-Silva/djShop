
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getProducts } from "@/lib/actions";
import type { Perfume } from "@/lib/products";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { getImageUrl } from "@/lib/products";

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Perfume[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Perfume[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getProducts();
      setProducts(allProducts);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleProductClick = (slug: string) => {
    router.push(`/products/${slug}`);
    setIsOpen(false);
  };
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);


  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="hidden md:inline-flex"
      >
        <Search className="h-5 w-5" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Pesquisar Produtos</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Digite o nome ou marca do perfume..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <ScrollArea className="h-[400px]">
            {filteredProducts.length > 0 ? (
              <div className="space-y-2 py-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-4 p-2 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <Image
                      src={getImageUrl(product.imageId, product)}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-sm object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.brand}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm.length > 1 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Nenhum produto encontrado.
              </p>
            ) : null}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
