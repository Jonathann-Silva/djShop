"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/account");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Falha no Login",
          description: error.message,
        });
      }
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/account");
    } catch (error) {
      // Toast is already handled in the auth context
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <Flame className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-2xl font-headline mt-2">
            Bem-vindo de volta
          </CardTitle>
          <CardDescription>
            Faça login para aceder à sua conta e histórico de pedidos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Palavra-passe</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu-se da sua palavra-passe?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Login
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} type="button">
              Login com o Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="#" className="underline">
              Registe-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
