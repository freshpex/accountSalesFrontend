import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Box, Text, Flex } from '@chakra-ui/react';

const PerformanceChart = ({ data, timeRange }) => {
  const formatXAxis = () => {
    return timeRange === 'weekly'
  };

  return (
    <Box p={6} bg="white" borderRadius="lg" shadow="sm" h="400px">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="medium">Performance Trend</Text>
      </Flex>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="_id" 
            tickFormatter={formatXAxis}
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="dailyRevenue"
            stroke="#3182ce"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PerformanceChart;