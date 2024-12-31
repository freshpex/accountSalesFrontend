import { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  Text,
  Stack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Progress,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiUser,
  FiUsers,
  FiUserPlus,
  FiUserCheck,
  FiUserX,
  FiDollarSign,
  FiDownload,
  FiMail,
  FiPhone,
  FiCalendar,
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { customerData } from './data';

const StatCard = ({ title, value, trend, icon: Icon, subtitle }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const iconBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
    >
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text color="gray.500" fontSize="sm">{title}</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
            {value}
          </Text>
          {subtitle && (
            <Text fontSize="sm" color="gray.500" mt={1}>
              {subtitle}
            </Text>
          )}
        </Box>
        <Box
          p={3}
          bg={iconBg}
          borderRadius="full"
          color="blue.500"
        >
          <Icon size={20} />
        </Box>
      </Flex>
      {trend && (
        <Flex align="center" mt={4}>
          <Badge
            colorScheme={trend.value > 0 ? 'green' : 'red'}
            variant="subtle"
            px={2}
            py={1}
          >
            {trend.value > 0 ? '+' : ''}{trend.value}%
          </Badge>
          <Text fontSize="sm" color="gray.500" ml={2}>
            vs last month
          </Text>
        </Flex>
      )}
    </Box>
  );
};

const CustomerSegmentCard = ({ segment }) => {
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
      <Flex justify="space-between" mb={4}>
        <Text fontWeight="medium">{segment.name}</Text>
        <Badge colorScheme="blue">{segment.count} customers</Badge>
      </Flex>
      <Stack spacing={4}>
        <Box>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">Average Spend</Text>
            <Text fontWeight="medium">${segment.averageSpend}</Text>
          </Flex>
          <Progress
            value={(segment.averageSpend / 2000) * 100}
            size="sm"
            colorScheme="blue"
          />
        </Box>
        <Box>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">Retention Rate</Text>
            <Text fontWeight="medium">{segment.retentionRate}%</Text>
          </Flex>
          <Progress
            value={segment.retentionRate}
            size="sm"
            colorScheme="green"
          />
        </Box>
      </Stack>
    </Box>
  );
};

const Customers = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor} p={8}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Customers</Text>
          <Text color="gray.500">Manage and analyze your customer base</Text>
        </Box>
        <Button
          lefticon={<FiUserPlus />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Add Customer
        </Button>
      </Flex>

      {/* Stats Grid */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
        mb={8}
      >
        <StatCard
          title="Total Customers"
          value={customerData.summary.totalCustomers.toLocaleString()}
          trend={{ value: 5.2 }}
          icon={FiUsers}
          subtitle="Active accounts"
        />
        <StatCard
          title="New Customers"
          value={customerData.summary.newCustomers}
          trend={{ value: 12.5 }}
          icon={FiUserPlus}
          subtitle="This month"
        />
        <StatCard
          title="Active Customers"
          value={customerData.summary.activeCustomers.toLocaleString()}
          trend={{ value: 3.8 }}
          icon={FiUserCheck}
          subtitle="Last 30 days"
        />
        <StatCard
          title="Churn Rate"
          value={`${customerData.summary.churnRate}%`}
          trend={{ value: -0.5 }}
          icon={FiUserX}
          subtitle="This month"
        />
      </Grid>

      {/* Customer Growth Chart */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={8}>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          shadow="sm"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Text fontSize="lg" fontWeight="medium">Customer Growth</Text>
            <Select width="150px" size="sm">
              <option value="6months">Last 6 months</option>
              <option value="12months">Last 12 months</option>
              <option value="ytd">Year to date</option>
            </Select>
          </Flex>
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerData.customerTrends.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#3182CE"
                  strokeWidth={2}
                  name="Active Customers"
                />
                <Line
                  type="monotone"
                  dataKey="new"
                  stroke="#48BB78"
                  strokeWidth={2}
                  name="New Customers"
                />
                <Line
                  type="monotone"
                  dataKey="churned"
                  stroke="#E53E3E"
                  strokeWidth={2}
                  name="Churned Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Recent Activity */}
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          shadow="sm"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Text fontSize="lg" fontWeight="medium">Recent Activity</Text>
            <IconButton
              icon={<FiFilter />}
              variant="ghost"
              size="sm"
              aria-label="Filter activities"
            />
          </Flex>
          <Stack spacing={4}>
            {customerData.recentActivity.map((activity) => (
              <Flex key={activity.id} align="center" justify="space-between">
                <Flex align="center">
                  <Box
                    p={2}
                    bg={
                      activity.type === 'purchase' ? 'green.100' :
                      activity.type === 'support' ? 'orange.100' : 'blue.100'
                    }
                    color={
                      activity.type === 'purchase' ? 'green.500' :
                      activity.type === 'support' ? 'orange.500' : 'blue.500'
                    }
                    borderRadius="full"
                    mr={3}
                  >
                    {activity.type === 'purchase' ? <FiDollarSign /> :
                     activity.type === 'support' ? <FiUserCheck /> : <FiUser />}
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium">
                      {activity.details}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(activity.date).toLocaleDateString()}
                    </Text>
                  </Box>
                </Flex>
                {activity.amount && (
                  <Text fontWeight="medium">${activity.amount}</Text>
                )}
              </Flex>
            ))}
          </Stack>
        </Box>
      </Grid>

      {/* Customer Segments */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
        mb={8}
      >
        {customerData.segments.map((segment) => (
          <CustomerSegmentCard key={segment.name} segment={segment} />
        ))}
      </Grid>

      {/* Customer List */}
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="lg"
        border="1px solid"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        shadow="sm"
      >
        <Flex p={6} justify="space-between" align="center">
          <InputGroup maxW="320px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.400" />
            </InputLeftElement>
            <Input placeholder="Search customers..." />
          </InputGroup>
          <Flex align="center" gap={4}>
            <Select maxW="200px" size="md" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            <IconButton
              icon={<FiDownload />}
              variant="outline"
              aria-label="Export data"
            />
          </Flex>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Customer</Th>
              <Th>Status</Th>
              <Th>Joined</Th>
              <Th>Orders</Th>
              <Th>Spent</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {customerData.customerList.map((customer) => (
              <Tr key={customer.id}>
                <Td>
                  <Flex align="center">
                    <Avatar size="sm" src={customer.avatar} name={customer.name} mr={3} />
                    <Box>
                      <Text fontWeight="medium">{customer.name}</Text>
                      <Text fontSize="sm" color="gray.500">{customer.email}</Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Badge
                    colorScheme={customer.status === 'active' ? 'green' : 'red'}
                  >
                    {customer.status}
                  </Badge>
                </Td>
                <Td>{new Date(customer.joinDate).toLocaleDateString()}</Td>
                <Td>{customer.totalOrders}</Td>
                <Td>${customer.totalSpent.toLocaleString()}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FiMoreVertical />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem icon={<FiUser />}>View Profile</MenuItem>
                      <MenuItem icon={<FiMail />}>Send Email</MenuItem>
                      <MenuItem icon={<FiPhone />}>Call</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add Customer Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Add customer form components here */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Customers;