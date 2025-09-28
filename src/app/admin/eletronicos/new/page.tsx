
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddElectronicForm } from "./add-electronic-form";

export default async function AddElectronicPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Eletrônico</CardTitle>
        </CardHeader>
        <AddElectronicForm />
      </Card>
    </div>
  );
}
