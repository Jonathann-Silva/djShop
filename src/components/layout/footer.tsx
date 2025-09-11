import Link from "next/link";
import { Flame, Twitter, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Flame className="h-7 w-7 text-primary" />
              <span className="font-bold font-headline text-xl">
                DJ Shop
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Descubra a sua fragrância de assinatura com a nossa coleção exclusiva de
              perfumes finos.
            </p>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">Loja</h3>
            <div className="mt-4 flex flex-col space-y-2">
              <Link
                href="/catalogo"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Todos os Perfumes
              </Link>
              <Link
                href="/catalogo?gender=Masculine"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Para Ele
              </Link>
              <Link
                href="/catalogo?gender=Feminine"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Para Ela
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">Sobre</h3>
            <div className="mt-4 flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                A Nossa História
              </Link>
              <Link
                href="/advisor"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Consultor AI
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Contacte-nos
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">Siga-nos</h3>
            <div className="mt-4 flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-muted-foreground" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-muted-foreground" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-muted-foreground" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DJ Shop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
