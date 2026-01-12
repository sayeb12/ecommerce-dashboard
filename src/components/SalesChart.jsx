import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SalesChart = () => {
  const [chartType, setChartType] = React.useState('line');
  const [timeRange, setTimeRange] = React.useState('month');

  const monthlyData = [
    { month: 'Jan', sales: 45000, orders: 120, revenue: 55000 },
    { month: 'Feb', sales: 52000, orders: 145, revenue: 62000 },
    { month: 'Mar', sales: 48000, orders: 130, revenue: 58000 },
    { month: 'Apr', sales: 61000, orders: 165, revenue: 72000 },
    { month: 'May', sales: 57000, orders: 150, revenue: 67000 },
    { month: 'Jun', sales: 69000, orders: 185, revenue: 82000 },
    { month: 'Jul', sales: 73000, orders: 195, revenue: 88000 },
    { month: 'Aug', sales: 68000, orders: 180, revenue: 81000 },
    { month: 'Sep', sales: 75000, orders: 200, revenue: 90000 },
    { month: 'Oct', sales: 82000, orders: 220, revenue: 98000 },
    { month: 'Nov', sales: 78000, orders: 210, revenue: 94000 },
    { month: 'Dec', sales: 95000, orders: 250, revenue: 112000 },
  ];

  const weeklyData = [
    { day: 'Mon', sales: 12000, orders: 35 },
    { day: 'Tue', sales: 15000, orders: 42 },
    { day: 'Wed', sales: 18000, orders: 48 },
    { day: 'Thu', sales: 16000, orders: 45 },
    { day: 'Fri', sales: 22000, orders: 58 },
    { day: 'Sat', sales: 25000, orders: 65 },
    { day: 'Sun', sales: 20000, orders: 52 },
  ];

  const data = timeRange === 'month' ? monthlyData : weeklyData;
  const xKey = timeRange === 'month' ? 'month' : 'day';

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const salesGrowth = 24.5;
  const orderGrowth = 18.2;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {entry.name}: {entry.value.toLocaleString()}
              {entry.name === 'sales' || entry.name === 'revenue' ? '$' : ''}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Sales Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overview of revenue and orders
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <ToggleButtonGroup
                value={timeRange}
                exclusive
                onChange={(e, newRange) => newRange && setTimeRange(newRange)}
                size="small"
              >
                <ToggleButton value="week">Week</ToggleButton>
                <ToggleButton value="month">Month</ToggleButton>
                <ToggleButton value="year">Year</ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={(e, newType) => newType && setChartType(newType)}
                size="small"
              >
                <ToggleButton value="line">Line</ToggleButton>
                <ToggleButton value="bar">Bar</ToggleButton>
                <ToggleButton value="area">Area</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Stats Summary */}
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                ${totalSales.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {salesGrowth >= 0 ? (
                  <TrendingUp sx={{ color: 'success.main', fontSize: 20 }} />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', fontSize: 20 }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: salesGrowth >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 600,
                  }}
                >
                  {salesGrowth}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  from last {timeRange}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Total Sales
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={700}>
                {totalOrders}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {orderGrowth >= 0 ? (
                  <TrendingUp sx={{ color: 'success.main', fontSize: 20 }} />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', fontSize: 20 }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: orderGrowth >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 600,
                  }}
                >
                  {orderGrowth}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  from last {timeRange}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Total Orders
              </Typography>
            </Box>
          </Box>

          {/* Chart */}
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey={xKey} stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#7C3AED"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Sales ($)"
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Orders"
                  />
                </LineChart>
              ) : chartType === 'bar' ? (
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey={xKey} stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="sales"
                    fill="#7C3AED"
                    radius={[4, 4, 0, 0]}
                    name="Sales ($)"
                  />
                  <Bar
                    dataKey="orders"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                    name="Orders"
                  />
                </BarChart>
              ) : (
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey={xKey} stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#7C3AED"
                    fill="url(#colorSales)"
                    strokeWidth={2}
                    name="Sales ($)"
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#10B981"
                    fill="url(#colorOrders)"
                    strokeWidth={2}
                    name="Orders"
                  />
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              )}
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesChart;