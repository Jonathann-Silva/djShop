import { ProductGrid } from '@/components/product-grid';
import { ProductRecommendations } from '@/components/product-recommendations';
import { getProducts } from '@/lib/products';

export default function Home() {
  const products = getProducts();

  return (
    <div className="space-y-12">
      <ProductGrid products={products} />
      <ProductRecommendations />
    </div>
  );
}
