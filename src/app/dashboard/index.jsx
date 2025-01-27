import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Grid,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiDollarSign,
  FiUsers,
  FiShoppingBag,
  FiPackage,
  FiActivity,
} from "react-icons/fi";
import EmptyStatePage from "../../components/emptyState";
import MetricCard from "../../components/cards/MetricCard";
import SalesChart from "./components/SalesChart";
import RecentActivities from "./components/RecentActivities";
import PopularProducts from "./components/PopularProducts";
import RegionalGrowth from "./components/RegionalGrowth";
import {
  getDashboardMetrics,
  getSalesTarget,
  getSalesTrends,
  getCustomerGrowth,
  getPopularProducts,
  getRecentActivities,
  getLoading,
} from "./redux/selector";
import { fetch_dashboard_data, fetch_sales_metrics, updateFilters } from "./redux/reducer";
import LoadingSpinner from "../../components/LoadingSpinner";
import SalesTarget from "./components/SalesTarget";
import RevenueTargets from '../../components/dashboard/RevenueTargets';
import PerformanceChart from '../../components/dashboard/PerformanceChart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const metrics = useSelector(getDashboardMetrics);
  const profile = useSelector((state) => state.accountSettings.data.profile);
  const salesTarget = useSelector(getSalesTarget);
  const salesTrends = useSelector(getSalesTrends);
  const customerGrowth = useSelector(getCustomerGrowth);
  const popularProducts = useSelector(getPopularProducts);
  const recentActivities = useSelector(getRecentActivities);
  const loading = useSelector(getLoading);

  const [timeRange, setTimeRange] = useState("weekly");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headerBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (profile?.role !== "admin") {
      navigate("/userdashboard");
      return;
    }

    dispatch(updateFilters({ region: 'all', timeRange }));
    dispatch(fetch_dashboard_data());
  }, [dispatch, profile, navigate, timeRange]);

  useEffect(() => {
    dispatch(fetch_sales_metrics({ timeRange }));
  }, [dispatch, timeRange]);

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
    dispatch(updateFilters({ timeRange: newTimeRange }));
    dispatch(fetch_sales_metrics({ timeRange: newTimeRange }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderContent = () => {
    if (!metrics || Object.keys(metrics).length === 0) {
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
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
          mb={8}
        >
          <MetricCard
            title="Total Revenue"
            value={`₦${(metrics.revenue?.value || 0).toLocaleString()}`}
            growth={metrics.revenue?.growth || 0}
            icon={FiDollarSign}
            secondaryValue={`₦${(metrics.revenue?.previousValue || 0).toLocaleString()}`}
            secondaryLabel="Previous Period"
          />
          <MetricCard
            title="Total Customers"
            value={(metrics.customers?.value || 0).toLocaleString()}
            growth={metrics.customers?.growth || 0}
            icon={FiUsers}
            secondaryValue={metrics.customers?.newCustomers || 0}
            secondaryLabel="New Customers"
          />
          <MetricCard
            title="Total Transactions"
            value={(metrics.transactions?.value || 0).toLocaleString()}
            growth={metrics.transactions?.growth || 0}
            icon={FiShoppingBag}
            secondaryValue={`₦${metrics.transactions?.avgTicketSize || 0}`}
            secondaryLabel="Avg. Ticket Size"
          />
          <MetricCard
            title="Total Products"
            value={(metrics.products?.value || 0).toLocaleString()}
            growth={metrics.products?.growth || 0}
            icon={FiPackage}
            secondaryValue={metrics.products?.outOfStock || 0}
            secondaryLabel="Out of Stock"
          />
        </Grid>

        <Box mb={8}>
          <SalesTarget salesTarget={salesTarget} />
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
          <SalesChart
            data={
              timeRange === "weekly" ? salesTrends.weekly : salesTrends.monthly
            }
            timeRange={timeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
          <RecentActivities activities={recentActivities} />
        </Grid>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6} mb={8}>
          <RevenueTargets 
            salesTarget={salesTarget}
            performanceMetrics={metrics.revenue}
          />
          <PerformanceChart 
            data={salesTrends.daily}
            timeRange={timeRange}
          />
        </Grid>

        <PopularProducts products={popularProducts} />

        <RegionalGrowth regions={customerGrowth} />
      </>
    );
  };

  return (
    <Container
      maxW="container.xl"
      bg={bgColor}
      py={{ base: 4, md: 8 }}
      px={{ base: 2, md: 8 }}
    >
      <Flex
        px={{ base: 4, md: 8 }}
        py={4}
        bg={headerBgColor}
        borderRadius="lg"
        borderColor={borderColor}
        justify="space-between"
        align="center"
        mb={6}
      >
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
          Dashboard
        </Text>
      </Flex>

      <Box px={{ base: 2, md: 8 }}>{renderContent()}</Box>
    </Container>
  );
};

export default Dashboard;
