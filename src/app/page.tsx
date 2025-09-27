
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const categories = [
    {
      name: "Perfumes",
      href: "/catalogo/perfumes",
      imageUrl: "https://picsum.photos/seed/perfumes-category/800/600",
      imageHint: "perfume bottle collection",
      description: "Fragrâncias que definem sua personalidade.",
    },
    {
      name: "Bebidas",
      href: "/catalogo/bebidas",
      imageUrl: "/bebidas.png",
      imageHint: "luxury drinks bottles",
      description: "Sabores requintados para momentos especiais.",
    },
    {
      name: "Eletrônicos",
      href: "/catalogo/eletronicos",
      imageUrl: "/eletronicos.png",
      imageHint: "modern electronic gadgets",
      description: "Tecnologia de ponta para o seu dia a dia.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tighter">
          Como podemos atender você?
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80 mx-auto">
          Explore nossas coleções exclusivas e encontre exatamente o que você procura.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {categories.map((category) => (
          <Link href={category.href} key={category.name} className="group relative block overflow-hidden rounded-lg shadow-lg">
            <Image
              src={category.imageUrl}
              alt={`Catálogo de ${category.name}`}
              width={800}
              height={600}
              data-ai-hint={category.imageHint}
              className="object-cover w-full h-full aspect-[4/3] transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-3xl font-headline font-bold text-white">
                {category.name}
              </h2>
              <p className="text-white/90 mt-1">{category.description}</p>
              <div className="mt-4 flex items-center text-accent-foreground font-semibold">
                Ver catálogo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
