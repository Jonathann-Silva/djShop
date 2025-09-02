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
        // For demo purposes, we use a static history.
        // In a real app, this would be dynamically tracked per user.
        const viewingHistory = '4K UHD Monitor, Wireless Mechanical Keyboard';
        const purchaseHistory = 'Ergonomic Office Chair';
        
        try {
            const result = await getRecommendationsAction({ viewingHistory, purchaseHistory });
            if (result && result.recommendedProducts) {
              setRecommendations(
                result.recommendedProducts.split(',').map((p) => p.trim()).filter(Boolean)
              );
            }
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
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
            <h3 className="text-xl font-headline font-semibold">Personalized Recommendations</h3>
            <p className="text-muted-foreground mt-2 mb-4">Log in to discover products picked just for you.</p>
            <Button asChild>
                <Link href="/login">Login to View</Link>
            </Button>
        </div>
    )
  }

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>Using AI to find your next favorite product.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-24">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
                    <span className="text-muted-foreground">Analyzing your preferences...</span>
                </div>
            </CardContent>
        </Card>
    )
  }
  
  if (recommendations.length === 0) {
    return null; // Don't show the component if there's nothing to recommend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended For You</CardTitle>
        <CardDescription>Based on your activity, you might like these products.</CardDescription>
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
