import { useState, useRef, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { CategoryFilterSkeleton } from '@/components/CategoryFilterSkeleton';
import { ProductModal } from '@/components/ProductModal';
import { CartSidebar } from '@/components/CartSidebar';
import { SearchBar } from '@/components/SearchBar';
import { useProducts } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/types/product';

const Index = () => {
  const { t } = useLanguage();
  const { data: products, isLoading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchInNav, setIsSearchInNav] = useState(false);
  const productsRef = useRef<HTMLElement>(null);
  const heroSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroSearchRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSearchInNav(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category).filter((c): c is string => !!c))).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false) ||
        (p.category?.toLowerCase().includes(q) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={isSearchInNav}
      />

      <main>
        <HeroSection onShopClick={scrollToProducts} />

        {/* Products Section */}
        <section ref={productsRef} className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                {t('featuredCollection')}
              </h2>
              <div className="mt-4 mx-auto h-px w-24 bg-accent" />
            </div>

            <div
              ref={heroSearchRef}
              className={`mb-10 flex justify-center transition-opacity duration-300 ${
                isSearchInNav ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('searchPlaceholder')}
                variant="hero"
              />
            </div>

            {isLoading ? (
              <CategoryFilterSkeleton />
            ) : !error && categories.length > 0 ? (
              <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                allLabel={t('allCategories')}
              />
            ) : null}

            <ProductGrid
              products={filteredProducts}
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
