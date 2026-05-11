import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!product) return null;

  useEffect(() => {
    if (!product) return;
    setSelectedSize(null);
    setSelectedQuantity(1);
  }, [product, open]);

  const stockQuantity = Number.isFinite(product.quantity) ? product.quantity : 0;
  const maxQuantity = Math.max(1, stockQuantity);
  const isOutOfStock = stockQuantity <= 0;

  const requiresSizeSelection = (product.sizes?.length ?? 0) > 0;
  const canAddToCart = !isOutOfStock && (!requiresSizeSelection || !!selectedSize);

  useEffect(() => {
    if (isOutOfStock) {
      setSelectedQuantity(1);
      return;
    }
    setSelectedQuantity((prev) => Math.min(Math.max(1, Number(prev) || 1), maxQuantity));
  }, [isOutOfStock, maxQuantity]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      size: selectedSize,
    }, selectedQuantity);
    toast.success(t('addedToCart'));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square md:aspect-auto bg-secondary">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between p-6 md:p-8">
            <div className="space-y-6">
              <DialogHeader className="space-y-4">
                {product.category && (
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {product.category}
                  </p>
                )}
                <DialogTitle className="font-serif text-2xl md:text-3xl font-medium">
                  {product.name}
                </DialogTitle>
              </DialogHeader>

              <p className="font-serif text-2xl text-accent">
                ${product.price.toFixed(2)}
              </p>

              <div className="space-y-4">
                {product.sizes && product.sizes.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t('sizesLabel')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant={size === selectedSize ? 'default' : 'outline'}
                          size="sm"
                          className="rounded-full px-4 text-xs uppercase tracking-wider"
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t('quantityLabel')}
                  </h4>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() =>
                        setSelectedQuantity((prev) => {
                          const next = Math.max(1, Number(prev) - 1);
                          return Number.isFinite(next) ? next : 1;
                        })
                      }
                      disabled={isOutOfStock || selectedQuantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </Button>
                    <span className="min-w-8 text-center text-sm text-foreground">
                      {selectedQuantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() =>
                        setSelectedQuantity((prev) => {
                          const next = Math.min(maxQuantity, Number(prev) + 1);
                          return Number.isFinite(next) ? next : 1;
                        })
                      }
                      disabled={isOutOfStock || selectedQuantity >= maxQuantity}
                      aria-label="Increase quantity"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              {product.description && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {t('description')}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wider"
              size="lg"
              disabled={!canAddToCart}
            >
              {t('addToCart')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
