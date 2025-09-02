'use client';

import { useEffect, useState } from 'react';
import { getRecommendationsAction } from '@/actions/recommendations';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function ProductRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchRecommendations = async () => {
        setLoading(true);
        // Para fins de demonstração, usamos um histórico estático.
        // Em um aplicativo real, isso seria rastreado dinamicamente por usuário.
        const viewingHistory = 'Monitor 4K UHD, Teclado Mecânico Sem Fio';
        const purchaseHistory = 'Cadeira de Escritório Ergonômica';
        
        try {
            const result = await getRecommendationsAction({ viewingHistory, purchaseHistory });
            if (result && result.recommendedProducts) {
              setRecommendations(
                result.recommendedProducts.split(',').map((p) => p.trim()).filter(Boolean)
              );
            }
        } catch (error) {
            console.error("Falha ao buscar recomendações:", error);
        } finally {
            setLoading(false);
        }
      };
      fetchRecommendations();
    }
  }, [user]);

  if (!user) {
    return (
        <div className="text-center bg-card p-8 rounded-lg">
            <h3 className="text-xl font-headline font-semibold">Recomendações Personalizadas</h3>
            <p className="text-muted-foreground mt-2 mb-4">Faça login para descobrir produtos escolhidos para você.</p>
            <Button asChild>
                <Link href="/login">Login para Visualizar</Link>
            </Button>
        </div>
    )
  }

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recomendado Para Você</CardTitle>
                <CardDescription>Usando IA para encontrar seu próximo produto favorito.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-24">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
                    <span className="text-muted-foreground">Analisando suas preferências...</span>
                </div>
            </CardContent>
        </Card>
    )
  }
  
  if (recommendations.length === 0) {
    return null; // Não mostra o componente se não há nada para recomendar
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendado Para Você</CardTitle>
        <CardDescription>Com base na sua atividade, você pode gostar destes produtos.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((product, index) => (
            <div key={index} className="p-4 border rounded-lg bg-secondary/50 text-center">
                <p className="font-medium">{product}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
