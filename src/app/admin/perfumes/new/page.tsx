
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddProductForm } from "./add-product-form";

export default async function AddProductPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Perfume</CardTitle>
        </CardHeader>
        <AddProductForm />
      </Card>
    </div>
  );
}
