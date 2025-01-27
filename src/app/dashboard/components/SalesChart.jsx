import {
  Box,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardCard from "../../../components/cards/DashboardCard";
import EmptyStatePage from "../../../components/emptyState";
import { FiTrendingUp } from "react-icons/fi";

const SalesChart = ({ data = [], timeRange, onTimeRangeChange }) => {
  const chartData = data?.map(item => ({
    name: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    revenue: item.revenue || 0,
    profit: item.profit || 0,
    orders: item.orders || 0,
    date: item.date,
  })) || [];

  const formatCurrency = (value) => `₦${value.toLocaleString()}`;

  if (!data || !data.length) {
    return (
      <DashboardCard>
        <EmptyStatePage
          title="No Sales Data"
          sub="No sales data available for the selected period"
          icon={<FiTrendingUp size={40} />}
        />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="medium">Sales Trends</Text>
        <Select
          w="150px"
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
      </Flex>

      <Box height={{ base: "250px", md: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3182CE" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value, name) => [
                formatCurrency(value),
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3182CE"
              fillOpacity={1}
              fill="url(#revenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </DashboardCard>
  );
};

export default SalesChart;
