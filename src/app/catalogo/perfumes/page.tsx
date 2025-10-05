import { getProducts } from '@/lib/data';
import { PerfumeCatalogClient } from './perfume-catalog-client';

export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  const products = await getProducts();
  const availableBrands = [...new Set(products.map((p) => p.brand))].sort();

  return (
    <PerfumeCatalogClient products={products} availableBrands={availableBrands} />
  );
}
