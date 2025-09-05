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
import { Product, getCategories } from '@/lib/products';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { addProduct, updateProduct } from '@/actions/products';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const formSchema = z.object({
  name: z.string().min(2, 'O nome é obrigatório.'),
  description: z.string().min(10, 'A descrição é obrigatória.'),
  price: z.coerce.number().min(0, 'O preço deve ser positivo.'),
  priceMargin: z.coerce.number().min(0, 'A margem deve ser positiva.').optional(),
  category: z.string().min(2, 'A categoria é obrigatória.'),
  image: z.string().url('URL da imagem inválida.'),
  dataAiHint: z.string().optional(),
  onSale: z.boolean().default(false),
  colors: z.string().optional(),
  scrapingUrl: z.string().url('URL de monitoramento inválida.').optional().or(z.literal('')),
});

interface ProductFormProps {
  product?: Product | null;
  onSave?: () => void;
}

export function ProductForm({ product, onSave }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const categories = getCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          ...product,
          colors: product.colors ? product.colors.join(', ') : '',
          scrapingUrl: product.scrapingUrl || '',
          priceMargin: product.priceMargin || 0,
        }
      : {
          name: '',
          description: '',
          price: 0,
          priceMargin: 0,
          category: '',
          image: '',
          dataAiHint: '',
          onSale: false,
          colors: '',
          scrapingUrl: '',
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const colorsArray = values.colors
        ? values.colors.split(',').map((color) => color.trim())
        : [];

      const productData = { ...values, colors: colorsArray };

      if (product) {
        await updateProduct({ ...product, ...productData });
        toast({ title: 'Produto atualizado com sucesso!' });
      } else {
        await addProduct(productData);
        toast({ title: 'Produto adicionado com sucesso!' });
      }
      router.refresh();
      onSave?.(); // Chama a função para fechar o pop-up
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
                <FormLabel>Preço (Custo)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="priceMargin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Margem de Lucro (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Ex: 20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
          name="scrapingUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de Monitoramento de Preço</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cores (separadas por vírgula)</FormLabel>
              <FormControl>
                <Input placeholder="#FFFFFF, #000000, #FF0000" {...field} />
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
