
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddBebidaForm } from "./add-bebida-form";

export default async function AddBebidaPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Bebida</CardTitle>
        </CardHeader>
        <AddBebidaForm />
      </Card>
    </div>
  );
}
