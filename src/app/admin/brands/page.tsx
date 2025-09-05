
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
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
import { getBrands, addBrand, removeBrand } from '@/actions/brands';
import { getCategories, addCategory, removeCategory } from '@/actions/categories';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const brandSchema = z.object({
  name: z.string().min(2, 'O nome da marca é obrigatório.'),
});
const categorySchema = z.object({
  name: z.string().min(2, 'O nome da categoria é obrigatório.'),
});

type BrandFormValues = z.infer<typeof brandSchema>;
type CategoryFormValues = z.infer<typeof categorySchema>;

export default function BrandsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [fetchedBrands, fetchedCategories] = await Promise.all([
      getBrands(),
      getCategories(),
    ]);
    setBrands(fetchedBrands);
    setCategories(fetchedCategories);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (user === undefined) return;
    if (!user || user.email !== 'admin@gmail.com') {
      router.replace('/');
    }
  }, [user, router]);

  const brandForm = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: { name: '' },
  });

  const categoryForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '' },
  });

  const handleAddBrand: SubmitHandler<BrandFormValues> = async (values) => {
    try {
      await addBrand(values.name);
      toast({ title: 'Marca adicionada com sucesso!' });
      brandForm.reset();
      await loadData();
    } catch (error) {
      toast({
        title: 'Erro ao adicionar marca',
        description: error instanceof Error ? error.message : 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveBrand = async (brandName: string) => {
    try {
      await removeBrand(brandName);
      toast({ title: `Marca "${brandName}" removida.` });
      await loadData();
    } catch (error) {
       toast({
        title: 'Erro ao remover marca',
        description: error instanceof Error ? error.message : 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleAddCategory: SubmitHandler<CategoryFormValues> = async (values) => {
    try {
      await addCategory(values.name);
      toast({ title: 'Categoria adicionada com sucesso!' });
      categoryForm.reset();
      await loadData();
    } catch (error) {
      toast({
        title: 'Erro ao adicionar categoria',
        description: error instanceof Error ? error.message : 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveCategory = async (categoryName: string) => {
    try {
      await removeCategory(categoryName);
      toast({ title: `Categoria "${categoryName}" removida.` });
      await loadData();
    } catch (error) {
       toast({
        title: 'Erro ao remover categoria',
        description: error instanceof Error ? error.message : 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  if (user === undefined || isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-8 w-1/2" />
        <div className="flex gap-2">
            <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!user || user.email !== 'admin@gmail.com') return null;

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Gerenciar Marcas e Categorias</h1>
            <Button asChild variant="outline">
                <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Produtos
                </Link>
            </Button>
        </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Card de Marcas */}
        <Card>
          <CardHeader>
            <CardTitle>Marcas</CardTitle>
            <CardDescription>
              Marcas usadas para agrupar produtos na vitrine.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Form {...brandForm}>
              <form onSubmit={brandForm.handleSubmit(handleAddBrand)} className="flex items-end gap-2">
                <FormField
                  control={brandForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Nova Marca</FormLabel>
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
            {brands.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-4">
                {brands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="text-base px-3 py-1 group">
                    {brand}
                    <button onClick={() => handleRemoveBrand(brand)} className="ml-2 text-muted-foreground opacity-50 group-hover:opacity-100 hover:text-destructive" title={`Excluir ${brand}`}>
                        <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground pt-4">
                Nenhuma marca cadastrada.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Card de Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
            <CardDescription>
              Categorias usadas para organizar os produtos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Form {...categoryForm}>
              <form onSubmit={categoryForm.handleSubmit(handleAddCategory)} className="flex items-end gap-2">
                <FormField
                  control={categoryForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Nova Categoria</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Celulares" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Adicionar</Button>
              </form>
            </Form>
            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-4">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-base px-3 py-1 group">
                    {category}
                    <button onClick={() => handleRemoveCategory(category)} className="ml-2 text-muted-foreground opacity-50 group-hover:opacity-100 hover:text-destructive" title={`Excluir ${category}`}>
                        <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground pt-4">
                Nenhuma categoria cadastrada.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
