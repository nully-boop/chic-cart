import { useState, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductModal } from '@/components/ProductModal';
import { CartSidebar } from '@/components/CartSidebar';
import { useProducts } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/types/product';

const Index = () => {
  const { t } = useLanguage();
  const { data: products, isLoading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productsRef = useRef<HTMLElement>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <HeroSection onShopClick={scrollToProducts} />
        
        {/* Products Section */}
        <section ref={productsRef} className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                {t('featuredCollection')}
              </h2>
              <div className="mt-4 mx-auto h-px w-24 bg-accent" />
            </div>
            
            <ProductGrid
              products={products || []}
              isLoading={isLoading}
              error={error}
              onProductClick={handleProductClick}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif text-2xl tracking-[0.3em] text-foreground mb-4">
            {t('brandName')}
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('brandName')}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      
      <CartSidebar
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
      />
    </div>
  );
};

export default Index;
