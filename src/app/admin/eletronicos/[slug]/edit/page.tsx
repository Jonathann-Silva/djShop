
import { notFound } from "next/navigation";
import { getElectronicById } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditElectronicForm } from "./edit-electronic-form";


export default async function EditElectronicPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getElectronicById(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Editar Eletrônico: {product.name}</CardTitle>
        </CardHeader>
        <EditElectronicForm product={product} />
      </Card>
    </div>
  );
}
