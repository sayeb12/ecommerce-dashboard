import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Chip,
  Divider,
  Rating,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  LocalOffer as OfferIcon,
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
}) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 1000]);
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
    setPriceRange(newValue);
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
    setPriceRange([0, 1000]);
  };

  const features = [
    'Free Shipping',
    'Express Delivery',
    'In Stock',
    'On Sale',
    'Best Seller',
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          borderRadius: '0 16px 16px 0',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon />
            <Typography variant="h6" fontWeight={600}>
              Filters
            </Typography>
          </Box>
          <Button
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Clear All
          </Button>
        </Box>

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
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2">{category.name}</Typography>
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
                value={priceRange}
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
                <Typography variant="body2">${priceRange[0]}</Typography>
                <Typography variant="body2">${priceRange[1]}</Typography>
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
    </Drawer>
  );
};

export default FilterSidebar;