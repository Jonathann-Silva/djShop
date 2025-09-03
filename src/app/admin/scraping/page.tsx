
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchProductPrice } from '@/actions/scraping';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  url: z.string().url('Por favor, insira uma URL válida.'),
});

export default function ScrapingPage() {
  const [result, setResult] = useState<{ price: string | null; error: string | null } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const scrapingResult = await fetchProductPrice(values.url);
    setResult(scrapingResult);
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoramento de Preço (Teste)</CardTitle>
        <CardDescription>
          Cole a URL de um produto de outro site para tentar extrair o preço.
          Isso é uma prova de conceito e pode não funcionar para todos os sites.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.exemplo.com/produto-xyz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Buscando...' : 'Buscar Preço'}
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-6">
            {result.price && (
              <Alert variant="default">
                <AlertTitle>Preço Encontrado!</AlertTitle>
                <AlertDescription className="text-2xl font-bold">
                  {result.price}
                </AlertDescription>
              </Alert>
            )}
            {result.error && (
              <Alert variant="destructive">
                <AlertTitle>Erro ao Buscar</AlertTitle>
                <AlertDescription>{result.error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
