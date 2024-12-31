import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Grid, Flex, Text, Progress, Stack, Table, Thead, 
  Tbody, Tr, Th, Td, Image, useColorModeValue, Button,
  Select, HStack
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiShoppingBag, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import StatCard from '../../components/cards/StatCard';
import EmptyStatePage from '../../components/emptyState';
import { 
  getSalesSummary, 
  getMonthlySales, 
  getPopularProducts,
  getLoading,
  getFilters
} from './redux/selector';
import { fetch_sales_report, update_filters } from './redux/reducer';

const SalesReport = () => {
  const dispatch = useDispatch();
  const summary = useSelector(getSalesSummary);
  const monthlySales = useSelector(getMonthlySales);
  const popularProducts = useSelector(getPopularProducts);
  const loading = useSelector(getLoading);
  const filters = useSelector(getFilters);
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    dispatch(fetch_sales_report(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    dispatch(update_filters({ [e.target.name]: e.target.value }));
  };

  if (loading) {
    return <Box p={8}>Loading...</Box>;
  }

  const renderContent = () => {
    if (!summary.totalRevenue && !monthlySales.length) {
      return (
        <EmptyStatePage
          title="No Sales Data Available"
          sub="There are no sales records for the selected period"
          icon={<FiBarChart2 size={50} />}
        />
      );
    }

    return (
      <Stack spacing={8}>
        {/* Filters */}
        <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
          <HStack spacing={4}>
            <Select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </Select>
            <Select
              name="region"
              value={filters.region}
              onChange={handleFilterChange}
            >
              <option value="all">All Regions</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </Select>
          </HStack>
        </Box>

        {/* Target Progress */}
        <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">Sales Target</Text>
            <Text fontSize="sm" color="gray.500">
              ${summary.currentTarget.toLocaleString()} / ${summary.totalTarget.toLocaleString()}
            </Text>
          </Flex>
          <Progress
            value={(summary.currentTarget / summary.totalTarget) * 100}
            size="lg"
            rounded="full"
            colorScheme="blue"
          />
        </Box>

        {/* Stats Grid */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <StatCard
            title="Total Revenue"
            value={`$${summary.totalRevenue.toLocaleString()}`}
            growth={summary.revenueGrowth}
            icon={FiDollarSign}
          />
          <StatCard
            title="Total Customers"
            value={summary.totalCustomers}
            growth={summary.customerGrowth}
            icon={FiUsers}
          />
          <StatCard
            title="Total Transactions"
            value={summary.totalTransactions}
            growth={summary.transactionGrowth}
            icon={FiShoppingBag}
          />
          <StatCard
            title="Total Products"
            value={summary.totalProducts}
            growth={summary.productGrowth}
            icon={FiShoppingBag}
          />
        </Grid>

        {/* Sales Chart */}
        {monthlySales.length > 0 && (
          <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
            <Text fontSize="lg" fontWeight="bold" mb={6}>Sales Overview</Text>
            <Box h="400px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3182CE" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="itemValue" stroke="#48BB78" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}

        {/* Popular Products */}
        {popularProducts.length > 0 ? (
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
                {popularProducts.map((product) => (
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
                        bg={product.status === 'Success' ? 'green.100' : 'red.100'}
                        color={product.status === 'Success' ? 'green.800' : 'red.800'}
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
        ) : (
          <EmptyStatePage
            title="No Popular Products"
            sub="There are no popular products to display for the selected period"
            icon={<FiShoppingBag size={50} />}
          />
        )}
      </Stack>
    );
  };

  return (
    <Box bg={bgColor} minH="100vh" p={8}>
      {renderContent()}
    </Box>
  );
};

export default SalesReport;