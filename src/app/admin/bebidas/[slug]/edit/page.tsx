
import { notFound } from "next/navigation";
import { getBebidaById } from "@/lib/actions";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditBebidaForm } from "./edit-bebida-form";


export default async function EditBebidaPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getBebidaById(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Editar Bebida: {product.name}</CardTitle>
        </CardHeader>
        <EditBebidaForm product={product} />
      </Card>
    </div>
  );
}
