'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function HistoryPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o estado de autenticação ainda está carregando, não faz nada
    if (user === undefined) {
      return;
    }
    // Se não há usuário ou o usuário não é o admin, redireciona
    if (!user || user.email !== 'admin@gmail.com') {
      router.replace('/');
    }
  }, [user, router]);

  // Mostra um estado de carregamento enquanto verifica o usuário
  if (user === undefined) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Se o usuário não for o admin, não renderiza nada (será redirecionado)
  if (!user || user.email !== 'admin@gmail.com') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Histórico do Sistema</CardTitle>
            <CardDescription>
              Visualize os eventos e atividades importantes do sistema aqui.
            </CardDescription>
          </div>
           <Button asChild variant="outline">
              <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-md">
            <p className="text-muted-foreground">O histórico de atividades aparecerá aqui.</p>
        </div>
      </CardContent>
    </Card>
  );
}
