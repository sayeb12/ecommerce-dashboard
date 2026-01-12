import React, { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Paper,
  Drawer,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  FilterList as FilterIcon,
  Inventory as InventoryIcon,
  TrendingUp,
  People,
  LocalShipping,
  AttachMoney,
  Star,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { EcommerceProvider, useEcommerce } from './context/EcommerceContext';
import { ThemeProvider } from '@mui/material/styles';
import theme, { darkTheme } from './theme';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import StatsCard from './components/StatsCard';
import FilterSidebar from './components/FilterSidebar';
import SalesChart from './components/SalesChart';
import toast from 'react-hot-toast';

// Cart Drawer Component
const CartDrawer = ({ open, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, cartCount } = useEcommerce();

  const handleCheckout = () => {
    toast.success('Proceeding to checkout!');
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          borderRadius: '16px 0 0 16px',
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CartIcon />
            <Typography variant="h6" fontWeight={600}>
              Shopping Cart
            </Typography>
            <Badge badgeContent={cartCount} color="primary" sx={{ ml: 1 }} />
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <CartIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add some products to get started
                </Typography>
              </motion.div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <Paper
                    sx={{
                      p: 2,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.discount > 0 
                          ? (item.price * (1 - item.discount / 100)).toFixed(2)
                          : item.price.toFixed(2)}
                      </Typography>
                      {item.discount > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography
                            variant="caption"
                            sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                          >
                            ${item.price.toFixed(2)}
                          </Typography>
                          <Chip
                            label={`-${item.discount}%`}
                            size="small"
                            color="error"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </Box>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography fontWeight={600}>${cartTotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography fontWeight={600}>Free</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography color="text.secondary">Tax</Typography>
              <Typography fontWeight={600}>
                ${(cartTotal * 0.08).toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                ${(cartTotal * 1.08).toFixed(2)}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCheckout}
              sx={{ mb: 2 }}
            >
              Proceed to Checkout
            </Button>
            <Button fullWidth variant="outlined" onClick={onClose}>
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

// Main Dashboard Component
const DashboardContent = () => {
  const {
    products,
    addToCart,
    toggleWishlist,
    cartCount,
    toggleTheme,
    isDarkMode,
    stats,
    filters,
    updateFilters,
    categories,
    brands,
  } = useEcommerce();

  const themeMui = useTheme();
  const isMobile = useMediaQuery(themeMui.breakpoints.down('md'));
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalSales.toLocaleString()}`,
      change: stats.revenueGrowth,
      icon: <AttachMoney />,
      color: '#7C3AED',
      progress: 75,
      subtitle: 'Monthly revenue generated',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      change: stats.orderGrowth,
      icon: <LocalShipping />,
      color: '#10B981',
      progress: 60,
      subtitle: 'Orders processed this month',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      change: stats.customerGrowth,
      icon: <People />,
      color: '#3B82F6',
      progress: 85,
      subtitle: 'Active customers',
    },
    {
      title: 'Product Rating',
      value: '4.8',
      change: 5.2,
      icon: <Star />,
      color: '#F59E0B',
      progress: 90,
      subtitle: 'Average product rating',
    },
  ];

  // Toggle sidebar minimized state
  const handleToggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header
        cartCount={cartCount}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        onCartClick={() => setCartOpen(true)}
        onFilterClick={() => setMobileFilterOpen(true)}
      />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsCards.map((stat, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <StatsCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Grid container spacing={3}>
          {/* Filters Sidebar - Desktop */}
          {!isMobile && (
            <Grid item xs={12} lg={isSidebarMinimized ? 1 : 3}>
              {filterOpen ? (
                <FilterSidebar
                  open={filterOpen}
                  onClose={() => setFilterOpen(false)}
                  filters={filters}
                  onFilterChange={updateFilters}
                  categories={categories}
                  brands={brands}
                  isMinimized={isSidebarMinimized}
                  onToggleMinimize={handleToggleSidebar}
                />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    onClick={() => setFilterOpen(true)}
                    sx={{ borderRadius: 3 }}
                  >
                    Show Filters
                  </Button>
                </Box>
              )}
            </Grid>
          )}

          {/* Main Content */}
          <Grid item xs={12} lg={isSidebarMinimized && !isMobile ? 11 : !isMobile ? 9 : 12}>
            {/* Sales Chart */}
            <Box sx={{ mb: 4 }}>
              <SalesChart />
            </Box>

            {/* Products Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Featured Products
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {products.length} products found
                </Typography>
              </Box>
              
              {/* Mobile Filter Button */}
              {isMobile && (
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={() => setMobileFilterOpen(true)}
                  size="small"
                >
                  Filters
                </Button>
              )}
              
              {/* Desktop Sort Buttons */}
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant={filters.sortBy === 'featured' ? 'contained' : 'outlined'}
                    onClick={() => updateFilters({ sortBy: 'featured' })}
                    size="small"
                  >
                    Featured
                  </Button>
                  <Button
                    variant={filters.sortBy === 'newest' ? 'contained' : 'outlined'}
                    onClick={() => updateFilters({ sortBy: 'newest' })}
                    size="small"
                  >
                    Newest
                  </Button>
                  <Button
                    variant={filters.sortBy === 'price-low' ? 'contained' : 'outlined'}
                    onClick={() => updateFilters({ sortBy: 'price-low' })}
                    size="small"
                  >
                    Price: Low to High
                  </Button>
                  <Button
                    variant={filters.sortBy === 'rating' ? 'contained' : 'outlined'}
                    onClick={() => updateFilters({ sortBy: 'rating' })}
                    size="small"
                  >
                    Top Rated
                  </Button>
                </Box>
              )}
            </Box>

            {/* Mobile Sort Buttons */}
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 1, mb: 3, overflowX: 'auto' }}>
                <Button
                  variant={filters.sortBy === 'featured' ? 'contained' : 'outlined'}
                  onClick={() => updateFilters({ sortBy: 'featured' })}
                  size="small"
                >
                  Featured
                </Button>
                <Button
                  variant={filters.sortBy === 'newest' ? 'contained' : 'outlined'}
                  onClick={() => updateFilters({ sortBy: 'newest' })}
                  size="small"
                >
                  Newest
                </Button>
                <Button
                  variant={filters.sortBy === 'price-low' ? 'contained' : 'outlined'}
                  onClick={() => updateFilters({ sortBy: 'price-low' })}
                  size="small"
                >
                  Price: Low
                </Button>
                <Button
                  variant={filters.sortBy === 'rating' ? 'contained' : 'outlined'}
                  onClick={() => updateFilters({ sortBy: 'rating' })}
                  size="small"
                >
                  Top Rated
                </Button>
              </Box>
            )}

            {/* Products Grid */}
            <Grid container spacing={3}>
              <AnimatePresence>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard
                      product={product}
                      onAddToCart={addToCart}
                      onToggleFavorite={toggleWishlist}
                    />
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>

            {products.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <InventoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Try adjusting your filters or search terms
                </Typography>
                <Button variant="contained" onClick={() => updateFilters({})}>
                  Clear All Filters
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 320 },
            borderRadius: '0 16px 16px 0',
          },
        }}
      >
        <FilterSidebar
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          filters={filters}
          onFilterChange={updateFilters}
          categories={categories}
          brands={brands}
          isMinimized={false}
          onToggleMinimize={() => {}}
        />
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            startIcon={<CartIcon />}
            onClick={() => setCartOpen(true)}
            sx={{
              borderRadius: 20,
              px: 3,
              py: 1.5,
              boxShadow: 3,
              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
            }}
          >
            <Badge badgeContent={cartCount} color="error" sx={{ mr: 1 }}>
              Cart
            </Badge>
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

// Main App Component
const App = () => {
  const { isDarkMode } = useEcommerce();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <DashboardContent />
    </ThemeProvider>
  );
};

// Wrap with Provider
const AppWithProvider = () => (
  <EcommerceProvider>
    <App />
  </EcommerceProvider>
);

export default AppWithProvider;