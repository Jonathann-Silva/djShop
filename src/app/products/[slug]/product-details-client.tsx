
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { Perfume } from "@/lib/products";
import { Minus, Plus, ShoppingCart, Sparkles, Droplet, Tag, Loader2 } from "lucide-react";
import { getRealTimePrice } from "@/ai/flows/get-real-time-price-flow";

export function ProductDetailsClient({ product }: { product: Perfume }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [realTimePrice, setRealTimePrice] = useState<number | null>(null);
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);

  useEffect(() => {
    async function fetchPrice() {
      if (product.priceUrl) {
        setIsFetchingPrice(true);
        try {
          const result = await getRealTimePrice({ url: product.priceUrl });
          if (result && result.price) {
            setRealTimePrice(result.price);
          }
        } catch (error) {
          console.error("Failed to fetch real-time price:", error);
          // Fallback to static price if AI fetch fails
          setRealTimePrice(product.price);
        } finally {
          setIsFetchingPrice(false);
        }
      }
    }
    fetchPrice();
  }, [product.priceUrl, product.price]);


  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  
  const displayPrice = realTimePrice ?? product.price;

  return (
    <div>
      <p className="text-sm font-medium text-primary">{product.brand}</p>
      <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
        {product.name}
      </h1>
      <div className="mt-4 h-10 flex items-center">
        {isFetchingPrice ? (
            <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-lg text-muted-foreground">A obter o preço atual...</span>
            </div>
        ) : (
             <p className="text-3xl font-light text-primary">
                ${displayPrice.toFixed(2)}
             </p>
        )}
      </div>
      <p className="mt-6 text-lg text-foreground/80">{product.description}</p>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <Tag className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Perfil Olfativo:</span>
          <span className="text-muted-foreground">{product.scentProfile}</span>
        </div>
        <div className="flex items-center gap-3">
          <Droplet className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Notas Principais:</span>
          <span className="text-muted-foreground">{product.notes}</span>
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
          onClick={() => addToCart({ ...product, price: displayPrice }, quantity)}
          disabled={isFetchingPrice}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
