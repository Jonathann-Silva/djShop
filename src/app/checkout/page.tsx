
"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getImageUrl } from "@/lib/products";
import { CreditCard, Lock, Truck } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const { toast } = useToast();

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const grandTotal = totalPrice;

  if (totalItems === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="mt-8 text-4xl font-headline font-bold">O seu carrinho está vazio</h1>
        <p className="mt-4 text-muted-foreground">
          Não pode finalizar a compra sem itens.
        </p>
        <Button asChild className="mt-8 bg-primary hover:bg-primary/90">
          <Link href="/catalogo/perfumes">Começar a comprar</Link>
        </Button>
      </div>
    );
  }
  
  const handlePlaceOrder = () => {
    // Basic validation
    if (!firstName || !lastName || !address || !paymentMethod) {
      toast({
        variant: "destructive",
        title: "Campos em falta",
        description: "Por favor, preencha todas as informações de envio e pagamento.",
      });
      return;
    }
    
    // --- Substitua pelo seu número de WhatsApp com o código do país (ex: 5511999999999) ---
    const yourWhatsAppNumber = "5511999999999"; 
    // ---------------------------------------------------------------------------------

    const productsSummary = cartItems.map(item => 
        `- ${item.product.name} (x${item.quantity}) - R$ ${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    let message = `Olá! Gostaria de fazer um novo pedido:\n\n`;
    message += `*Cliente:* ${firstName} ${lastName}\n`;
    message += `*Endereço de Entrega:* ${address}, ${city} - ${zip}\n\n`;
    message += `*Itens do Pedido:*\n`;
    message += `${productsSummary}\n\n`;
    message += `*Forma de Pagamento:* ${paymentMethod}\n`;
    message += `*Valor Total:* R$ ${grandTotal.toFixed(2)}\n\n`;
    message += `Aguardando confirmação. Obrigado!`;

    const whatsappUrl = `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    
    // Clear cart and redirect
    clearCart();
    window.open(whatsappUrl, '_blank');
  };


  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-headline font-bold mb-8 text-center">
        Finalizar Compra
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Informação de Envio
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Primeiro Nome</Label>
                <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Último Nome</Label>
                <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua das Flores, 123" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Cidade das Essências" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Código Postal</Label>
                <Input id="zip" placeholder="12345-678" value={zip} onChange={(e) => setZip(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Formas de pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um método de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="Pix">Pix</SelectItem>
                  <SelectItem value="Débito">Débito</SelectItem>
                  <SelectItem value="Crédito à vista">Crédito à vista</SelectItem>
                  <SelectItem value="Crédito 2x">Crédito parcelado 2x</SelectItem>
                  <SelectItem value="Crédito 3x">Crédito parcelado 3x</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo da Encomenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={getImageUrl(item.product.imageId, item.product)}
                        alt={item.product.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-sm">
                        {item.product.name}
                      </p>
                    </div>
                    <p className="text-sm">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button onClick={handlePlaceOrder} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Lock className="mr-2 h-4 w-4" /> Finalizar Encomenda
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Ao finalizar a sua encomenda, concorda com os nossos termos e condições.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
