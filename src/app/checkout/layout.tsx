import { ReactNode } from 'react';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex min-h-screen flex-col">
        {/* O cabeçalho é renderizado pelo layout raiz (src/app/layout.tsx) */}
        <main className="flex-grow">{children}</main>
        {/* O Footer é intencionalmente omitido pelo layout raiz neste caso. */}
      </div>
  );
}
