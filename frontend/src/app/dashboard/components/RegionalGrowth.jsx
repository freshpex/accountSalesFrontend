import {
  Grid, Flex, Text,
  Box, Button, IconButton,
  useColorModeValue, Container, Stack, Circle,
  Progress, Table, Thead, Tbody, Tr, Th, Td, Image, Badge
} from '@chakra-ui/react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  FiDollarSign, FiUsers, FiShoppingBag,
  FiPackage, FiFilter, FiDownload
} from 'react-icons/fi';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_sales_report, update_filters } from '../redux/reducer';
import { getSalesReportData, getSalesReportLoading, getSalesReportError } from '../redux/selector';
import DashboardCard from '../../../components/cards/DashboardCard';
import MetricCard from '../../../components/cards/MetricCard';
import EmptyStatePage from '../../../components/emptyState';
import RegionCard from '../../../components/cards/RegionCard';

const SalesReport = () => {
  const dispatch = useDispatch();
  const data = useSelector(getSalesReportData);
  const loading = useSelector(getSalesReportLoading);
  const error = useSelector(getSalesReportError);
  const [timeRange, setTimeRange] = useState('monthly');

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    dispatch(update_filters({ dateRange: range }));
    dispatch(fetch_sales_report());
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex
        px={8}
        py={4}
        bg={useColorModeValue('white', 'gray.800')}
        borderBottom="1px solid"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        justify="space-between"
        align="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          Sales Report
        </Text>
      </Flex>

      <Box p={8}>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={2}
          mb={8}
        >
          <MetricCard
            title="Total Revenue"
            value={`$${data.summary.totalRevenue}`}
            growth={data.summary.revenueGrowth}
            icon={FiDollarSign}
          />
          <MetricCard
            title="Total Customers"
            value={data.summary.totalCustomers}
            growth={data.summary.customerGrowth}
            icon={FiUsers}
          />
          <MetricCard
            title="Total Transactions"
            value={data.summary.totalTransactions}
            growth={data.summary.transactionGrowth}
            icon={FiShoppingBag}
          />
          <MetricCard
            title="Total Products"
            value={data.summary.totalProducts}
            growth={data.summary.productGrowth}
            icon={FiPackage}
          />
        </Grid>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={2} mb={8}>
          <DashboardCard>
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="medium">
                Sales Overview
              </Text>
              <Flex gap={2}>
                {['monthly', 'yearly'].map((range) => (
                  <Button
                    key={range}
                    size="sm"
                    variant={timeRange === range ? 'solid' : 'ghost'}
                    onClick={() => handleTimeRangeChange(range)}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </Button>
                ))}
              </Flex>
            </Flex>

            <Box height={{ base: "200px", md: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timeRange === 'monthly' ? data.monthlySales : data.yearlySales}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3182CE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={timeRange === 'monthly' ? 'month' : 'year'}
                    stroke={useColorModeValue('#718096', '#A0AEC0')}
                  />
                  <YAxis stroke={useColorModeValue('#718096', '#A0AEC0')} />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3182CE"
                    fillOpacity={1}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </DashboardCard>

          <DashboardCard>
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="medium">Regional Sales</Text>
              <IconButton
                icon={<FiFilter />}
                variant="ghost"
                size="sm"
                aria-label="Filter regional sales"
              />
            </Flex>

            <Stack spacing={2}>
              {data.regionalData.map((region) => (
                <Flex key={region.name} align="center" justify="space-between">
                  <Box>
                    <Text fontSize="sm" fontWeight="medium">{region.name}</Text>
                    <Text fontSize="xs" color="gray.500">{region.sales}</Text>
                  </Box>
                  <Badge colorScheme="green">${region.sales}</Badge>
                </Flex>
              ))}
            </Stack>
          </DashboardCard>
        </Grid>

        <DashboardCard>
          <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
            <Text fontSize="lg" fontWeight="medium">Popular Products</Text>
            <Button
              leftIcon={<FiDownload />}
              size="sm"
              variant="outline"
            >
              Export
            </Button>
          </Flex>

          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Price</Th>
                  <Th>Sales</Th>
                  <Th>Inventory</Th>
                  <Th>Rating</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.popularProducts.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <Flex align="center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fallbackSrc="https://via.placeholder.com/40"
                          boxSize="40px"
                          objectFit="cover"
                          borderRadius="md"
                          mr={3}
                        />
                        <Box>
                          <Text fontWeight="medium">{product.name}</Text>
                          <Text fontSize="sm" color="gray.500">#{product.id}</Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td>${product.price.toFixed(2)}</Td>
                    <Td>
                      <Text fontWeight="medium">{product.sales.toLocaleString()}</Text>
                    </Td>
                    <Td>
                      <Flex align="center">
                        <Progress
                          value={(product.inventory / 2000) * 100}
                          size="sm"
                          w="70px"
                          colorScheme={product.inventory < 1000 ? "orange" : "green"}
                          mr={2}
                        />
                        <Text fontSize="sm">{product.inventory}</Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex align="center">
                        <Box as="span" color="yellow.400" mr={1}>★</Box>
                        <Text>{product.rating}</Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={product.status === 'Success' ? 'green' : 'red'}
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {product.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </DashboardCard>
      </Box>
    </Container>
  );
};

const RegionalGrowth = ({ regions }) => {
  if (!regions?.length) {
    return (
      <EmptyStatePage
        title="No Regional Data"
        sub="Regional growth data is not available"
        icon={<FiUsers size={40} />}
      />
    );
  }

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mt={8}>
      {regions.map((region) => (
        <RegionCard key={region.region} region={region} />
      ))}
    </Grid>
  );
};

export default SalesReport;