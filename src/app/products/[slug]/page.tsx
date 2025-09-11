"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getImageUrl, getImageHint } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, ShoppingCart, Sparkles, Droplet, Tag } from "lucide-react";
import { ProductCard } from "@/components/product-card";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (p) => p.scentProfile === product.scentProfile && p.id !== product.id
    )
    .slice(0, 4);
    
  const imageUrl = getImageUrl(product.imageId);
  const imageHint = getImageHint(product.imageId);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="sticky top-24">
          <Image
            src={imageUrl}
            alt={product.name}
            width={600}
            height={800}
            data-ai-hint={imageHint}
            className="rounded-lg object-cover w-full shadow-lg"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-primary">{product.brand}</p>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
            {product.name}
          </h1>
          <p className="text-3xl font-light text-primary mt-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-6 text-lg text-foreground/80">
            {product.description}
          </p>

          <div className="mt-8 space-y-4">
             <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Scent Profile:</span>
                <span className="text-muted-foreground">{product.scentProfile}</span>
            </div>
             <div className="flex items-center gap-3">
                <Droplet className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Key Notes:</span>
                <span className="text-muted-foreground">{product.notes}</span>
            </div>
             <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Best for:</span>
                <span className="text-muted-foreground">{product.gender} wearers</span>
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
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
       {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </section>
       )}
    </div>
  );
}
