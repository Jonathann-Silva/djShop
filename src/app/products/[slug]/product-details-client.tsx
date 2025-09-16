
"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { Perfume } from "@/lib/products";
import { Minus, Plus, ShoppingCart, Sparkles, Droplet, Tag, Ruler, Loader2 } from "lucide-react";
import { getRealTimePrice } from "@/ai/flows/get-real-time-price-flow";

export function ProductDetailsClient({ product }: { product: Perfume }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [costPrice, setCostPrice] = useState<number | null>(null);
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      if (product.priceUrl) {
        setIsFetchingPrice(true);
        setFetchError(null);
        try {
          const result = await getRealTimePrice({ url: product.priceUrl });
          if (result && result.price !== null) {
            setCostPrice(result.price);
          } else {
            setFetchError(result.error || "Preço não encontrado.");
          }
        } catch (error: any) {
          console.error("Failed to fetch real-time price:", error);
          setFetchError(error.message || "Falha ao buscar preço.");
        } finally {
          setIsFetchingPrice(false);
        }
      }
    }
    fetchPrice();
  }, [product.priceUrl]);

  const displayPrice = useMemo(() => {
    if (!product.priceUrl || fetchError || costPrice === null) {
      return null; 
    }
    const margin = 1 + product.profitMargin / 100;
    return costPrice * margin;
  }, [costPrice, product.profitMargin, product.priceUrl, fetchError]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (displayPrice !== null) {
      const productWithPrice = { ...product, price: displayPrice };
      addToCart(productWithPrice, quantity);
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-primary">{product.brand}</p>
      <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
        {product.name}
      </h1>
      <div className="mt-4 h-10 flex items-center">
        {isFetchingPrice && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-lg text-muted-foreground">A obter o preço atual...</span>
          </div>
        )}
        {!isFetchingPrice && displayPrice !== null && (
          <p className="text-3xl font-light text-primary">
            R$ {displayPrice.toFixed(2)}
          </p>
        )}
        {!isFetchingPrice && (displayPrice === null || fetchError) && (
          <p className="text-lg text-destructive">{fetchError || 'Preço indisponível'}</p>
        )}
      </div>
      <p className="mt-6 text-lg text-foreground/80">{product.description}</p>

      <div className="mt-8 space-y-4">
         <div className="flex items-center gap-3">
          <Ruler className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Tamanho:</span>
          <span className="text-muted-foreground">{product.sizeMl}ml</span>
        </div>
        <div className="flex items-start gap-3">
          <Droplet className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            {product.topNotes && <p><span className="font-semibold">Topo:</span> <span className="text-muted-foreground">{product.topNotes}</span></p>}
            {product.heartNotes && <p><span className="font-semibold">Coração:</span> <span className="text-muted-foreground">{product.heartNotes}</span></p>}
            {product.baseNotes && <p><span className="font-semibold">Base:</span> <span className="text-muted-foreground">{product.baseNotes}</span></p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Ideal para:</span>
          <span className="text-muted-foreground">
            {product.gender === 'Masculine' ? 'Homens' : product.gender === 'Feminine' ? 'Mulheres' : 'Todos'}
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={() => handleQuantityChange(-1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            readOnly
            className="h-10 w-16 text-center text-lg font-bold"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          size="lg"
          className="flex-grow bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={handleAddToCart}
          disabled={isFetchingPrice || displayPrice === null}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
