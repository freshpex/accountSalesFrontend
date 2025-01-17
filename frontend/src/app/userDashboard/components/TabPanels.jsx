import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Image,
  Button,
  Select,
  Progress,
  useBreakpointValue,
  Stack,
  Icon,
} from '@chakra-ui/react';
import {
  FiTrendingUp,
  FiShoppingBag,
  FiActivity,
} from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useColors } from '../../../utils/colors';
import { useRef } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const OverviewPanel = ({ data, metrics, spendingChart, isLoading }) => {
  const colors = useColors();
  const chartRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const StatBox = ({ label, value, change, icon: Icon }) => {
    return (
      <Box p={4} bg={colors.statCardBg} borderRadius="lg">
        <VStack align="start">
          {change && (
            <HStack color="green.500" fontSize="sm">
              <Icon />
              <Text>{change}</Text>
            </HStack>
          )}
          <Text fontSize="2xl" fontWeight="bold">{value}</Text>
          <Text fontSize="sm" color="gray.500">{label}</Text>
        </VStack>
      </Box>
    );
  };

  const chartData = {
      labels: spendingChart?.labels || [],
      datasets: [{
        label: 'Monthly Spending',
        data: spendingChart?.datasets[0].data || [],
        borderColor: colors.buttonPrimaryBg,
        tension: 0.4,
        fill: false
      }]
    };
  
    const ActivityItem = ({ activity, index }) => (
      <HStack key={index} p={2} bg={colors.statCardBg} borderRadius="md">
        <Icon as={FiActivity} color={colors.buttonPrimaryBg} />
        <Text flex={1}>{activity.description}</Text>
        <Text fontSize="sm" color="gray.500">
          {new Date(activity.time).toLocaleString()}
        </Text>
      </HStack>
    );
  
    return (
    <VStack spacing={6} align="stretch">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} w="full">
        <StatBox
          label="Monthly Spending"
          value={`₦${metrics?.current?.totalSpent?.toLocaleString() || 0}`}
          change={`${metrics?.growth?.spending || 0}%`}
          icon={FiTrendingUp}
        />
        <StatBox
          label="Active Orders"
          value={metrics?.current?.totalOrders || 0}
          change={`${metrics?.growth?.orders || 0}%`}
          icon={FiShoppingBag}
        />
        <StatBox
          label="Member Status"
          value={data?.user?.segment || 'Bronze'}
          icon={FiActivity}
        />
      </SimpleGrid>

      {/* Spending Chart */}
      <Box p={4} bg={colors.cardBg} borderRadius="lg" h={{ base: "200px", md: "300px" }}>
        <Text mb={4} fontWeight="medium">Spending Overview</Text>
        <Box h="100%">
          <Line
            ref={chartRef}
            data={chartData}
            options={{ maintainAspectRatio: false }}
          />
        </Box>
      </Box>

      {/* Recent Activity */}
      <Box p={4} bg={colors.cardBg} borderRadius="lg">
        <Text mb={4} fontWeight="medium">Recent Activity</Text>
        <VStack align="stretch" spacing={3}>
          {(data?.recentActivity || []).map((activity, idx) => (
            <ActivityItem 
              key={idx} 
              activity={activity} 
              index={idx} 
            />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export const ProductsPanel = ({ products, isLoading }) => {
  const colors = useColors();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* Filters */}
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={4}
        w="full"
      >
        <Select placeholder="Filter by Type" size="sm">
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="whatsapp">WhatsApp</option>
        </Select>
        <Select placeholder="Sort by" size="sm">
          <option value="recent">Most Recent</option>
          <option value="price">Price</option>
          <option value="status">Status</option>
        </Select>
      </Stack>

      {/* Products Grid */}
      <SimpleGrid 
        columns={{ base: 1, sm: 2 }} 
        spacing={4}
        w="full"
      >
        {products?.map((product, index) => (
          <Box
            key={index}
            p={4}
            bg={colors.cardBg}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={colors.borderColor}
          >
            <HStack spacing={4}>
              <Image
                src={product.images[0]}
                boxSize="80px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" flex={1}>
                <Text fontWeight="bold">{product.username}</Text>
                <HStack>
                  <Badge colorScheme={
                    product.status === 'available' ? 'green' :
                    product.status === 'pending' ? 'yellow' : 'red'
                  }>
                    {product.status}
                  </Badge>
                  <Text fontSize="sm">₦{product.price.toLocaleString()}</Text>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  {product.followers.toLocaleString()} followers
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export const HistoryPanel = ({ transactions = [], isLoading }) => {
  const colors = useColors();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Add this for debugging
  console.log('Transactions in HistoryPanel:', transactions);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Add empty state
  if (!transactions || transactions.length === 0) {
    return (
      <VStack spacing={6} align="stretch">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
          <Box p={4} bg={colors.statCardBg} borderRadius="lg">
            <VStack align="start">
              <Text color="gray.500">Total Spent</Text>
              <Text fontSize="2xl" fontWeight="bold">₦0</Text>
              <Progress value={0} w="full" colorScheme="green" size="sm" />
            </VStack>
          </Box>
          <Box p={4} bg={colors.statCardBg} borderRadius="lg">
            <VStack align="start">
              <Text color="gray.500">Completed Orders</Text>
              <Text fontSize="2xl" fontWeight="bold">0</Text>
              <Progress value={0} w="full" colorScheme="blue" size="sm" />
            </VStack>
          </Box>
          <Box p={4} bg={colors.statCardBg} borderRadius="lg">
            <VStack align="start">
              <Text color="gray.500">Success Rate</Text>
              <Text fontSize="2xl" fontWeight="bold">0%</Text>
              <Progress value={0} w="full" colorScheme="purple" size="sm" />
            </VStack>
          </Box>
        </SimpleGrid>
        <Text color="gray.500" textAlign="center">No transaction history available</Text>
      </VStack>
    );
  }

  // Safe access to transaction properties
  const renderTransaction = (tx) => ({
    date: tx?.date ? new Date(tx.date).toLocaleDateString() : 'N/A',
    transactionId: tx?.transactionId || 'N/A',
    productName: tx?.productName || 'Unknown Product',
    amount: tx?.amount ? tx.amount.toLocaleString() : '0',
    status: tx?.status || 'unknown'
  });

  return (
    <VStack spacing={6} align="stretch">
      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        <Box p={4} bg={colors.statCardBg} borderRadius="lg">
          <VStack align="start">
            <Text color="gray.500">Total Spent</Text>
            <Text fontSize="2xl" fontWeight="bold">₦458,200</Text>
            <Progress value={75} w="full" colorScheme="green" size="sm" />
          </VStack>
        </Box>
        <Box p={4} bg={colors.statCardBg} borderRadius="lg">
          <VStack align="start">
            <Text color="gray.500">Completed Orders</Text>
            <Text fontSize="2xl" fontWeight="bold">24</Text>
            <Progress value={90} w="full" colorScheme="blue" size="sm" />
          </VStack>
        </Box>
        <Box p={4} bg={colors.statCardBg} borderRadius="lg">
          <VStack align="start">
            <Text color="gray.500">Success Rate</Text>
            <Text fontSize="2xl" fontWeight="bold">95%</Text>
            <Progress value={95} w="full" colorScheme="purple" size="sm" />
          </VStack>
        </Box>
      </SimpleGrid>

      {isMobile ? (
        <VStack spacing={4} align="stretch">
          {transactions.map((tx, index) => {
            const transaction = renderTransaction(tx);
            return (
              <Box
                key={index}
                p={4}
                bg={colors.statCardBg}
                borderRadius="lg"
                boxShadow={colors.cardShadow}
              >
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.500">Date</Text>
                    <Text fontSize="sm">{transaction.date}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.500">ID</Text>
                    <Text fontSize="sm" color={colors.buttonPrimaryBg}>{transaction.transactionId}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.500">Product</Text>
                    <Text fontSize="sm">{transaction.productName}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.500">Amount</Text>
                    <Text fontSize="sm" fontWeight="bold">₦{transaction.amount}</Text>
                  </HStack>
                  <HStack justify="flex-end">
                    <Badge colorScheme={
                      transaction.status === 'completed' ? 'green' :
                      transaction.status === 'pending' ? 'yellow' : 'red'
                    }>
                      {transaction.status}
                    </Badge>
                  </HStack>
                </VStack>
              </Box>
            );
          })}
        </VStack>
      ) : (
        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead bg={colors.tableHeaderBg}>
              <Tr>
                <Th>Date</Th>
                <Th>Transaction ID</Th>
                <Th>Product</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((tx, index) => {
                const transaction = renderTransaction(tx);
                return (
                  <Tr key={index} _hover={{ bg: colors.tableRowHoverBg }}>
                    <Td>{transaction.date}</Td>
                    <Td>
                      <Text color={colors.buttonPrimaryBg}>
                        {transaction.transactionId}
                      </Text>
                    </Td>
                    <Td>{transaction.productName}</Td>
                    <Td>₦{transaction.amount}</Td>
                    <Td>
                      <Badge colorScheme={
                        transaction.status === 'completed' ? 'green' :
                        transaction.status === 'pending' ? 'yellow' : 'red'
                      }>
                        {transaction.status}
                      </Badge>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Load More Button */}
      {transactions.length > 0 && (
        <Button variant="outline" alignSelf="center" size="sm">
          Load More History
        </Button>
      )}
    </VStack>
  );
};
