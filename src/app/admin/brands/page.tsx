
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
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
import { Skeleton } from '@/components/ui/skeleton';
import { getBrands, addBrand } from '@/actions/brands';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'O nome da marca é obrigatório.'),
});

export default function BrandsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBrands() {
      setIsLoading(true);
      const fetchedBrands = await getBrands();
      setBrands(fetchedBrands);
      setIsLoading(false);
    }
    loadBrands();
  }, []);

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (!user || user.email !== 'admin@gmail.com') {
      router.replace('/');
    }
  }, [user, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addBrand(values.name);
      const fetchedBrands = await getBrands();
      setBrands(fetchedBrands);
      toast({ title: 'Marca adicionada com sucesso!' });
      form.reset();
      router.refresh();
    } catch (error) {
      toast({
        title: 'Erro ao adicionar marca',
        description:
          error instanceof Error ? error.message : 'Tente novamente.',
        variant: 'destructive',
      });
    }
  }

  if (user === undefined || isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-8 w-1/2" />
        <div className="flex gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!user || user.email !== 'admin@gmail.com') {
    return null;
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Marca</CardTitle>
            <CardDescription>
              Adicione uma nova marca para agrupar produtos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Marca</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Apple" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Adicionar</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Marcas Existentes</CardTitle>
                    <CardDescription>
                    Marcas usadas para agrupar produtos na vitrine.
                    </CardDescription>
                </div>
                <Button asChild variant="outline">
                  <Link href="/admin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Link>
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            {brands.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="text-base px-3 py-1">
                    {brand}
                    <button className="ml-2 text-muted-foreground hover:text-destructive" title="Excluir (desativado)">
                        <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma marca cadastrada ainda.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
