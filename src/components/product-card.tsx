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
import { Badge } from './ui/badge';

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
      title: 'Adicionado ao carrinho',
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.dataAiHint}
          />
          {product.onSale && (
            <Badge className="absolute top-2 right-2" variant="destructive">
              Promoção
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 flex-grow">
        <CardTitle className="text-base font-headline leading-tight">{product.name}</CardTitle>
        <CardDescription className="mt-1 text-xs line-clamp-2">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        {user ? (
          <>
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
            <Button onClick={handleAddToCart} size="sm" aria-label={`Adicionar ${product.name} ao carrinho`}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">Faça login para ver o preço</p>
        )}
      </CardFooter>
    </Card>
  );
}
