
import { Header } from '@/components/layout/header';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-screen flex-col">{children}</div>;
}
