import { ProductTabs } from '@/components/product-tabs';
import { getProducts } from '@/lib/products';

export default function Home() {
  const products = getProducts();

  return (
    <div className="space-y-12">
      <ProductTabs products={products} />
    </div>
  );
}
