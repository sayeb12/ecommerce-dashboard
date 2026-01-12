import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, change, icon, color, progress, subtitle }) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
          border: `1px solid ${color}30`,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {typeof value === 'number' ? value.toLocaleString() : value}
              </Typography>
            </Box>
            <Avatar
              sx={{
                backgroundColor: `${color}20`,
                color: color,
                width: 48,
                height: 48,
              }}
            >
              {icon}
            </Avatar>
          </Box>

          {/* Change Indicator */}
          {change !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: isPositive ? 'success.main' : 'error.main',
                  backgroundColor: isPositive ? 'success.50' : 'error.50',
                  padding: '4px 8px',
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {isPositive ? (
                  <TrendingUpIcon sx={{ fontSize: 16 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16 }} />
                )}
                {Math.abs(change)}%
              </Box>
              <Typography variant="caption" color="text.secondary">
                from last month
              </Typography>
            </Box>
          )}

          {/* Progress Bar */}
          {progress !== undefined && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="caption" fontWeight={600}>
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: `${color}20`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: color,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          )}

          {/* Subtitle */}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}

          {/* More Options Button */}
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;