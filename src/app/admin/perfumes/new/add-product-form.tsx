
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Perfume } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { addProduct, getBrands } from "@/lib/actions";

// Using Omit to create a type for the form, which doesn't include the 'id'
type ProductFormValues = Omit<Perfume, 'id' | 'createdAt'>;

export function AddProductForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBrands() {
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
    }
    fetchBrands();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      brand: "",
      sizeMl: 0,
      gender: "Feminine",
      profitMargin: 0,
      description: "",
      topNotes: "",
      heartNotes: "",
      baseNotes: "",
      imageId: `perfume-${Math.floor(Math.random() * 100)}`,
      onSale: false,
      priceUrl: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSaving(true);
    const dataToSubmit = {
      ...data,
      profitMargin: Number(data.profitMargin) || 0,
      sizeMl: Number(data.sizeMl) || 0,
    };

    const result = await addProduct(dataToSubmit);
    setIsSaving(false);

    if (result.success) {
      toast({
        title: "Produto Adicionado!",
        description: result.message,
        duration: 2000,
      });
      router.push("/admin/perfumes");
      router.refresh(); 
    } else {
       toast({
        variant: "destructive",
        title: "Erro ao Salvar",
        description: result.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Perfume</Label>
            <Input
              id="name"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Marca</Label>
             <Controller
                name="brand"
                control={control}
                rules={{ required: "Marca é obrigatória" }}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="brand">
                            <SelectValue placeholder="Selecione uma marca" />
                        </SelectTrigger>
                        <SelectContent>
                            {brands.map(brand => (
                                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.brand && (
              <p className="text-sm text-destructive">{errors.brand.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            {...register("description", { required: "Descrição é obrigatória" })}
          />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="profitMargin">Margem de Lucro (%)</Label>
                <Input
                    id="profitMargin"
                    type="number"
                    step="1"
                    {...register("profitMargin", { required: "Margem de lucro é obrigatória", valueAsNumber: true })}
                />
                {errors.profitMargin && (
                    <p className="text-sm text-destructive">{errors.profitMargin.message}</p>
                )}
            </div>
            <div className="space-y-2">
              <Label>Gênero</Label>
              <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gênero é obrigatório" }}
                  render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Masculine">Masculino</SelectItem>
                              <SelectItem value="Feminine">Feminino</SelectItem>
                          </SelectContent>
                      </Select>
                  )}
              />
              {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sizeMl">ml</Label>
                 <Input
                    id="sizeMl"
                    type="number"
                    {...register("sizeMl", { required: "Tamanho (ml) é obrigatório", valueAsNumber: true })}
                />
                {errors.sizeMl && <p className="text-sm text-destructive">{errors.sizeMl.message}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="topNotes">Notas de Topo</Label>
            <Textarea
              id="topNotes"
              {...register("topNotes")}
               placeholder="Ex: Bergamota, Limão, Lavanda"
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="heartNotes">Notas de Coração</Label>
            <Textarea
              id="heartNotes"
              {...register("heartNotes")}
               placeholder="Ex: Jasmim, Rosa, Pimenta Preta"
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="baseNotes">Notas de Base</Label>
            <Textarea
              id="baseNotes"
              {...register("baseNotes")}
              placeholder="Ex: Sândalo, Patchouli, Baunilha"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="priceUrl">URL de Preço</Label>
                <Input
                id="priceUrl"
                {...register("priceUrl")}
                placeholder="https://example.com/product/perfume"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                id="imageUrl"
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
                />
            </div>
          </div>

        <div className="flex items-center space-x-2">
            <Controller
                name="onSale"
                control={control}
                render={({ field }) => (
                     <Switch
                        id="onSale"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                )}
            />
            <Label htmlFor="onSale">Produto em promoção</Label>
        </div>


      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSaving}>Cancelar</Button>
        <Button type="submit" disabled={isSaving}>{isSaving ? 'Salvando...' : 'Adicionar Produto'}</Button>
      </CardFooter>
    </form>
  );
}
