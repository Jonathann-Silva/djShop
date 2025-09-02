import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">
            &copy; {year} ShopFast. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:underline">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
