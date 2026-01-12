import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
  Chip,
  Rating,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as CartIcon,
  Visibility as VisibilityIcon,
  Bolt as BoltIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onAddToCart, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const [quickView, setQuickView] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: {
        borderRadius: '12px',
        background: '#10B981',
        color: '#fff',
      },
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(product.id);
    toast.success(
      !isFavorite ? 'Added to favorites!' : 'Removed from favorites!',
      {
        icon: !isFavorite ? '❤️' : '💔',
      }
    );
  };

  const getDiscountBadge = () => {
    if (product.discount > 0) {
      return (
        <Chip
          label={`-${product.discount}%`}
          color="error"
          size="small"
          icon={<OfferIcon sx={{ fontSize: 14 }} />}
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontWeight: 700,
            fontSize: '0.75rem',
          }}
        />
      );
    }
    return null;
  };

  const getStockBadge = () => {
    if (product.stock <= 10 && product.stock > 0) {
      return (
        <Chip
          label={`Only ${product.stock} left`}
          color="warning"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
      );
    }
    if (product.stock === 0) {
      return (
        <Chip
          label="Out of stock"
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
      );
    }
    return null;
  };

  const calculateDiscountedPrice = () => {
    if (product.discount > 0) {
      return product.price * (1 - product.discount / 100);
    }
    return product.price;
  };

  const discountedPrice = calculateDiscountedPrice();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
        className="hover-lift"
      >
        {/* Product Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt={product.name}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          
          {getDiscountBadge()}
          {getStockBadge()}

          {/* Quick Actions Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              padding: '16px',
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Tooltip title="Quick View">
              <IconButton
                size="small"
                sx={{
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: 'grey.100' },
                }}
                onClick={() => setQuickView(true)}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: 'grey.100' },
                }}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? (
                  <FavoriteIcon fontSize="small" color="error" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </motion.div>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          {/* Category */}
          <Chip
            label={product.category}
            size="small"
            sx={{
              mb: 1,
              fontSize: '0.7rem',
              backgroundColor: 'primary.light',
              color: 'white',
            }}
          />

          {/* Product Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '3em',
            }}
          >
            {product.name}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '3em',
            }}
          >
            {product.description}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              value={product.rating}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviewCount})
            </Typography>
            {product.isTrending && (
              <Chip
                icon={<BoltIcon />}
                label="Trending"
                size="small"
                color="warning"
                variant="outlined"
                sx={{ ml: 'auto', fontSize: '0.6rem' }}
              />
            )}
          </Box>

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                }}
              >
                ${discountedPrice.toFixed(2)}
              </Typography>
              {product.discount > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.disabled',
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'error.main',
                      fontWeight: 600,
                    }}
                  >
                    Save ${(product.price - discountedPrice).toFixed(2)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Add to Cart Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<CartIcon />}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            sx={{
              borderRadius: 2,
              py: 1,
              fontWeight: 600,
              transition: 'all 0.3s ease',
              ...(product.stock === 0 && {
                backgroundColor: 'grey.300',
                color: 'grey.500',
              }),
            }}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardContent>

        {/* Express Delivery Badge */}
        {product.expressDelivery && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
            }}
          >
            <Tooltip title="Express Delivery Available">
              <Badge
                color="success"
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    animation: 'pulse 2s infinite',
                  },
                }}
              />
            </Tooltip>
          </Box>
        )}
      </Card>
    </motion.div>
  );
};

export default ProductCard;