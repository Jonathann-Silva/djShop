
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import type { Order } from "@/lib/products";
import { updateOrderStatus } from "@/lib/actions";
import { getOrders } from "@/lib/data";
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
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";


export default function AdminOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!authLoading) {
        if (!user || user.email !== "admin@gmail.com") {
          router.push("/");
        } else {
          setLoading(true);
          const fetchedOrders = await getOrders();
          setOrders(fetchedOrders);
          setLoading(false);
        }
      }
    }
    fetchOrders();
  }, [user, authLoading, router]);

  const handleUpdateStatus = async (orderId: string, status: 'Pendente' | 'Entregue') => {
      setUpdatingStatus(orderId);
      const result = await updateOrderStatus(orderId, status);
      if (result.success) {
          toast({ title: "Status Atualizado", description: result.message });
          setOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
      } else {
          toast({ variant: "destructive", title: "Erro ao Atualizar", description: result.message });
      }
      setUpdatingStatus(null);
  }

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...orders];

    if (filter !== "all") {
      filtered = filtered.filter((o) => o.status === filter);
    }
    
    // Sort by most recent first
    filtered.sort((a, b) => b.createdAt - a.createdAt);

    return filtered;
  }, [orders, filter]);
  

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
                </div>
            </div>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-10 w-28" /></TableCell>
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
            Gerenciar Pedidos
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Visualize todos os pedidos e atualize o status de entrega.
          </p>
        </div>
         <div className="flex items-center gap-4">
             <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Pedidos</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Entregue">Entregue</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Detalhes do Pedido</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                     <Accordion type="single" collapsible>
                        <AccordionItem value={order.id} className="border-b-0">
                            <AccordionTrigger className="font-medium text-left">
                                <div className="flex flex-col">
                                    <span>{order.customerName}</span>
                                    <span className="text-xs text-muted-foreground font-normal">{format(new Date(order.createdAt), "dd/MM/yyyy 'às' HH:mm")}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 pl-4 border-l-2 ml-2">
                                  <p className="font-semibold">Endereço:</p>
                                  <p className="text-muted-foreground">{order.address}</p>
                                  <p className="font-semibold mt-2">Itens:</p>
                                  <ul className="list-disc list-inside text-muted-foreground">
                                    {order.items.map(item => (
                                        <li key={item.productId}>{item.quantity}x {item.name}</li>
                                    ))}
                                  </ul>
                                  <p className="font-semibold mt-2">Pagamento:</p>
                                   <p className="text-muted-foreground">{order.paymentMethod}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                  </TableCell>
                  <TableCell className="font-medium text-right">R$ {order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={order.status === 'Entregue' ? 'secondary' : 'default'} className={`${order.status === 'Entregue' ? 'bg-green-600/20 text-green-700' : 'bg-amber-600/20 text-amber-700'}`}>
                        {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {order.status === 'Pendente' && (
                        <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUpdateStatus(order.id, 'Entregue')}
                            disabled={updatingStatus === order.id}
                        >
                            {updatingStatus === order.id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                            )}
                            Marcar como Entregue
                        </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAndSortedOrders.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                Nenhum pedido encontrado com os filtros selecionados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
