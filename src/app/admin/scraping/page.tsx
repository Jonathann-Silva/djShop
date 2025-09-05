
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getTabSettings, updateTabSettings, TabSetting } from '@/actions/tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TabsSettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [tabSettings, setTabSettings] = useState<TabSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) return;
    if (!user || user.email !== 'admin@gmail.com') {
      router.replace('/');
    } else {
      async function loadSettings() {
        setIsLoading(true);
        const settings = await getTabSettings();
        setTabSettings(settings);
        setIsLoading(false);
      }
      loadSettings();
    }
  }, [user, router]);

  const handleToggle = async (category: string, isActive: boolean) => {
    const originalSettings = [...tabSettings];
    // Update UI optimistically
    setTabSettings(prev => 
        prev.map(s => s.category === category ? {...s, isActive} : s)
    );

    try {
        await updateTabSettings(category, isActive);
        toast({
            title: "Configuração salva!",
            description: `A aba "${category}" foi ${isActive ? 'ativada' : 'desativada'}.`
        });
    } catch (error) {
        // Revert on error
        setTabSettings(originalSettings);
        toast({
            title: "Erro ao salvar",
            description: "Não foi possível salvar a configuração. Tente novamente.",
            variant: "destructive"
        });
    }
  };

  if (user === undefined || (user && isLoading)) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-12" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-12" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user || user.email !== 'admin@gmail.com') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gerenciar Visibilidade das Abas</CardTitle>
            <CardDescription>
              Ative ou desative as categorias de produtos que aparecem como abas na
              página inicial para os clientes.
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
        <div className="space-y-4">
          {tabSettings.map((setting) => (
            <div key={setting.category} className="flex items-center justify-between p-3 border rounded-md bg-secondary/50">
              <Label htmlFor={`switch-${setting.category}`} className="text-lg font-medium">
                {setting.category}
              </Label>
              <Switch
                id={`switch-${setting.category}`}
                checked={setting.isActive}
                onCheckedChange={(checked) => handleToggle(setting.category, checked)}
                aria-label={`Ativar ou desativar a aba ${setting.category}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

