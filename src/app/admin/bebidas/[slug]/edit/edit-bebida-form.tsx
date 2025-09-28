
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Bebida } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { updateBebida, getBrands } from "@/lib/actions";

interface EditBebidaFormProps {
  product: Bebida;
}

export function EditBebidaForm({ product }: EditBebidaFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error);
        toast({
          variant: "destructive",
          title: "Erro ao Carregar Marcas",
          description: "Não foi possível carregar as marcas no momento.",
        });
      }
    }
    fetchBrands();
  }, [toast]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Bebida>({
    defaultValues: product,
  });

  const onSubmit = async (data: Bebida) => {
    setIsSaving(true);

    const dataToSubmit: Bebida = {
      ...data,
      profitMargin: Number(data.profitMargin) || 0,
    };

    try {
      const result = await updateBebida(dataToSubmit);
      setIsSaving(false);

      if (result.success) {
        toast({
          title: "Bebida Atualizada!",
          description: result.message,
          duration: 3000,
        });
        router.push("/admin/bebidas");
        router.refresh(); 
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao Salvar",
          description: result.message || "Ocorreu um erro inesperado.",
        });
      }
    } catch (error) {
      setIsSaving(false);
      toast({
        variant: "destructive",
        title: "Erro ao Salvar",
        description: "Ocorreu um erro inesperado ao tentar salvar o produto.",
      });
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Bebida</Label>
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
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
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
              {...register("profitMargin", { 
                  required: "Margem de lucro é obrigatória", 
                  valueAsNumber: true,
                  validate: value => !isNaN(value) || "Deve ser um número"
              })}
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
              placeholder="https://example.com/product/bebida"
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
              <Switch id="onSale" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <Label htmlFor="onSale">Produto em promoção</Label>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSaving}>Cancelar</Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </CardFooter>
    </form>
  );
}
