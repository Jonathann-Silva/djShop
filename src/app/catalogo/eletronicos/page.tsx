
import { Eletronico } from "@/lib/products";
import { getElectronics } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export const revalidate = 3600; // Revalidate every hour

export default async function EletronicosPage() {
    const products: Eletronico[] = await getElectronics();

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">
                    Nosso Catálogo de Eletrônicos
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore nossa seleção de eletrônicos de última geração.
                </p>
            </div>

            <main>
                {products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Nenhum eletrônico encontrado no momento.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
