'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';
import { CheckoutForm } from '@/components/checkout-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, getTotal } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, router]);

  if (user === undefined) {
    return (
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <Skeleton className="h-8 w-1/3 mb-4" />
                <div className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-12 w-full mt-4" />
                </div>
            </div>
            <div>
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    );
  }

  if (!user) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold font-headline mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-4">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Button asChild>
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-12">
      <div className="md:col-span-3">
        <h1 className="text-3xl font-bold font-headline mb-6">Shipping Details</h1>
        <CheckoutForm />
      </div>
      <div className="md:col-span-2">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span>
                  {item.name} <span className="text-muted-foreground">x {item.quantity}</span>
                </span>
                <span className='font-medium'>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
