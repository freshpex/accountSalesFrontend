import {
  Box,
  Grid,
  Flex,
  Text,
  Progress,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { FiUsers, FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import { salesData } from './data';
import StatCard from '../../components/cards/StatCard';

const SalesReport = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} minH="100vh" p={8}>
      <Stack spacing={8}>
        {/* Target Progress */}
        <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">Sales Target</Text>
            <Text fontSize="sm" color="gray.500">
              ${salesData.summary.currentTarget.toLocaleString()} / ${salesData.summary.totalTarget.toLocaleString()}
            </Text>
          </Flex>
          <Progress
            value={(salesData.summary.currentTarget / salesData.summary.totalTarget) * 100}
            size="lg"
            rounded="full"
            colorScheme="blue"
          />
        </Box>

        {/* Stats Grid */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <StatCard
            title="Total Revenue"
            value={`$${salesData.summary.totalRevenue.toLocaleString()}`}
            growth={salesData.summary.revenueGrowth}
            icon={FiDollarSign}
          />
          <StatCard
            title="Total Customers"
            value={salesData.summary.totalCustomers}
            growth={salesData.summary.customerGrowth}
            icon={FiUsers}
          />
          <StatCard
            title="Total Transactions"
            value={salesData.summary.totalTransactions}
            growth={salesData.summary.transactionGrowth}
            icon={FiShoppingBag}
          />
          <StatCard
            title="Total Products"
            value={salesData.summary.totalProducts}
            growth={salesData.summary.productGrowth}
            icon={FiShoppingBag}
          />
        </Grid>

        {/* Sales Chart */}
        <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
          <Text fontSize="lg" fontWeight="bold" mb={6}>Sales Overview</Text>
          <Box h="400px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3182CE" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="itemValue" 
                  stroke="#48BB78" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Popular Products */}
        <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
          <Flex justify="space-between" align="center" mb={6}>
            <Text fontSize="lg" fontWeight="bold">Popular Products</Text>
            <Button size="sm" colorScheme="blue">View All</Button>
          </Flex>
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Sales</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {salesData.popularProducts.map((product) => (
                <Tr key={product.id}>
                  <Td>
                    <Flex align="center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        boxSize="40px"
                        mr={3}
                        rounded="md"
                        fallbackSrc="https://via.placeholder.com/40"
                      />
                      <Text fontWeight="medium">{product.name}</Text>
                    </Flex>
                  </Td>
                  <Td>${product.price}</Td>
                  <Td>{product.sales.toLocaleString()}</Td>
                  <Td>
                    <Text
                      px={3}
                      py={1}
                      rounded="full"
                      fontSize="sm"
                      fontWeight="medium"
                      bg="green.100"
                      color="green.800"
                      display="inline-block"
                    >
                      {product.status}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Box>
  );
};

export default SalesReport;