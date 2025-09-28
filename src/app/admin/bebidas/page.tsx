
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, GlassWater } from "lucide-react";

export default function AdminBebidasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  if (authLoading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.email !== "admin@gmail.com") {
    router.push("/login");
    return null;
  }
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Painel
                </Link>
            </Button>
        </div>
      <div className="text-center">
        <GlassWater className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 text-4xl font-headline font-bold">Gerenciar Bebidas</h1>
        <p className="mt-4 text-muted-foreground">
            Esta seção está em construção. Volte em breve para gerir o seu catálogo de bebidas.
        </p>
      </div>
    </div>
  );
}
