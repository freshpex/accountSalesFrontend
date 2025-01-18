import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Circle,
  Icon,
  Button,
  Badge,
  Progress,
  useBreakpointValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
} from '@chakra-ui/react';
import {
  FiShoppingBag,
  FiDollarSign,
  FiBell,
  FiShield,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useColors } from '../../utils/colors';
import { OverviewPanel, ProductsPanel, HistoryPanel } from './components/TabPanels';
import {
  fetchDashboardOverview,
  fetchDashboardMetrics,
  fetchDashboardSpendingChart,
  fetchDashboardRecentActivity,
  updateLastSeen,
  track_activity
} from './redux/reducer';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  getUserDashboardOverview,
  getUserDashboardMetrics,
  getUserSpendingChartData,
  getUserRecentActivity,
  getUserLoadingStates,
  getUserErrorStates
} from './redux/selector';
import EmptyStatePage from '../../components/emptyState';
import { convertToPublicUrl } from '../../utils/supabase';
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

// Custom Components
const WelcomeCard = ({ user }) => {
  const colors = useColors();
  
  return (
    <Box
      bg={colors.cardBg}
      p={6}
      borderRadius="xl"
      boxShadow={colors.cardShadow}
      position="relative"
      overflow="hidden"
    >
      <Box 
        position="absolute" 
        top={0} 
        right={0} 
        w="150px" 
        h="150px" 
        bg={colors.accentLight} 
        borderBottomLeftRadius="100%"
        opacity={0.3}
      />
      <VStack align="start" spacing={4}>
        <HStack spacing={4}>
          <Avatar 
            size="xl" 
            name={`${user.firstName} ${user.lastName}`}
            src={convertToPublicUrl(user?.profilePicture)}
          />
          <VStack align="start" spacing={1}>
            <Text fontSize="sm" color={colors.textColor}>Welcome back,</Text>
            <Heading size="lg" color={colors.textColor}>
              {user.firstName} {user.lastName}
            </Heading>
            <Badge colorScheme="purple">{user.segment} {user.role}</Badge>
          </VStack>
        </HStack>
        
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
          <StatCard
            label="Total Spent"
            value={`₦${user.metrics.totalSpent.toLocaleString()}`}
            icon={FiDollarSign}
            change="+12.5%"
          />
          <StatCard
            label="Total Orders"
            value={user.metrics.totalOrders}
            icon={FiShoppingBag}
            change="+5.2%"
          />
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

const StatCard = ({ label, value, icon, change }) => {
  const colors = useColors();
  const isPositive = change?.startsWith('+');
  
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      p={4}
      bg={colors.statCardBg}
      borderRadius="lg"
      boxShadow={colors.cardShadow}
    >
      <VStack spacing={2} align="start">
        <Circle size={10} bg={colors.accentLight}>
          <Icon as={icon} color={colors.buttonPrimaryBg} />
        </Circle>
        <Text fontSize="sm" color="gray.500">{label}</Text>
        <Text fontSize="2xl" fontWeight="bold">{value}</Text>
        {change && (
          <Badge colorScheme={isPositive ? 'green' : 'red'}>
            {change}
          </Badge>
        )}
      </VStack>
    </MotionBox>
  );
};

const RecentTransactions = ({ transactions = [] }) => {
  const colors = useColors();
  
  const transactionOnly = transactions.filter(item => item.type === 'transaction');
  
  if (!transactionOnly || transactionOnly.length === 0) {
    return (
      <VStack
        spacing={4}
        bg={colors.cardBg}
        p={6}
        borderRadius="xl"
        boxShadow={colors.cardShadow}
        align="stretch"
      >
        <Heading size="md" mb={4}>Recent Transactions</Heading>
        <Text color="gray.500" textAlign="center">No transactions yet</Text>
      </VStack>
    );
  }
  
  return (
    <VStack
      spacing={4}
      bg={colors.cardBg}
      p={6}
      borderRadius="xl"
      boxShadow={colors.cardShadow}
      align="stretch"
    >
      <Heading size="md" mb={4}>Recent Transactions</Heading>
      <VStack spacing={4} align="stretch"></VStack>
        {transactionOnly.map((transaction, index) => (
          <HStack
            key={index}
            justify="space-between"
            p={4}
            bg={colors.statCardBg}
            borderRadius="lg"
            transition="all 0.2s"
            _hover={{ transform: 'translateX(8px)' }}
          >
            <HStack spacing={4}>
              <Circle size={10} bg={colors.accentLight}>
                <Icon as={FiShoppingBag} color={colors.buttonPrimaryBg} />
              </Circle>
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">{transaction?.description || 'Unknown Transaction'}</Text>
                <Text fontSize="sm" color="gray.500">
                  {transaction?.time ? new Date(transaction.time).toLocaleDateString() : 'N/A'}
                </Text>
              </VStack>
            </HStack>
            <VStack align="end" spacing={0}>
              <Text fontWeight="bold">
                {transaction?.amount ? `₦${transaction.amount.toLocaleString()}` : 'N/A'}
              </Text>
              <Badge colorScheme={
                transaction?.status === 'completed' ? 'green' :
                transaction?.status === 'pending' ? 'yellow' : 'red'
              }>
                {transaction?.status || 'unknown'}
              </Badge>
            </VStack>
          </HStack>
        ))}
      </VStack>
  );
};

const SecurityCard = ({ securityScore }) => {
  const colors = useColors();
  
  return (
    <Box
      bg={colors.cardBg}
      p={6}
      borderRadius="xl"
      boxShadow={colors.cardShadow}
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Heading size="md">Security Status</Heading>
          <Icon as={FiShield} boxSize={6} color={colors.buttonPrimaryBg} />
        </HStack>
        
        <VStack spacing={2} align="stretch">
          <Progress
            value={securityScore}
            colorScheme={
              securityScore > 80 ? 'green' :
              securityScore > 50 ? 'yellow' : 'red'
            }
            borderRadius="full"
            size="lg"
          />
          <Text textAlign="center" fontSize="sm">
            Security Score: {securityScore}%
          </Text>
        </VStack>
        
        <Link to='/settings'>
          <Button
            leftIcon={<FiShield />}
            variant="outline"
            size="sm"
            w="full"
          >
            Improve Security
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

const NotificationsCard = ({ notifications }) => {
  const colors = useColors();
  
  return (
    <Box
      bg={colors.cardBg}
      p={6}
      borderRadius="xl"
      boxShadow={colors.cardShadow}
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Heading size="md">Notifications</Heading>
          <Icon as={FiBell} boxSize={6} color={colors.buttonPrimaryBg} />
        </HStack>
        
        <VStack spacing={3} align="stretch">
          {notifications.map((notif, index) => (
            <HStack
              key={index}
              p={3}
              bg={colors.statCardBg}
              borderRadius="lg"
              spacing={3}
            >
              <Circle size={8} bg={colors.accentLight}>
                <Icon as={FiBell} color={colors.buttonPrimaryBg} size={4} />
              </Circle>
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">{notif.title}</Text>
                <Text fontSize="sm" color="gray.500">
                  {notif.message}
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const colors = useColors();
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const overview = useSelector(getUserDashboardOverview);
  const metrics = useSelector(getUserDashboardMetrics);
  const spendingChart = useSelector(getUserSpendingChartData);
  const recentActivity = useSelector(getUserRecentActivity);
  const loading = useSelector(getUserLoadingStates);
  const errors = useSelector(getUserErrorStates);

  useEffect(() => {
    const fetchDashboardData = () => {
      console.log('Fetching dashboard data...');
      dispatch(fetchDashboardOverview());
      dispatch(fetchDashboardMetrics());
      dispatch(fetchDashboardSpendingChart());
      dispatch(fetchDashboardRecentActivity());
    };

    fetchDashboardData();

    dispatch(updateLastSeen({
      device: navigator.userAgent,
      location: 'Web Browser'
    }));

    // Track user activity without needing backend calls
    dispatch(track_activity({
      page: 'dashboard',
      deviceInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }));

    // Regular data fetching
    dispatch(fetchDashboardOverview());
    dispatch(fetchDashboardMetrics());
    dispatch(fetchDashboardSpendingChart());
    dispatch(fetchDashboardRecentActivity());
  }, [dispatch]);

  if (loading?.overviewLoading) {
    return <LoadingSpinner />;
  }

  // Then check for errors
  if (errors?.overviewError) {
    return (
      <EmptyStatePage 
        title="Error loading dashboard"
        sub={errors.overviewError}
        btnText="Try Again"
        handleClick={() => {
          dispatch(fetchDashboardOverview());
          dispatch(fetchDashboardMetrics());
          dispatch(fetchDashboardSpendingChart());
          dispatch(fetchDashboardRecentActivity());
        }}
      />
    );
  }

  if (!overview?.data?.user) {
    return (
      <EmptyStatePage 
        title="No Dashboard Data"
        sub="Your dashboard information will appear here once you start making transactions"
        btnText="Browse Products"
        isLink
        link="/product/instagram"
      />
    );
  }

  const userData = overview.data.user;
  
  return (
    <Box w="full" overflowX="hidden">
      <Container maxW="container.xl" py={4} px={{ base: 2, md: 8 }}>
        <VStack spacing={{ base: 4, md: 8 }} align="stretch">
          <WelcomeCard user={userData} />
          
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={{ base: 4, md: 8 }}>
            <GridItem>
              <VStack spacing={{ base: 4, md: 8 }} align="stretch">
                <RecentTransactions 
                  transactions={recentActivity?.data || []} 
                  isLoading={loading?.activityLoading}
                />
                
                <Box
                  bg={colors.cardBg}
                  p={{ base: 3, md: 6 }}
                  borderRadius="xl"
                  boxShadow={colors.cardShadow}
                >
                  <Tabs colorScheme="blue" variant="soft-rounded" isLazy>
                    <TabList 
                      overflowX="auto" 
                      overflowY="hidden" 
                      py={2}
                      css={{
                        scrollbarWidth: 'none',
                        '::-webkit-scrollbar': {
                          display: 'none'
                        }
                      }}
                    >
                      <HStack spacing={2}>
                        <Tab 
                          whiteSpace="nowrap"
                          minW="auto"
                          px={4}
                        >
                          Overview
                        </Tab>
                        <Tab 
                          whiteSpace="nowrap"
                          minW="auto"
                          px={4}
                        >
                          Products
                        </Tab>
                        <Tab 
                          whiteSpace="nowrap"
                          minW="auto"
                          px={4}
                        >
                          History
                        </Tab>
                      </HStack>
                    </TabList>
                    
                    <TabPanels>
                      <TabPanel>
                        <OverviewPanel 
                          data={overview.data}
                          metrics={metrics}
                          spendingChart={spendingChart}
                          isLoading={loading.metricsLoading || loading.chartLoading}
                        />
                      </TabPanel>
                      <TabPanel>
                        <ProductsPanel 
                          products={overview.data?.user?.products || []}
                          isLoading={loading.overviewLoading}
                        />
                      </TabPanel>
                      <TabPanel>
                        <HistoryPanel 
                          transactions={recentActivity.data}
                          isLoading={loading.activityLoading}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </VStack>
            </GridItem>
            
            <GridItem>
              <VStack spacing={{ base: 4, md: 8 }}>
                <SecurityCard 
                  securityScore={overview.data.security.score} 
                  securityFactors={overview.data.security.factors}
                />
                <NotificationsCard 
                  notifications={overview.data.notifications}
                />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default UserDashboard;
