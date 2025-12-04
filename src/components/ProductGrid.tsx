import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  onProductClick: (product: Product) => void;
}

export function ProductGrid({ products, isLoading, error, onProductClick }: ProductGridProps) {
  const { t } = useLanguage();

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-destructive">{t('error')}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
      {products.map((product, index) => (
        <div
          key={product.id}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <ProductCard
            product={product}
            onClick={() => onProductClick(product)}
          />
        </div>
      ))}
    </div>
  );
}
