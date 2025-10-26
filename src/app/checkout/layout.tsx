import { ReactNode } from 'react';
import { Header } from '@/components/layout/header';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        {/* O Footer foi intencionalmente removido deste layout */}
      </div>
  );
}
