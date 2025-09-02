'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/products';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { addProduct, updateProduct } from '@/actions/products';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, 'O nome é obrigatório.'),
  description: z.string().min(10, 'A descrição é obrigatória.'),
  price: z.coerce.number().min(0, 'O preço deve ser positivo.'),
  category: z.string().min(2, 'A categoria é obrigatória.'),
  image: z.string().url('URL da imagem inválida.'),
  dataAiHint: z.string().optional(),
  onSale: z.boolean().default(false),
});

interface ProductFormProps {
  product?: Product | null;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          ...product,
        }
      : {
          name: '',
          description: '',
          price: 0,
          category: '',
          image: '',
          dataAiHint: '',
          onSale: false,
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (product) {
        await updateProduct({ ...product, ...values });
        toast({ title: 'Produto atualizado com sucesso!' });
      } else {
        await addProduct(values);
        toast({ title: 'Produto adicionado com sucesso!' });
      }
      router.refresh();
      // TODO: Fechar o Dialog
    } catch (error) {
      toast({
        title: 'Erro ao salvar o produto',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Smartphone X Pro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva o produto..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Celulares" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Imagem</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="onSale"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Em promoção?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {product ? 'Salvar Alterações' : 'Adicionar Produto'}
        </Button>
      </form>
    </Form>
  );
}
