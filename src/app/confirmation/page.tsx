import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">
            Thank You For Your Order!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your order has been placed successfully. A confirmation email has been sent (simulation).
          </p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
