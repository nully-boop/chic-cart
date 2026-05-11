export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // Navigation
    brandName: 'MAISON',
    cart: 'Cart',
    
    // Product
    addToCart: 'Add to Cart',
    price: 'Price',
    description: 'Description',
    viewDetails: 'View Details',
    category: 'Category',
    
    // Cart
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    continueShopping: 'Continue shopping to add items',
    subtotal: 'Subtotal',
    total: 'Total',
    remove: 'Remove',
    orderViaAgent: 'Order via Agent',
    checkout: 'Checkout',
    
    // Messages
    addedToCart: 'Added to cart',
    orderSubmitted: 'Order submitted to agent!',
    orderMessage: 'Hello, I want to order:',
    totalLabel: 'Total:',
    
    // Loading
    loading: 'Loading...',
    error: 'Error loading products',
    
    // Home
    heroTitle: 'Timeless Elegance',
    heroSubtitle: 'Discover our curated collection of refined essentials',
    shopCollection: 'Shop Collection',
    newArrivals: 'New Arrivals',
    featuredCollection: 'Featured Collection',
    allCategories: 'All',
    noProducts: 'No products in this category',
    searchPlaceholder: 'Search products...',
    noResultsTitle: 'No products found',
    noResultsDescription: 'We couldn\'t find anything matching your search. Try a different term or browse all products.',
    clearFilters: 'Clear filters',
  },
  fr: {
    // Navigation
    brandName: 'MAISON',
    cart: 'Panier',
    
    // Product
    addToCart: 'Ajouter au panier',
    price: 'Prix',
    description: 'Description',
    viewDetails: 'Voir les détails',
    category: 'Catégorie',
    
    // Cart
    yourCart: 'Votre panier',
    emptyCart: 'Votre panier est vide',
    continueShopping: 'Continuez vos achats pour ajouter des articles',
    subtotal: 'Sous-total',
    total: 'Total',
    remove: 'Supprimer',
    orderViaAgent: 'Commander via Agent',
    checkout: 'Paiement',
    
    // Messages
    addedToCart: 'Ajouté au panier',
    orderSubmitted: 'Commande soumise à l\'agent !',
    orderMessage: 'Bonjour, je souhaite commander :',
    totalLabel: 'Total :',
    
    // Loading
    loading: 'Chargement...',
    error: 'Erreur lors du chargement des produits',
    
    // Home
    heroTitle: 'Élégance Intemporelle',
    heroSubtitle: 'Découvrez notre collection raffinée d\'essentiels',
    shopCollection: 'Voir la Collection',
    newArrivals: 'Nouveautés',
    featuredCollection: 'Collection Vedette',
    allCategories: 'Tout',
    noProducts: 'Aucun produit dans cette catégorie',
    searchPlaceholder: 'Rechercher des produits...',
    noResultsTitle: 'Aucun produit trouvé',
    noResultsDescription: 'Nous n\'avons rien trouvé correspondant à votre recherche. Essayez un autre terme ou parcourez tous les produits.',
    clearFilters: 'Effacer les filtres',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
