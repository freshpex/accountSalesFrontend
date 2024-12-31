import {
  Box,
  Flex,
  Text,
  Select,
  useColorModeValue
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useState } from 'react';

const CustomerGrowthChart = ({ data }) => {
  const [timeframe, setTimeframe] = useState('6months');
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="medium">Customer Growth</Text>
        <Select
          width="150px"
          size="sm"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="6months">Last 6 months</option>
          <option value="12months">Last 12 months</option>
          <option value="ytd">Year to date</option>
        </Select>
      </Flex>
      {data && data.length > 0 ? (
        <Box h="300px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#3182CE"
                strokeWidth={2}
                name="Active Customers"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="new"
                stroke="#48BB78"
                strokeWidth={2}
                name="New Customers"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="churned"
                stroke="#E53E3E"
                strokeWidth={2}
                name="Churned Customers"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Text textAlign="center" py={10} color="gray.500">No data available</Text>
      )}
    </Box>
  );
};

export default CustomerGrowthChart;
