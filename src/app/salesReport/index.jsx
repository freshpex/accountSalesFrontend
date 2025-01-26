import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Grid, Flex, Text, Progress, Stack, Table, Thead, 
  Tbody, Tr, Th, Td, useColorModeValue, Button,
  Select, HStack
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiShoppingBag, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
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
import LoadingSpinner from '../../components/LoadingSpinner';

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
    const fetchData = () => {
      dispatch(fetch_sales_report({
        dateRange: filters.dateRange,
        startDate: filters.startDate,
        endDate: filters.endDate,
        region: filters.region
      }));
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval);
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    dispatch(update_filters({ [e.target.name]: e.target.value }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderRegionalData = () => {
    if (!summary.regionalData?.length) return null;
    
    return (
      <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
        <Text fontSize="lg" fontWeight="bold" mb={6}>Regional Performance</Text>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          {summary.regionalData.map((region) => (
            <Box key={region.region} p={4} bg="gray.50" rounded="lg">
              <Text fontWeight="medium">{region.region}</Text>
              <Text fontSize="2xl">{region.growth}%</Text>
            </Box>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderPopularProducts = () => {
    if (!popularProducts?.length) return null;

    return (
      <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
        <Flex justify="space-between" align="center" mb={6}>
          <Text fontSize="lg" fontWeight="bold">Popular Products</Text>
          <Button size="sm" colorScheme="blue">View All</Button>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Revenue</Th>
              <Th>Units</Th>
              <Th>Growth</Th>
            </Tr>
          </Thead>
          <Tbody>
            {popularProducts.map((product) => (
              <Tr key={product.id || Math.random()}>
                <Td>
                  <Flex align="center">
                    <Text fontWeight="medium">{product.name || 'N/A'}</Text>
                  </Flex>
                </Td>
                <Td>${(product.revenue || 0).toLocaleString()}</Td>
                <Td>{(product.units || 0).toLocaleString()}</Td>
                <Td>
                  <Text
                    px={3}
                    py={1}
                    rounded="full"
                    fontSize="sm"
                    fontWeight="medium"
                    bg={(product.growth || 0) >= 0 ? 'green.100' : 'red.100'}
                    color={(product.growth || 0) >= 0 ? 'green.800' : 'red.800'}
                    display="inline-block"
                  >
                    {(product.growth || 0)}%
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };

  const renderContent = () => {
    if (!summary || !summary.totalRevenue) {
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
              <option value="usa">USA</option>
              <option value="london">London</option>
              <option value="korea">Korea</option>
            </Select>
          </HStack>
        </Box>

        {/* Target Progress */}
        <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">Sales Target</Text>
            <Text fontSize="sm" color="gray.500">
              ${(summary.currentTarget || 0).toLocaleString()} / ${(summary.totalTarget || 0).toLocaleString()}
            </Text>
          </Flex>
          <Progress
            value={((summary.currentTarget || 0) / (summary.totalTarget || 1)) * 100}
            size="lg"
            rounded="full"
            colorScheme="blue"
          />
        </Box>

        {/* Stats Grid */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <StatCard
            title="Total Revenue"
            value={`₦${(summary.totalRevenue || 0).toLocaleString()}`}
            growth={summary.revenueGrowth || 0}
            icon={FiDollarSign}
          />
          <StatCard
            title="Total Sales"
            value={(summary.totalTransactions || 0).toLocaleString()}
            growth={summary.transactionGrowth || 0}
            icon={FiShoppingBag}
          />
          <StatCard
            title="Products"
            value={(summary.totalProducts || 0).toLocaleString()}
            growth={summary.productGrowth || 0}
            icon={FiShoppingBag}
          />
          <StatCard
            title="Growth"
            value={`${summary.revenueGrowth || 0}%`}
            growth={summary.revenueGrowth || 0}
            icon={FiBarChart2}
          />
        </Grid>

        {/* Regional Data */}
        {renderRegionalData()}

        {/* Sales Chart */}
        {monthlySales?.length > 0 && (
          <Box bg={cardBg} p={6} rounded="xl" shadow="lg">
            <Text fontSize="lg" fontWeight="bold" mb={6}>Monthly Sales Overview</Text>
            <Box h="400px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Revenue"
                    stroke="#3182CE" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="itemValue" 
                    name="Average Item Value"
                    stroke="#48BB78" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}

        {/* Popular Products */}
        {renderPopularProducts()}
      </Stack>
    );
  };

  return (
    <Box bg={bgColor} minH="100vh" p={8}>
      {loading ? <LoadingSpinner /> : renderContent()}
    </Box>
  );
};

export default SalesReport;