
"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  aiPerfumeAdvisor,
  AIPerfumeAdvisorInput,
  AIPerfumeAdvisorOutput,
} from "@/ai/flows/ai-perfume-advisor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import type { Perfume } from "@/lib/products";
import { getProducts } from "@/lib/actions";

const formSchema = z.object({
  genderPreference: z
    .string({ required_error: "Por favor, selecione uma preferência de gênero." })
    .min(1, "Por favor, selecione uma preferência de gênero."),
  scentProfile: z
    .string({ required_error: "Por favor, selecione um perfil olfativo." })
    .min(1, "Por favor, selecione um perfil olfativo."),
  occasion: z
    .string({ required_error: "Por favor, selecione uma ocasião." })
    .min(1, "Por favor, selecione uma ocasião."),
  budget: z
    .string({ required_error: "Por favor, selecione um orçamento." })
    .min(1, "Por favor, selecione um orçamento."),
  additionalNotes: z.string().optional(),
});

export default function AiAdvisorPage() {
  const [recommendations, setRecommendations] =
    useState<AIPerfumeAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Perfume[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);


  useEffect(() => {
      async function fetchProducts() {
          const products = await getProducts();
          setProducts(products);
          setProductsLoaded(true);
      }
      fetchProducts();
  }, []);

  const productsMap = useMemo(() => {
    const map = new Map<string, Perfume>();
    products.forEach(p => map.set(`${p.name.toLowerCase()}-${p.brand.toLowerCase()}`, p));
    return map;
  }, [products]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genderPreference: "",
      scentProfile: "",
      occasion: "",
      budget: "",
      additionalNotes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await aiPerfumeAdvisor(values as AIPerfumeAdvisorInput);
      setRecommendations(result);
    } catch (error) {
      console.error("AI Advisor Error:", error);
      toast({
        variant: "destructive",
        title: "Oh não! Algo correu mal.",
        description:
          "Houve um problema com o nosso Consultor de IA. Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const findProduct = (name: string, brand: string) => {
    return productsMap.get(`${name.toLowerCase()}-${brand.toLowerCase()}`);
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <Bot className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-headline font-bold mt-4">
          O seu Consultor Pessoal de Perfumes
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Responda a algumas perguntas e deixe a nossa IA encontrar a fragrância perfeita para si.
        </p>
      </div>

      {!recommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Diga-nos do que gosta</CardTitle>
            <CardDescription>
              Quanto mais detalhes fornecer, melhores serão as recomendações.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="genderPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferência de Gênero</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma preferência" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="feminine">Feminino</SelectItem>
                            <SelectItem value="masculine">Masculino</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="scentProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Perfil Olfativo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um perfil olfativo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="floral">Floral</SelectItem>
                            <SelectItem value="woody">Amadeirado</SelectItem>
                            <SelectItem value="oriental">Oriental</SelectItem>
                            <SelectItem value="fresh">Fresco</SelectItem>
                             <SelectItem value="spicy">Especiado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="occasion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ocasião</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma ocasião" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="casual">Casual / Dia a dia</SelectItem>
                            <SelectItem value="formal">Formal / Noite</SelectItem>
                            <SelectItem value="romantic">Romântico</SelectItem>
                            <SelectItem value="office">Escritório / Trabalho</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Orçamento</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um orçamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Menos de R$100</SelectItem>
                            <SelectItem value="medium">R$100 - R$200</SelectItem>
                            <SelectItem value="high">Mais de R$200</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas Adicionais (opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ex: 'Adoro aromas de baunilha', 'Não muito forte', 'Algo para clima quente'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isLoading || !productsLoaded}
                  className="w-full md:w-auto ml-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      A encontrar o seu perfume...
                    </>
                  ) : !productsLoaded ? (
                     <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      A carregar produtos...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Obter Recomendações
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {isLoading && !recommendations && (
        <div className="text-center mt-8">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">A nossa IA está a fazer a sua magia...</p>
        </div>
      )}

      {recommendations && (
        <div className="mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-headline font-bold">
              As suas Recomendações Pessoais
            </h2>
            <p className="mt-2 text-muted-foreground">
              Com base nas suas preferências, aqui estão alguns aromas que pode adorar.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.recommendations.map((rec, index) => {
              const product = findProduct(rec.name, rec.brand);
              return(
              <Card key={index} className="overflow-hidden">
                {product && 
                  <Image src={`https://picsum.photos/seed/${product.imageId}/400/250`} alt={rec.name} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint="perfume bottle" />
                }
                <CardHeader>
                  <CardTitle className="font-headline">{rec.name}</CardTitle>
                  <CardDescription>{rec.brand}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>{rec.description}</p>
                  <div>
                    <p><span className="font-semibold">Notas:</span> {rec.notes}</p>
                  </div>
                  <p>
                    <span className="font-semibold">Preço:</span> {rec.price}
                  </p>
                </CardContent>
                <CardFooter>
                  {product ? (
                     <Button className="w-full" onClick={() => addToCart(product)}>Adicionar ao Carrinho</Button>
                  ) : (
                    <Button className="w-full" variant="secondary" disabled>Indisponível</Button>
                  )}
                </CardFooter>
              </Card>
            )})}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => {
                setRecommendations(null);
                form.reset();
              }}
            >
              Começar de Novo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
