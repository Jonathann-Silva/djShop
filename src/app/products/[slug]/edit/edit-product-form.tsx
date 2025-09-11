
"use client";

import React from "react";
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
import { useToast } from "@/hooks/use-toast";
import { updateProduct } from "@/lib/actions";

interface EditProductFormProps {
    product: Perfume;
    brands: string[];
    scentProfiles: string[];
    genders: string[];
}

export function EditProductForm({ product, brands, scentProfiles, genders }: EditProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Perfume>({
    defaultValues: product,
  });

  const onSubmit = async (data: Perfume) => {
    setIsSaving(true);
    const result = await updateProduct(data);
    setIsSaving(false);

    if (result.success) {
      toast({
        title: "Produto Atualizado!",
        description: result.message,
      });
      // This will now redirect to the new catalog page
      router.push("/catalogo");
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
            <Label>Marca</Label>
            <Controller
              name="brand"
              control={control}
              rules={{ required: "Marca é obrigatória" }}
              render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {brands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
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
                <Label htmlFor="price">Preço</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price", { required: "Preço é obrigatório", valueAsNumber: true })}
                />
                {errors.price && (
                    <p className="text-sm text-destructive">{errors.price.message}</p>
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
                <Label>Perfil Olfativo</Label>
                <Controller
                    name="scentProfile"
                    control={control}
                    rules={{ required: "Perfil olfativo é obrigatório" }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                  {scentProfiles.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.scentProfile && <p className="text-sm text-destructive">{errors.scentProfile.message}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notas Principais</Label>
            <Input
              id="notes"
              {...register("notes", { required: "Notas são obrigatórias" })}
            />
            {errors.notes && (
              <p className="text-sm text-destructive">{errors.notes.message}</p>
            )}
          </div>
          
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

      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSaving}>Cancelar</Button>
        <Button type="submit" disabled={isSaving}>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</Button>
      </CardFooter>
    </form>
  );
}
