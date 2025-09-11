
import { notFound } from "next/navigation";
import { getProducts, getGenders } from "@/lib/actions";
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
  const products = await getProducts();
  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    notFound();
  }
  
  const genders = await getGenders();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Editar Produto: {product.name}</CardTitle>
        </CardHeader>
        <EditProductForm product={product} genders={genders} />
      </Card>
    </div>
  );
}
