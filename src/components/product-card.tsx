
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
      // If there's no URL to fetch from, or if fetch failed, we can't show a price.
      // Or we could show a "Price on request" message.
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
       <Link href={`/products/${product.id}`} className="flex-shrink-0">
        <CardHeader className="p-0">
          <div className="overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              width={400}
              height={600}
              data-ai-hint={imageHint}
              className="object-cover w-full h-[300px] md:h-[400px] transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 bg-card flex-grow">
        <Link href={`/products/${product.id}`}>
            <CardTitle className="text-lg font-headline tracking-tight">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
        </Link>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-card flex-shrink-0">
        <div className="text-lg font-semibold text-primary h-8 flex items-center">
         {isFetchingPrice ? (
             <Loader2 className="h-5 w-5 animate-spin" />
         ) : displayPrice !== null ? (
            `R$ ${displayPrice.toFixed(2)}`
         ) : (
            <span className="text-sm text-muted-foreground">Preço indisponível</span>
         )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddToCart}
          disabled={isFetchingPrice || displayPrice === null}
          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}
