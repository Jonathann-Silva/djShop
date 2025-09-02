'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/lib/products';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
        <CardDescription className="mt-2 text-sm line-clamp-2">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {user ? (
          <>
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <Button onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Login to see price</p>
        )}
      </CardFooter>
    </Card>
  );
}
