import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const { t } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const productIds = useMemo(() => Array.from(new Set(items.map((item) => item.id))), [items]);

  const { data: stockById } = useQuery({
    queryKey: ['cart', 'stock', productIds],
    queryFn: async () => {
      if (productIds.length === 0) return new Map<string, number>();
      const { data, error } = await supabase
        .from('products')
        .select('id, quantity')
        .in('id', productIds);

      if (error) throw error;

      return new Map((data ?? []).map((product) => [product.id, Number(product.quantity ?? 0)]));
    },
    enabled: productIds.length > 0,
  });

  const handleOrderViaAgent = () => {
    if (items.length === 0) return;

    // Format cart contents
    const itemsText = items
      .map((item) => `${item.quantity}x ${item.name}${item.size ? ` (${item.size})` : ''} ($${item.price.toFixed(2)})`)
      .join(', ');
    
    const message = `${t('orderMessage')} ${itemsText}. ${t('totalLabel')} $${totalPrice.toFixed(2)}`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // You can replace this with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success(t('orderSubmitted'));
    clearCart();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">{t('yourCart')}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-lg text-muted-foreground">{t('emptyCart')}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t('continueShopping')}</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size ?? 'default'}`} className="flex gap-4 animate-fade-in">
                    {/* Item Image */}
                    <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-secondary">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-sm">{item.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                        {item.size ? (
                          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                            {t('sizesLabel')}: {item.size}
                          </p>
                        ) : null}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        {(() => {
                          const stock = stockById?.get(item.id);
                          const maxQuantity = Number.isFinite(stock) ? Math.max(0, stock) : undefined;
                          const canIncrease = maxQuantity === undefined || item.quantity < maxQuantity;

                          return (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center border border-border hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => {
                              const nextQuantity = maxQuantity === undefined
                                ? item.quantity + 1
                                : Math.min(maxQuantity, item.quantity + 1);
                              if (nextQuantity === item.quantity) return;
                              updateQuantity(item.id, item.size, nextQuantity);
                            }}
                            className="flex h-7 w-7 items-center justify-center border border-border hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                            disabled={!canIncrease}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                          );
                        })()}

                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={t('remove')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg">{t('total')}</span>
                <span className="font-serif text-xl">${totalPrice.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleOrderViaAgent}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-medium tracking-wider"
                size="lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t('orderViaAgent')}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
