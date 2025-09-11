
import Image from "next/image";
import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";

import { getProducts } from "@/lib/actions";
import { getHeroImageUrl, getHeroImageHint } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);
  const heroImageUrl = getHeroImageUrl();
  const heroImageHint = getHeroImageHint();

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        <Image
          src={heroImageUrl}
          alt="Coleção de perfumes de luxo"
          fill
          priority
          data-ai-hint={heroImageHint}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center p-8 md:p-12">
          <div className="bg-background/80 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter">
              Galeria Essenza
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
              Revele a sua essência. Descubra um mundo curado de fragrâncias finas
              que contam a sua história única.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/catalogo">
                Explorar A Coleção <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Coleção em Destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <Card className="overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <CardHeader>
                  <Bot className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-3xl font-headline">
                    Conheça o seu Consultor de Perfumes Pessoal
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Não consegue decidir? Deixe o nosso consultor alimentado por IA guiá-lo.
                    Responda a algumas perguntas simples e receba recomendações personalizadas de perfumes
                    feitas à medida para si.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href="/advisor">
                      Encontrar o Meu Perfume
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
              <div className="hidden md:block">
                <Image
                  src="https://picsum.photos/seed/ai-advisor/600/600"
                  alt="Consultor de Perfumes AI"
                  width={600}
                  height={600}
                  data-ai-hint="futuristic abstract"
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
