
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditProductForm } from "./edit-product-form";


export default function EditProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    notFound();
  }
  
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Editar Produto: {product.name}</CardTitle>
        </CardHeader>
        <EditProductForm product={product} />
      </Card>
    </div>
  );
}

