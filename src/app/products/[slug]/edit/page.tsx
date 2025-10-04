
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditProductForm } from "./edit-product-form";


export default async function EditProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductById(params.slug);

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
