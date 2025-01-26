import {
  Box, Flex, Text, Button, useColorModeValue
} from '@chakra-ui/react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import DashboardCard from '../../../components/cards/DashboardCard';
import EmptyStatePage from '../../../components/emptyState';
import { FiTrendingUp } from 'react-icons/fi';

const SalesChart = ({ data, timeRange, onTimeRangeChange }) => {
  const strokeColor = useColorModeValue('#718096', '#A0AEC0');

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
      <Flex 
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between" 
        align={{ base: 'stretch', sm: 'center' }}
        mb={6} 
        gap={4}
      >
        <Text fontSize="lg" fontWeight="medium">Sales Overview</Text>
        <Flex gap={2} justify={{ base: 'center', sm: 'flex-end' }}>
          {['weekly', 'monthly'].map((range) => (
            <Button
              key={range}
              size="sm"
              width={{ base: '100%', sm: 'auto' }}
              variant={timeRange === range ? 'solid' : 'ghost'}
              onClick={() => onTimeRangeChange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </Flex>
      </Flex>

      <Box height={{ base: "250px", md: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ 
              top: 10, 
              right: 10, 
              left: 0, 
              bottom: 0 
            }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3182CE" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={timeRange === 'weekly' ? 'day' : 'month'} 
              stroke={strokeColor}
            />
            <YAxis 
              stroke={strokeColor}
              tickFormatter={value => `₦${(value/1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={value => `₦${value.toLocaleString()}`}
            />
            <Area
              type="monotone"
              dataKey={timeRange === 'weekly' ? 'sales' : 'revenue'}
              stroke="#3182CE"
              fillOpacity={1}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </DashboardCard>
  );
};

export default SalesChart;
