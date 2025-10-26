
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SprayCan, HardDrive, GlassWater, ArrowRight, Package } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user || user.email !== "admin@gmail.com") {
        router.push("/login");
        return null;
    }

    const categories = [
        {
            name: "Pedidos",
            href: "/admin/pedidos",
            icon: Package,
            description: "Gerir todos os pedidos da loja.",
        },
        {
            name: "Perfumes",
            href: "/admin/perfumes",
            icon: SprayCan,
            description: "Gerir o catálogo de perfumes.",
        },
        {
            name: "Bebidas",
            href: "/admin/bebidas",
            icon: GlassWater,
            description: "Gerir o catálogo de bebidas.",
        },
        {
            name: "Eletrônicos",
            href: "/admin/eletronicos",
            icon: HardDrive,
            description: "Gerir o catálogo de eletrônicos.",
        },
    ];

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">
                    Painel de Administração
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Selecione uma categoria para gerir os produtos ou pedidos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
                {categories.map((category) => (
                    <Card key={category.name} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <category.icon className="h-8 w-8 text-primary" />
                                <CardTitle className="font-headline text-2xl">{category.name}</CardTitle>
                            </div>
                            <CardDescription className="pt-2">{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow"></CardContent>
                        <CardContent>
                             <Button asChild className="w-full">
                                <Link href={category.href}>
                                    Gerir {category.name} <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
