import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Chip,
  Divider,
  Rating,
  Collapse,
  IconButton,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const FilterSidebar = ({
  open,
  onClose,
  filters,
  onFilterChange,
  categories,
  brands,
  isMinimized,
  onToggleMinimize,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    brands: true,
    features: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (event, newValue) => {
    onFilterChange({ priceRange: newValue });
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories?.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...(filters.categories || []), category];
    onFilterChange({ categories: newCategories });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ minRating: rating });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands?.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...(filters.brands || []), brand];
    onFilterChange({ brands: newBrands });
  };

  const handleFeatureChange = (feature) => {
    const newFeatures = filters.features?.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...(filters.features || []), feature];
    onFilterChange({ features: newFeatures });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, 1000],
      minRating: 0,
      brands: [],
      features: [],
      sortBy: 'featured',
    });
  };

  const features = [
    'Free Shipping',
    'Express Delivery',
    'In Stock',
    'On Sale',
    'Best Seller',
  ];

  // Minimized Sidebar View
  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          sx={{
            position: 'sticky',
            top: 100,
            width: 60,
            height: 'calc(100vh - 120px)',
            borderRadius: 3,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Toggle Button */}
          <Tooltip title="Expand Filters" placement="right">
            <IconButton
              onClick={onToggleMinimize}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>

          <Divider sx={{ width: '80%', my: 1 }} />

          {/* Quick Filters */}
          <Tooltip title="All Categories" placement="right">
            <IconButton
              size="small"
              onClick={() => onFilterChange({ categories: [] })}
              sx={{
                color: filters.categories?.length === 0 ? 'primary.main' : 'text.secondary',
              }}
            >
              <Box sx={{ fontSize: 20 }}>📁</Box>
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset Filters" placement="right">
            <IconButton
              size="small"
              onClick={clearFilters}
              sx={{ color: 'text.secondary' }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider sx={{ width: '80%', my: 1 }} />

          {/* Quick Category Filters */}
          {categories.slice(0, 4).map((category) => (
            <Tooltip key={category.id} title={category.name} placement="right">
              <IconButton
                size="small"
                onClick={() => handleCategoryChange(category.id)}
                sx={{
                  color: filters.categories?.includes(category.id) 
                    ? 'primary.main' 
                    : 'text.secondary',
                }}
              >
                <Box sx={{ fontSize: 16 }}>{category.icon}</Box>
              </IconButton>
            </Tooltip>
          ))}

          <Box sx={{ flex: 1 }} />

          {/* Active Filters Count */}
          <Chip
            label={
              (filters.categories?.length || 0) +
              (filters.minRating > 0 ? 1 : 0) +
              (filters.brands?.length || 0) +
              (filters.features?.length || 0)
            }
            size="small"
            color="primary"
            sx={{ fontSize: '0.7rem', height: 20 }}
          />
        </Paper>
      </motion.div>
    );
  }

  // Expanded Sidebar View
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        sx={{
          position: 'sticky',
          top: 100,
          width: 280,
          height: 'calc(100vh - 120px)',
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon />
            <Typography variant="h6" fontWeight={600}>
              Filters
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Minimize">
              <IconButton
                size="small"
                onClick={onToggleMinimize}
                sx={{ color: 'white' }}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton
                size="small"
                onClick={onClose}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
          {/* Categories */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                cursor: 'pointer',
              }}
              onClick={() => toggleSection('categories')}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Categories
              </Typography>
              {expandedSections.categories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedSections.categories}>
              <FormGroup>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        checked={filters.categories?.includes(category.id) || false}
                        onChange={() => handleCategoryChange(category.id)}
                        size="small"
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ fontSize: 16 }}>{category.icon}</Box>
                          <Typography variant="body2">{category.name}</Typography>
                        </Box>
                        <Chip
                          label={category.count}
                          size="small"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    }
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </FormGroup>
            </Collapse>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Price Range */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                cursor: 'pointer',
              }}
              onClick={() => toggleSection('price')}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Price Range
              </Typography>
              {expandedSections.price ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedSections.price}>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={filters.priceRange || [0, 1000]}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                  sx={{
                    color: 'primary.main',
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: 'primary.main',
                      borderRadius: 2,
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">${filters.priceRange?.[0] || 0}</Typography>
                  <Typography variant="body2">${filters.priceRange?.[1] || 1000}</Typography>
                </Box>
              </Box>
            </Collapse>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Rating */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                cursor: 'pointer',
              }}
              onClick={() => toggleSection('rating')}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Rating
              </Typography>
              {expandedSections.rating ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedSections.rating}>
              <Box>
                {[4, 3, 2, 1].map((rating) => (
                  <Box
                    key={rating}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      cursor: 'pointer',
                      backgroundColor: filters.minRating === rating ? 'action.selected' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                    onClick={() => handleRatingChange(rating === filters.minRating ? 0 : rating)}
                  >
                    <Rating value={rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {rating}+ Stars
                    </Typography>
                    {filters.minRating === rating && (
                      <StarIcon sx={{ ml: 'auto', fontSize: 16, color: 'warning.main' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Brands */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                cursor: 'pointer',
              }}
              onClick={() => toggleSection('brands')}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Brands
              </Typography>
              {expandedSections.brands ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedSections.brands}>
              <FormGroup>
                {brands.map((brand) => (
                  <FormControlLabel
                    key={brand.id}
                    control={
                      <Checkbox
                        checked={filters.brands?.includes(brand.id) || false}
                        onChange={() => handleBrandChange(brand.id)}
                        size="small"
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{brand.name}</Typography>
                        <Chip
                          label={brand.count}
                          size="small"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    }
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </FormGroup>
            </Collapse>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Features */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                cursor: 'pointer',
              }}
              onClick={() => toggleSection('features')}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Features
              </Typography>
              {expandedSections.features ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedSections.features}>
              <FormGroup>
                {features.map((feature) => (
                  <FormControlLabel
                    key={feature}
                    control={
                      <Checkbox
                        checked={filters.features?.includes(feature) || false}
                        onChange={() => handleFeatureChange(feature)}
                        size="small"
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {feature}
                      </Typography>
                    }
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </FormGroup>
            </Collapse>
          </Box>

          {/* Clear Filters Button */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            sx={{ mt: 2 }}
          >
            Clear All Filters
          </Button>

          {/* Active Filters */}
          {(filters.categories?.length > 0 ||
            filters.minRating > 0 ||
            filters.brands?.length > 0 ||
            filters.features?.length > 0) && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Active Filters
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {filters.categories?.map((categoryId) => {
                  const category = categories.find((c) => c.id === categoryId);
                  return (
                    <Chip
                      key={categoryId}
                      label={category?.name}
                      size="small"
                      onDelete={() => handleCategoryChange(categoryId)}
                    />
                  );
                })}
                {filters.minRating > 0 && (
                  <Chip
                    label={`${filters.minRating}+ Stars`}
                    size="small"
                    onDelete={() => handleRatingChange(0)}
                    icon={<StarIcon sx={{ fontSize: 14 }} />}
                  />
                )}
                {filters.brands?.map((brandId) => {
                  const brand = brands.find((b) => b.id === brandId);
                  return (
                    <Chip
                      key={brandId}
                      label={brand?.name}
                      size="small"
                      onDelete={() => handleBrandChange(brandId)}
                    />
                  );
                })}
                {filters.features?.map((feature) => (
                  <Chip
                    key={feature}
                    label={feature}
                    size="small"
                    onDelete={() => handleFeatureChange(feature)}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default FilterSidebar;