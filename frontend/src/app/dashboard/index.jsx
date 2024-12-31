import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Flex, Text, Grid, Button, Container, useColorModeValue
} from '@chakra-ui/react';
import {
  FiDollarSign, FiUsers, FiShoppingBag, FiPackage, FiActivity
} from 'react-icons/fi';
import EmptyStatePage from '../../components/emptyState';
import MetricCard from '../../components/cards/MetricCard';
import SalesChart from './components/SalesChart';
import RecentActivities from './components/RecentActivities';
import PopularProducts from './components/PopularProducts';
import RegionalGrowth from './components/RegionalGrowth';
import { 
  getDashboardMetrics,
  getSalesTarget,
  getSalesTrends,
  getCustomerGrowth,
  getPopularProducts,
  getRecentActivities,
  getLoading 
} from './redux/selector';
import { 
  fetch_dashboard_data, 
  fetch_sales_metrics 
} from './redux/reducer';

const Dashboard = () => {
  const dispatch = useDispatch();
  const metrics = useSelector(getDashboardMetrics);
  const salesTarget = useSelector(getSalesTarget);
  const salesTrends = useSelector(getSalesTrends);
  const customerGrowth = useSelector(getCustomerGrowth);
  const popularProducts = useSelector(getPopularProducts);
  const recentActivities = useSelector(getRecentActivities);
  const loading = useSelector(getLoading);
  
  const [timeRange, setTimeRange] = useState('weekly');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    dispatch(fetch_dashboard_data());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetch_sales_metrics({ timeRange }));
  }, [dispatch, timeRange]);

  if (loading) {
    return <Box p={8}>Loading...</Box>;
  }

  const renderContent = () => {
    if (!metrics || !salesTarget) {
      return (
        <EmptyStatePage
          title="No Dashboard Data"
          sub="There seems to be an issue loading your dashboard data"
          icon={<FiActivity size={50} />}
        />
      );
    }

    return (
      <>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={6}
          mb={8}
        >
          <MetricCard
            title="Total Revenue"
            value={`$${metrics.revenue.value.toLocaleString()}`}
            growth={metrics.revenue.growth}
            icon={FiDollarSign}
            secondaryValue={`$${metrics.revenue.previousValue.toLocaleString()}`}
            secondaryLabel="Previous Period"
          />
          <MetricCard
            title="Total Customers"
            value={metrics.customers.value.toLocaleString()}
            growth={metrics.customers.growth}
            icon={FiUsers}
            secondaryValue={metrics.customers.newCustomers}
            secondaryLabel="New Customers"
          />
          <MetricCard
            title="Total Transactions"
            value={metrics.transactions.value.toLocaleString()}
            growth={metrics.transactions.growth}
            icon={FiShoppingBag}
            secondaryValue={`$${metrics.transactions.avgTicketSize}`}
            secondaryLabel="Avg. Ticket Size"
          />
          <MetricCard
            title="Total Products"
            value={metrics.products.value.toLocaleString()}
            growth={metrics.products.growth}
            icon={FiPackage}
            secondaryValue={metrics.products.outOfStock}
            secondaryLabel="Out of Stock"
          />
        </Grid>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={8}>
          <SalesChart
            data={timeRange === 'weekly' ? salesTrends.weekly : salesTrends.monthly}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
          <RecentActivities activities={recentActivities} />
        </Grid>

        <PopularProducts products={popularProducts} />

        <RegionalGrowth regions={customerGrowth} />
      </>
    );
  };

  return (
    <Container maxW="container.xl" bg={bgColor} py={8}>
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
          Dashboard
        </Text>
      </Flex>

      <Box p={8}>
        {renderContent()}
      </Box>
    </Container>
  );
};

export default Dashboard;