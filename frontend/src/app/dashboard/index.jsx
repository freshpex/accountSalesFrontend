import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Progress,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Badge,
  IconButton,
  useColorModeValue,
  Button,
  Container,
  Stack,
  Circle,
} from '@chakra-ui/react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  FiDollarSign, 
  FiUsers, 
  FiShoppingBag,
  FiPackage,
  FiFilter,
  FiDownload,
  FiActivity
} from 'react-icons/fi';
import { dashboardData } from './data';
import DashboardCard from '../../components/cards/DashboardCard';
import MetricCard from '../../components/cards/MetricCard';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Container maxW="container.xl" bg={bgColor} py={8}>
    {/* Header */}
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

      {/* Main Content */}
      <Box p={8}>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={2}
          mb={8}
        >
          <MetricCard
            title="Total Revenue"
            value={`$${dashboardData.metrics.revenue.value}`}
            growth={dashboardData.metrics.revenue.growth}
            icon={FiDollarSign}
            secondaryValue={`$${dashboardData.metrics.revenue.previousValue}`}
            secondaryLabel="Previous Period"
          />
          <MetricCard
            title="Total Customers"
            value={dashboardData.metrics.customers.value}
            growth={dashboardData.metrics.customers.growth}
            icon={FiUsers}
            secondaryValue={dashboardData.metrics.customers.newCustomers}
            secondaryLabel="New Customers"
          />
          <MetricCard
            title="Total Transactions"
            value={dashboardData.metrics.transactions.value}
            growth={dashboardData.metrics.transactions.growth}
            icon={FiShoppingBag}
            secondaryValue={`$${dashboardData.metrics.transactions.avgTicketSize}`}
            secondaryLabel="Avg. Ticket Size"
          />
          <MetricCard
            title="Total Products"
            value={dashboardData.metrics.products.value}
            growth={dashboardData.metrics.products.growth}
            icon={FiPackage}
            secondaryValue={dashboardData.metrics.products.outOfStock}
            secondaryLabel="Out of Stock"
          />
        </Grid>

        {/* Sales Chart */}
            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={2} mb={8}>
              <DashboardCard>
                <Flex justify="space-between" align="center" mb={6}>
                  <Text fontSize="lg" fontWeight="medium">
                    Sales Overview
                  </Text>
                  <Flex gap={2}>
                  {['weekly', 'monthly'].map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      variant={timeRange === range ? 'solid' : 'ghost'}
                      onClick={() => setTimeRange(range)}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </Button>
                  ))}
                </Flex>
              </Flex>
            
            <Box height={{ base: "200px", md: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timeRange === 'weekly' ? dashboardData.salesTrends.weekly : dashboardData.salesTrends.monthly}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                    stroke={useColorModeValue('#718096', '#A0AEC0')}
                  />
                  <YAxis stroke={useColorModeValue('#718096', '#A0AEC0')} />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey={timeRange === 'weekly' ? 'sales' : 'value'}
                    stroke="#3182CE"
                    fillOpacity={1}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </DashboardCard>

          {/* Recent Activities */}
          <DashboardCard>
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="medium">Recent Activities</Text>
              <IconButton
                icon={<FiFilter />}
                variant="ghost"
                size="sm"
                aria-label="Filter activities"
              />
            </Flex>
            
            <Stack spacing={2}>
              {dashboardData.recentActivities.map((activity) => (
                <Flex key={activity.id} align="center" justify="space-between">
                  <Flex align="center">
                    <Circle
                      size="40px"
                      bg={
                        activity.type === 'order' ? 'green.100' :
                        activity.type === 'inventory' ? 'orange.100' : 'blue.100'
                      }
                      color={
                        activity.type === 'order' ? 'green.500' :
                        activity.type === 'inventory' ? 'orange.500' : 'blue.500'
                      }
                      mr={4}
                    >
                      <FiActivity />
                    </Circle>
                    <Box>
                      <Text fontSize="sm" fontWeight="medium">{activity.message}</Text>
                      <Text fontSize="xs" color="gray.500">{activity.time}</Text>
                    </Box>
                  </Flex>
                  {activity.amount && (
                    <Badge colorScheme="green">${activity.amount}</Badge>
                  )}
                </Flex>
              ))}
            </Stack>
          </DashboardCard>
        </Grid>

        {/* Popular Products */}
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
                {dashboardData.productPopular.map((product) => (
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

        {/* Regional Growth */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} mt={8}>
          {dashboardData.customerGrowth.map((region) => (
            <DashboardCard key={region.region}>
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontSize="lg" fontWeight="medium">{region.region}</Text>
                <Badge colorScheme="blue">{region.percentage}% Growth</Badge>
              </Flex>
              
              <Stack spacing={4}>
                <Box>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.500">Total Customers</Text>
                    <Text fontWeight="medium">{region.total.toLocaleString()}</Text>
                  </Flex>
                  <Progress value={region.percentage} size="sm" colorScheme="blue" />
                </Box>
                
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontSize="sm" color="gray.500">New Customers</Text>
                    <Text fontSize="lg" fontWeight="medium">+{region.new}</Text>
                  </Box>
                  <Circle size="40px" bg="blue.50">
                    <FiUsers color="blue" />
                  </Circle>
                </Flex>
              </Stack>
            </DashboardCard>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;