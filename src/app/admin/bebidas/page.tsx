
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import type { Bebida } from "@/lib/products";
import { getBebidas, removeBebida } from "@/lib/actions";
import { getImageUrl } from "@/lib/products";
import Image from "next/image";
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
import { PlusCircle, MoreHorizontal, Tags, Trash2, Loader2, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ManageBrandsDialog } from "@/components/manage-brands-dialog";
import { useToast } from "@/hooks/use-toast";


export default function AdminBebidasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = useState<Bebida[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [isManageBrandsOpen, setIsManageBrandsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Bebida | null>(null);


  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getBebidas();
      setProducts(fetchedProducts);
      setLoading(false);
    }

    if (!authLoading) {
      if (!user || user.email !== "admin@gmail.com") {
        router.push("/");
      } else {
        fetchProducts();
      }
    }
  }, [user, authLoading, router]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    switch (sortOrder) {
        case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "brand-asc":
            filtered.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
         case "brand-desc":
            filtered.sort((a, b) => b.brand.localeCompare(a.brand));
            break;
        case "date-asc":
            filtered.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            break;
        case "date-desc":
            filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            break;
        default:
            break;
    }

    return filtered;
  }, [products, sortOrder]);
  
  const handleBrandsUpdated = async () => {
      setLoading(true);
      const fetchedProducts = await getBebidas();
      setProducts(fetchedProducts);
      setLoading(false);
  }

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    const result = await removeBebida(productToDelete.id);
    setIsDeleting(false);

    if (result.success) {
        toast({
            title: "Bebida Removida",
            description: result.message,
        });
        setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
    } else {
        toast({
            variant: "destructive",
            title: "Erro ao Remover",
            description: result.message,
        });
    }
    setProductToDelete(null);
  }

  if (authLoading || loading) {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <Skeleton className="h-10 w-72 mb-2" />
                    <Skeleton className="h-6 w-96" />
                </div>
                 <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-40" />
                    <Skeleton className="h-10 w-36" />
                    <Skeleton className="h-10 w-44" />
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Imagem</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Marca</TableHead>
                                <TableHead>Margem de Lucro</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-[50px] w-[50px] rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
  }

  if (!user || user.email !== "admin@gmail.com") {
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
    <>
    <ManageBrandsDialog open={isManageBrandsOpen} onOpenChange={setIsManageBrandsOpen} onBrandsUpdated={handleBrandsUpdated} />

    <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                   Esta ação não pode ser desfeita. Isto irá remover permanentemente o produto <span className="font-bold">{productToDelete?.name}</span> do seu catálogo.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProduct} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sim, remover
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Painel
                </Link>
            </Button>
        </div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-headline font-bold">
            Gerenciar Bebidas
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Adicione, edite ou remova bebidas do seu catálogo.
          </p>
        </div>
         <div className="flex items-center gap-4">
            <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                    <SelectItem value="brand-asc">Marca (A-Z)</SelectItem>
                    <SelectItem value="brand-desc">Marca (Z-A)</SelectItem>
                    <SelectItem value="date-desc">Data (mais novo)</SelectItem>
                    <SelectItem value="date-asc">Data (mais antigo)</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setIsManageBrandsOpen(true)}>
                <Tags className="mr-2 h-4 w-4" />
                Gerir Marcas
            </Button>
            <Button asChild>
              <Link href="/admin/bebidas/new">
                <PlusCircle className="mr-2" />
                Adicionar Bebida
              </Link>
            </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Margem de Lucro</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProducts.map((product) => (
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
                  <TableCell>{product.profitMargin}%</TableCell>
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
                           <Link href={`/admin/bebidas/${product.id}/edit`}>Editar</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={() => setProductToDelete(product)}
                            >
                          <Trash2 className="mr-2 h-4 w-4" />
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
    </>
  );
}
