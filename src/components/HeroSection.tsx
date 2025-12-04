import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
}

export function HeroSection({ onShopClick }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 animate-fade-in">
          {t('newArrivals')}
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-foreground mb-6 animate-slide-up">
          {t('heroTitle')}
        </h1>
        <p className="max-w-md mx-auto text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {t('heroSubtitle')}
        </p>
        <Button
          onClick={onShopClick}
          variant="outline"
          size="lg"
          className="border-foreground text-foreground hover:bg-foreground hover:text-background font-medium tracking-wider animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          {t('shopCollection')}
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
