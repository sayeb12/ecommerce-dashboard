import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = ({ cartCount, toggleTheme, isDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const notifications = [
    'Your order #1234 has been shipped',
    'Flash sale: 50% off on Electronics',
    'New product arrived: iPhone 15 Pro',
    'Your review was helpful to 25 people',
  ];

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Shop', icon: <StoreIcon />, path: '/shop' },
    { text: 'Orders', icon: <HistoryIcon />, path: '/orders' },
    { text: 'Shipping', icon: <ShippingIcon />, path: '/shipping' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
          boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Side: Logo & Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <StoreIcon sx={{ fontSize: 32 }} />
              </motion.div>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Shop<span style={{ color: '#10B981' }}>Hub</span>
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {menuItems.slice(0, 3).map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Center: Search Bar */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flex: 1,
              maxWidth: 500,
              mx: 4,
              position: 'relative',
            }}
          >
            <SearchIcon
              sx={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'text.secondary',
              }}
            />
            <InputBase
              placeholder="Search products, brands, categories..."
              sx={{
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 12,
                px: 4,
                py: 0.75,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                },
              }}
            />
          </Box>

          {/* Right Side: Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Search Mobile */}
            <IconButton color="inherit" sx={{ display: { md: 'none' } }}>
              <SearchIcon />
            </IconButton>

            {/* Notifications */}
            <IconButton
              color="inherit"
              onClick={(e) => setNotificationsAnchor(e.currentTarget)}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Menu
              anchorEl={notificationsAnchor}
              open={Boolean(notificationsAnchor)}
              onClose={() => setNotificationsAnchor(null)}
              PaperProps={{
                sx: {
                  width: 320,
                  maxHeight: 400,
                  mt: 1.5,
                  borderRadius: 3,
                },
              }}
            >
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">Notifications</Typography>
              </Box>
              {notifications.map((note, index) => (
                <MenuItem key={index} sx={{ py: 1.5 }}>
                  <Box>
                    <Typography variant="body2">{note}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {index + 1}h ago
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>

            {/* Wishlist */}
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            {/* Cart */}
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cartCount} color="error">
                <CartIcon />
              </Badge>
            </IconButton>

            {/* User Menu */}
            <IconButton onClick={handleMenuOpen}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <PersonIcon />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  width: 200,
                  borderRadius: 3,
                  mt: 1.5,
                },
              }}
            >
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  John Doe
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Premium Member
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: '0 16px 16px 0',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <StoreIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={800}>
              ShopHub
            </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                button
                component={Link}
                to={item.path}
                onClick={toggleDrawer}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Theme
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                <Typography>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Typography>
              </Box>
              <Switch checked={isDarkMode} onChange={toggleTheme} />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;