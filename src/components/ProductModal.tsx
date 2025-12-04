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

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
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
            >
              {t('addToCart')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
