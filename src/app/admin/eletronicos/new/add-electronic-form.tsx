
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Eletronico } from "@/lib/products";
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
import { addElectronic, getBrands } from "@/lib/actions";

type ElectronicFormValues = Omit<Eletronico, 'id' | 'createdAt'>;

export function AddElectronicForm() {
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
  } = useForm<ElectronicFormValues>({
    defaultValues: {
      name: "",
      brand: "",
      profitMargin: 0,
      description: "",
      imageId: `eletronic-${Math.floor(Math.random() * 100)}`,
      onSale: false,
      priceUrl: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: ElectronicFormValues) => {
    setIsSaving(true);
    const dataToSubmit = {
      ...data,
      profitMargin: Number(data.profitMargin) || 0,
    };

    const result = await addElectronic(dataToSubmit);
    setIsSaving(false);

    if (result.success) {
      toast({
        title: "Eletrônico Adicionado!",
        description: result.message,
        duration: 2000,
      });
      router.push("/admin/eletronicos");
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
            <Label htmlFor="name">Nome do Eletrônico</Label>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="priceUrl">URL de Preço</Label>
                <Input
                id="priceUrl"
                {...register("priceUrl")}
                placeholder="https://example.com/product/electronic"
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
        <Button type="submit" disabled={isSaving}>{isSaving ? 'Salvando...' : 'Adicionar Eletrônico'}</Button>
      </CardFooter>
    </form>
  );
}
