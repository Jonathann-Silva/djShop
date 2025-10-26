
"use client";

import { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
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
import { CreditCard, Lock, Truck, PartyPopper, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { sendTelegramNotification, createOrder } from "@/lib/actions";

export default function CheckoutPage() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [installments, setInstallments] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const grandTotal = useMemo(() => {
    // Placeholder for future interest rate logic
    // For now, no interest is applied.
    return totalPrice;
  }, [totalPrice, paymentMethod, installments]);

  const getPaymentMethodString = () => {
    if (paymentMethod === 'Cartão de Crédito') {
        if (installments === 1) {
            return 'Crédito à vista';
        }
        return `Crédito parcelado ${installments}x`;
    }
    return paymentMethod;
  }


  const handlePlaceOrder = async () => {
    // Basic validation
    if (!firstName || !address || !number || !city || !phone || !paymentMethod) {
      toast({
        variant: "destructive",
        title: "Campos em falta",
        description: "Por favor, preencha todas as informações de envio e pagamento.",
      });
      return;
    }
     if (paymentMethod === 'Cartão de Crédito' && !installments) {
        toast({
            variant: "destructive",
            title: "Campos em falta",
            description: "Por favor, selecione o número de parcelas.",
        });
        return;
    }


    setIsProcessing(true);
    
    const finalPaymentMethod = getPaymentMethodString();

    const productsSummary = cartItems.map(item => 
        `- ${item.product.name} (x${item.quantity}) - R$ ${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    let message = `🎉 *Novo Pedido Recebido!* 🎉\n\n`;
    message += `*Cliente:* ${firstName} ${lastName}\n`;
    message += `*Telefone:* ${phone}\n`;
    message += `*Endereço de Entrega:* ${address}, nº ${number}, ${city} - ${zip}\n\n`;
    message += `*Itens do Pedido:*\n`;
    message += `${productsSummary}\n\n`;
    message += `*Forma de Pagamento:* ${finalPaymentMethod}\n`;
    message += `*Valor Total:* R$ ${grandTotal.toFixed(2)}`;
    
    // Create order in Firestore
    const orderData = {
      customerName: `${firstName} ${lastName}`,
      address: `${address}, nº ${number}, ${city} - ${zip}`,
      phone: phone,
      items: cartItems.map(item => ({ 
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          category: item.product.category || 'perfume'
      })),
      paymentMethod: finalPaymentMethod,
      total: grandTotal,
      status: 'Pendente' as 'Pendente' | 'Entregue',
    };

    const orderResult = await createOrder(orderData);

    if (!orderResult.success) {
      toast({
        variant: "destructive",
        title: "Erro ao Salvar Pedido",
        description: orderResult.message || "Não foi possível salvar seu pedido no banco de dados.",
      });
      setIsProcessing(false);
      return;
    }
    
    // Send Telegram notification
    const telegramResult = await sendTelegramNotification(message);

    if (telegramResult.success) {
      setOrderPlaced(true);
      clearCart();
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao Finalizar Pedido",
        description: telegramResult.message || "Não foi possível enviar seu pedido. Por favor, tente novamente.",
      });
    }

    setIsProcessing(false);
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <PartyPopper className="mx-auto h-24 w-24 text-green-500" />
        <h1 className="mt-8 text-4xl font-headline font-bold">Pedido Realizado com Sucesso!</h1>
        <p className="mt-4 text-muted-foreground">
          Recebemos o seu pedido e entraremos em contato em breve para confirmar os detalhes. Obrigado por comprar conosco!
        </p>
        <Button asChild className="mt-8 bg-primary hover:bg-primary/90">
          <Link href="/">Voltar para a Página Inicial</Link>
        </Button>
      </div>
    );
  }

  if (totalItems === 0 && !orderPlaced) {
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
            <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="space-y-2 col-span-6 md:col-span-3">
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2 col-span-6 md:col-span-3">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="space-y-2 col-span-6 md:col-span-4">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua das Flores" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="space-y-2 col-span-6 md:col-span-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" placeholder="123" value={number} onChange={(e) => setNumber(e.target.value)} />
              </div>
              <div className="space-y-2 col-span-6 md:col-span-3">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Cidade das Essências" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="space-y-2 col-span-6 md:col-span-3">
                <Label htmlFor="zip">Cep</Label>
                <Input id="zip" placeholder="12345-678" value={zip} onChange={(e) => setZip(e.target.value)} />
              </div>
               <div className="space-y-2 col-span-6">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" placeholder="(11) 98765-4321" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Formas de pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um método de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="Pix">Pix</SelectItem>
                  <SelectItem value="Débito">Débito</SelectItem>
                  <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                </SelectContent>
              </Select>
              {paymentMethod === 'Cartão de Crédito' && (
                <div className="space-y-2">
                    <Label htmlFor="installments">Parcelas</Label>
                    <Select onValueChange={(value) => setInstallments(Number(value))} value={String(installments)}>
                        <SelectTrigger id="installments">
                            <SelectValue placeholder="Selecione o número de parcelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1x (à vista)</SelectItem>
                            {Array.from({ length: 11 }, (_, i) => i + 2).map(num => (
                                <SelectItem key={num} value={String(num)}>{num}x</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
              )}
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
              <Button onClick={handlePlaceOrder} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A processar...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" /> Finalizar Encomenda
                  </>
                )}
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

    