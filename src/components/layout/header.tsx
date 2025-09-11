
"use client";

import Link from "next/link";
import { useState } from "react";
import { Flame, User, ShoppingCart, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getImageUrl } from "@/lib/products";
import { SearchDialog } from "@/components/search-dialog";

export function Header() {
  const { cartItems, totalItems, totalPrice, removeFromCart } = useCart();
  const { user } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">
            DJ Shop
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/catalogo"
            className="transition-colors hover:text-primary"
          >
            Perfumes
          </Link>
          <Link
            href="/advisor"
            className="transition-colors hover:text-primary"
          >
            Consultor AI
          </Link>
          {user?.email === 'admin@gmail.com' && (
            <Link
              href="/products" 
              className="transition-colors hover:text-primary flex items-center gap-1"
            >
              <Wrench className="h-4 w-4" />
              Produtos
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <SearchDialog />
          <Link href={user ? "/account" : "/login"}>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Carrinho de Compras</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                {cartItems.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    O seu carrinho está vazio.
                  </p>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex gap-4">
                          <Image
                            src={getImageUrl(item.product.imageId, item.product)}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-grow">
                            <p className="font-semibold">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantidade: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>R$ {totalPrice.toFixed(2)}</span>
                      </div>
                      <Link href="/cart" className="block" onClick={() => setIsSheetOpen(false)}>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                           Ir para o Carrinho
                        </Button>
                      </Link>
                      <Link href="/checkout" className="block" onClick={() => setIsSheetOpen(false)}>
                         <Button variant="outline" className="w-full bg-accent hover:bg-accent/90">
                           Finalizar Compra
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
