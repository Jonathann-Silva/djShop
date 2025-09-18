
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { Perfume } from "@/lib/products";
import { Minus, Plus, ShoppingCart, Sparkles, Droplet, Ruler } from "lucide-react";

export function ProductDetailsClient({ product }: { product: Perfume }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (product.price) {
      addToCart(product, quantity);
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-primary">{product.brand}</p>
      <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
        {product.name}
      </h1>
      <div className="mt-4 h-10 flex items-center">
        {product.price ? (
          <p className="text-3xl font-light text-primary">
            R$ {product.price.toFixed(2)}
          </p>
        ) : (
          <p className="text-lg text-destructive">Preço indisponível</p>
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
          disabled={!product.price}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
