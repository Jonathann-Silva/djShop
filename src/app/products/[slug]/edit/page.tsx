
"use client";

import { notFound, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { products, Perfume, brands, scentProfiles, genders } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

export default function EditProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const product = products.find((p) => p.id === params.slug);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Perfume>({
    defaultValues: product,
  });

  if (!product) {
    notFound();
  }

  const onSubmit = (data: Perfume) => {
    // In a real application, you would send this data to your API to update the product.
    // For this prototype, we'll just show a success message and navigate back.
    console.log("Updated product data:", data);
    toast({
      title: "Produto Atualizado!",
      description: `O perfume "${data.name}" foi atualizado com sucesso.`,
    });
    router.push("/products");
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Editar Produto: {product.name}</CardTitle>
        </CardHeader>
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

          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit">Salvar Alterações</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
