
"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Perfume, getImageUrl, getImageHint } from "@/lib/products";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState, useMemo } from "react";
import { getRealTimePrice } from "@/ai/flows/get-real-time-price-flow";

interface ProductCardProps {
  product: Perfume;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const imageUrl = getImageUrl(product.imageId, product);
  const imageHint = getImageHint(product.imageId);

  const [costPrice, setCostPrice] = useState<number | null>(null);
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);
  
  useEffect(() => {
    async function fetchPrice() {
      if (product.priceUrl) {
        setIsFetchingPrice(true);
        try {
          const result = await getRealTimePrice({ url: product.priceUrl });
          if (result && result.price) {
            setCostPrice(result.price);
          }
        } catch (error) {
          console.error("Failed to fetch real-time price for card:", error);
          setCostPrice(null);
        } finally {
          setIsFetchingPrice(false);
        }
      }
    }
    // Only fetch if there's a URL
    if(product.priceUrl) {
        fetchPrice();
    }
  }, [product.priceUrl]);

  const displayPrice = useMemo(() => {
    if (!product.priceUrl || costPrice === null) {
      return null;
    }
    const margin = 1 + product.profitMargin / 100;
    return costPrice * margin;
  }, [costPrice, product.profitMargin, product.priceUrl]);


  const handleAddToCart = () => {
    if (displayPrice !== null) {
        const productWithPrice = {...product, price: displayPrice};
        addToCart(productWithPrice)
    }
  }


  return (
    <Card className="group overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl w-full flex flex-col">
       <Link href={`/products/${product.id}`} className="flex-shrink-0 relative">
        <CardHeader className="p-0">
          <div className="overflow-hidden">
             {product.onSale && (
              <div className="absolute top-2 right-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                Promoção
              </div>
            )}
            <Image
              src={imageUrl}
              alt={product.name}
              width={400}
              height={400}
              data-ai-hint={imageHint}
              className="object-cover w-full h-auto aspect-square transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-2 bg-card flex-grow flex flex-col">
        <Link href={`/products/${product.id}`} className="flex-grow">
            <CardTitle className="text-base font-headline leading-tight tracking-tight">{product.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
        </Link>
         <p className="text-xs text-muted-foreground mt-1">{product.sizeMl}ml</p>
      </CardContent>
      <CardFooter className="p-3 flex justify-between items-center bg-card flex-shrink-0">
        <div className="text-lg font-semibold text-primary h-8 flex items-center">
         {isFetchingPrice && <Loader2 className="h-4 w-4 animate-spin" />}
         {!isFetchingPrice && displayPrice !== null && `R$ ${displayPrice.toFixed(2)}`}
         {!isFetchingPrice && displayPrice === null && (
            <span className="text-xs text-muted-foreground">Preço indisponível</span>
         )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddToCart}
          disabled={isFetchingPrice || displayPrice === null}
          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs px-3 h-9"
        >
          <ShoppingCart className="mr-1 h-4 w-4" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}
