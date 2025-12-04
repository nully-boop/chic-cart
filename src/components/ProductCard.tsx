import { Product } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { t } = useLanguage();

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer animate-slide-up"
      style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover product-image-hover"
          loading="lazy"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-end justify-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/5 group-hover:opacity-100">
          <span className="mb-6 text-sm font-medium tracking-wider text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
            {t('viewDetails')}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        {product.category && (
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
        )}
        <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}
