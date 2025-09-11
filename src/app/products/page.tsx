"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products";
import Image from "next/image";
import { getImageUrl } from "@/lib/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function AdminProductsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.email !== "admin@gmail.com") {
    // router.push("/"); // Commenting out to avoid redirect loop issues in some scenarios
    return (
        <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
            <h1 className="mt-8 text-4xl font-headline font-bold">Acesso Negado</h1>
            <p className="mt-4 text-muted-foreground">
                Esta página está disponível apenas para administradores.
            </p>
            <Button asChild className="mt-8 bg-primary hover:bg-primary/90">
                <Link href="/">Voltar para a Página Inicial</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-headline font-bold">
            Gerenciar Produtos
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Adicione, edite ou remova produtos do seu catálogo.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Adicionar Produto
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={getImageUrl(product.imageId, product)}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                           <Link href={`/products/${product.id}/edit`}>Editar</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
