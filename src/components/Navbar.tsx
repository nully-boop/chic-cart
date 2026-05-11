import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showSearch: boolean;
}

export function Navbar({ onCartClick, searchQuery, onSearchChange, showSearch }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        {/* Brand Logo */}
        <a href="/" className="flex shrink-0 items-center">
          <span className="font-serif text-2xl tracking-[0.3em] text-foreground">
            {t('brandName')}
          </span>
        </a>

        {/* Search (appears on scroll) */}
        <div
          className={cn(
            'hidden flex-1 justify-center transition-all duration-300 sm:flex',
            showSearch ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder={t('searchPlaceholder')}
            variant="compact"
          />
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center rounded-sm border border-border overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                language === 'en'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                language === 'fr'
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              FR
            </button>
          </div>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
            aria-label={t('cart')}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
