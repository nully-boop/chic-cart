import type { MouseEvent } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const isOutOfStock = product.quantity <= 0;

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isOutOfStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      size: null,
    });
    toast.success(t('addedToCart'));
  };

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
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {product.category && (
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
        )}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <Button
            onClick={handleAddToCart}
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full"
            aria-label={t('addToCart')}
            disabled={isOutOfStock}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
