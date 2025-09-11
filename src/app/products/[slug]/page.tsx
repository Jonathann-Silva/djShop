import { notFound } from "next/navigation";
import Image from "next/image";
import { products, getImageUrl, getImageHint } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductDetailsClient } from "./product-details-client";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (p) => p.scentProfile === product.scentProfile && p.id !== product.id
    )
    .slice(0, 4);

  const imageUrl = getImageUrl(product.imageId, product);
  const imageHint = getImageHint(product.imageId);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="sticky top-24">
          <Image
            src={imageUrl}
            alt={product.name}
            width={600}
            height={800}
            data-ai-hint={imageHint}
            className="rounded-lg object-cover w-full shadow-lg"
          />
        </div>

        <ProductDetailsClient product={product} />
      </div>
      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Poderá também gostar de
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
