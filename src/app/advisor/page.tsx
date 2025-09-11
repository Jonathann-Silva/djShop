
"use client";

import { useState, useEffect } from "react";
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
    .string({ required_error: "Please select a gender preference." })
    .min(1, "Please select a gender preference."),
  scentProfile: z
    .string({ required_error: "Please select a scent profile." })
    .min(1, "Please select a scent profile."),
  occasion: z
    .string({ required_error: "Please select an occasion." })
    .min(1, "Please select an occasion."),
  budget: z
    .string({ required_error: "Please select a budget." })
    .min(1, "Please select a budget."),
  additionalNotes: z.string().optional(),
});

export default function AiAdvisorPage() {
  const [recommendations, setRecommendations] =
    useState<AIPerfumeAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Perfume[]>([]);

  useEffect(() => {
      async function fetchProducts() {
          const products = await getProducts();
          setProducts(products);
      }
      fetchProducts();
  }, []);

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
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with our AI Advisor. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const findProduct = (name: string, brand: string) => {
    return products.find(p => p.name.toLowerCase() === name.toLowerCase() && p.brand.toLowerCase() === brand.toLowerCase());
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <Bot className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-headline font-bold mt-4">
          Your Personal Scent Advisor
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Answer a few questions and let our AI find the perfect fragrance for
          you.
        </p>
      </div>

      {!recommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Tell us what you like</CardTitle>
            <CardDescription>
              The more details you provide, the better the recommendations.
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
                        <FormLabel>Gender Preference</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="feminine">Feminine</SelectItem>
                            <SelectItem value="masculine">Masculine</SelectItem>
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
                        <FormLabel>Scent Profile</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a scent profile" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="floral">Floral</SelectItem>
                            <SelectItem value="woody">Woody</SelectItem>
                            <SelectItem value="oriental">Oriental</SelectItem>
                            <SelectItem value="fresh">Fresh</SelectItem>
                             <SelectItem value="spicy">Spicy</SelectItem>
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
                        <FormLabel>Occasion</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an occasion" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="casual">Casual / Everyday</SelectItem>
                            <SelectItem value="formal">Formal / Evening</SelectItem>
                            <SelectItem value="romantic">Romantic</SelectItem>
                            <SelectItem value="office">Office / Work</SelectItem>
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
                        <FormLabel>Budget</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a budget" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Under $100</SelectItem>
                            <SelectItem value="medium">$100 - $200</SelectItem>
                            <SelectItem value="high">Over $200</SelectItem>
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
                      <FormLabel>Additional Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'I love vanilla scents', 'Not too overpowering', 'Something for warm weather'"
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
                  disabled={isLoading}
                  className="w-full md:w-auto ml-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding your scent...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Recommendations
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
            <p className="mt-4 text-muted-foreground">Our AI is working its magic...</p>
        </div>
      )}

      {recommendations && (
        <div className="mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-headline font-bold">
              Your Personal Recommendations
            </h2>
            <p className="mt-2 text-muted-foreground">
              Based on your preferences, here are some scents you might love.
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
                  <p>
                    <span className="font-semibold">Notes:</span> {rec.notes}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> {rec.price}
                  </p>
                </CardContent>
                <CardFooter>
                  {product ? (
                     <Button className="w-full" onClick={() => addToCart(product)}>Add to Cart</Button>
                  ) : (
                    <Button className="w-full" variant="secondary" disabled>Unavailable</Button>
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
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
