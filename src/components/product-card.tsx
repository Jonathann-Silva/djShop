"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
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

interface ProductCardProps {
  product: Perfume;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const imageUrl = getImageUrl(product.imageId, product);
  const imageHint = getImageHint(product.imageId);

  return (
    <Card className="group overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl w-full">
       <Link href={`/products/${product.id}`}>
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
      <CardContent className="p-4 bg-card">
        <Link href={`/products/${product.id}`}>
            <CardTitle className="text-lg font-headline tracking-tight">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
        </Link>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-card">
        <p className="text-lg font-semibold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addToCart(product)}
          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}
