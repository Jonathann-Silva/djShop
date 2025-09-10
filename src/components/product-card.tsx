'use client';

import { useEffect, useState } from 'react';
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
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { fetchProductPrice } from '@/actions/scraping';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product: initialProduct }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState(initialProduct);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  useEffect(() => {
    const syncPrice = async () => {
      if (product.scrapingUrl && product.price === 0) {
        setIsLoadingPrice(true);
        const result = await fetchProductPrice(product.scrapingUrl);
        if (result.price) {
          let finalPrice = result.price;
          if (product.priceMargin && product.priceMargin > 0) {
            finalPrice = finalPrice * (1 + product.priceMargin / 100);
          }
           setProduct(prev => ({ ...prev, price: finalPrice }));
        }
        setIsLoadingPrice(false);
      }
    };
    syncPrice();
  }, [product.scrapingUrl, product.price, product.priceMargin]);


  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Adicionado ao carrinho',
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };
  
  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const renderPrice = () => {
    if (isLoadingPrice) {
      return (
         <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Buscando preço...</span>
        </div>
      )
    }
     if (product.price > 0) {
      return <p className="text-base font-bold text-primary">{formatPrice(product.price)}</p>;
    }
    return <p className="text-xs text-muted-foreground">Preço indisponível</p>
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
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
        <CardTitle className="text-sm font-headline leading-tight h-10 line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="mt-1 text-xs line-clamp-2">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        {renderPrice()}
        {user ? (
          <Button onClick={handleAddToCart} size="sm" aria-label={`Adicionar ${product.name} ao carrinho`} disabled={isLoadingPrice || product.price === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">Faça login para comprar</p>
        )}
      </CardFooter>
    </Card>
  );
}
