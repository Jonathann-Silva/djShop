
"use client";

import { HardDrive } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EletronicosPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
      <HardDrive className="mx-auto h-24 w-24 text-muted-foreground" />
      <h1 className="mt-8 text-4xl font-headline font-bold">Catálogo de Eletrônicos</h1>
      <p className="mt-4 text-muted-foreground">
        Esta seção está em construção. Volte em breve para ver nossa seleção de eletrônicos.
      </p>
      <Button asChild className="mt-8 bg-primary hover:bg-primary/90">
        <Link href="/">Voltar para a Página Inicial</Link>
      </Button>
    </div>
  );
}
