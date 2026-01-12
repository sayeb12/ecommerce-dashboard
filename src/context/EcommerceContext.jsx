import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts, categories, brands } from '../data/products';
import toast from 'react-hot-toast';

const EcommerceContext = createContext();

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within EcommerceProvider');
  }
  return context;
};

export const EcommerceProvider = ({ children }) => {
  // Load initial state from localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [cart, setCart] = useState(() => loadFromStorage('ecommerce_cart', []));
  const [wishlist, setWishlist] = useState(() => loadFromStorage('ecommerce_wishlist', []));
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    minRating: 0,
    brands: [],
    features: [],
    sortBy: 'featured',
    searchQuery: '',
  });
  const [user, setUser] = useState(() => loadFromStorage('ecommerce_user', {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD',
    isPremium: true,
    joinDate: '2023-01-15',
  }));
  const [orders, setOrders] = useState(() => loadFromStorage('ecommerce_orders', []));
  const [isDarkMode, setIsDarkMode] = useState(() => 
    loadFromStorage('ecommerce_darkmode', false)
  );

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ecommerce_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ecommerce_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ecommerce_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ecommerce_darkmode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared successfully');
  };

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  // Filter functions
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      minRating: 0,
      brands: [],
      features: [],
      sortBy: 'featured',
      searchQuery: '',
    });
  };

  // Apply filters to products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Price range filter
    const discountedPrice = product.discount > 0 
      ? product.price * (1 - product.discount / 100)
      : product.price;
    
    if (discountedPrice < filters.priceRange[0] || discountedPrice > filters.priceRange[1]) {
      return false;
    }

    // Rating filter
    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }

    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    // Search filter
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    // Features filter
    if (filters.features.length > 0) {
      const productFeatures = product.features || [];
      if (!filters.features.every(feature => productFeatures.includes(feature))) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return (a.price * (1 - a.discount / 100)) - (b.price * (1 - b.discount / 100));
      case 'price-high':
        return (b.price * (1 - b.discount / 100)) - (a.price * (1 - a.discount / 100));
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // 'featured'
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return b.rating - a.rating;
    }
  });

  // Order functions
  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      total: cart.reduce((sum, item) => {
        const price = item.discount > 0 
          ? item.price * (1 - item.discount / 100)
          : item.price;
        return sum + (price * item.quantity);
      }, 0),
      status: 'processing',
      shippingAddress: orderDetails.shippingAddress,
      paymentMethod: orderDetails.paymentMethod,
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    
    toast.success('Order placed successfully!', {
      duration: 4000,
      icon: '🎉',
    });
    
    return newOrder;
  };

  // Stats calculations
  const cartTotal = cart.reduce((sum, item) => {
    const price = item.discount > 0 
      ? item.price * (1 - item.discount / 100)
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const stats = {
    totalProducts: products.length,
    totalSales: 125430,
    totalOrders: 2456,
    totalCustomers: 1234,
    revenueGrowth: 24.5,
    orderGrowth: 18.2,
    customerGrowth: 12.7,
  };

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    // State
    cart,
    wishlist,
    products: sortedProducts,
    categories,
    brands,
    filters,
    user,
    orders,
    isDarkMode,
    stats,
    
    // Cart functions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartCount,
    
    // Wishlist functions
    toggleWishlist,
    
    // Filter functions
    updateFilters,
    clearFilters,
    
    // Order functions
    placeOrder,
    
    // Theme function
    toggleTheme,
    
    // Stats
    stats,
  };

  return (
    <EcommerceContext.Provider value={value}>
      {children}
    </EcommerceContext.Provider>
  );
};