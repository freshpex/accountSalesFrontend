import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Flex, Grid, Text, Button, Input, InputGroup, InputLeftElement,
  Table, Thead, Tbody, Tr, Th, Td, Avatar, Badge, Menu, MenuButton,
  MenuList, MenuItem, IconButton, useColorModeValue, Select, useDisclosure
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiMoreVertical, FiUser, FiUsers, 
         FiUserPlus, FiUserCheck, FiUserX, FiMail, FiPhone } from 'react-icons/fi';
import StatCard from './components/StatCard';
import CustomerSegmentCard from './components/CustomerSegmentCard';
import CustomerGrowthChart from './components/CustomerGrowthChart';
import RecentActivityList from './components/RecentActivityList';
import AddCustomerModal from './components/AddCustomerModal';
import EmptyStatePage from '../../components/emptyState';
import {
  getCustomers,
  getCustomerMetrics,
  getCustomerSegments,
  getRecentActivity,
  getLoading
} from './redux/selector';
import {
  fetch_customers,
  fetch_customer_activity,
  add_customer,
  update_customer_segment
} from './redux/reducer';
import LoadingSpinner from '../../components/LoadingSpinner';

const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector(getCustomers);
  const metrics = useSelector(getCustomerMetrics);
  const segments = useSelector(getCustomerSegments);
  const recentActivity = useSelector(getRecentActivity);
  const loading = useSelector(getLoading);
  
  const [filters, setFilters] = useState({ status: 'all', search: '', segment: 'all' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    dispatch(fetch_customers(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetch_customer_activity());
  }, [dispatch]);

  const handleAddCustomer = (customerData) => {
    dispatch(add_customer(customerData));
    onClose();
  };

  const handleSegmentUpdate = (customerId, oldSegment, newSegment) => {
    dispatch(update_customer_segment({ customerId, oldSegment, newSegment }));
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredCustomers = customers.filter(customer => {
    if (filters.status !== 'all' && customer.status !== filters.status) return false;
    if (filters.segment !== 'all' && customer.segment.toLowerCase() !== filters.segment) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderContent = () => {
    if (!customers.length) {
      return (
        <EmptyStatePage
          title="No Customers Found"
          sub="Get started by adding your first customer"
          icon={<FiUsers size={50} />}
          btnText="Add Customer"
          handleClick={onOpen}
        />
      );
    }

    return (
      <>
        {/* Stats Grid */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
          <StatCard
            title="Total Customers"
            value={metrics.totalCustomers}
            trend={metrics.totalGrowth}
            icon={FiUsers}
            subtitle="Active accounts"
          />
          <StatCard
            title="New Customers"
            value={metrics.newCustomers}
            trend={metrics.newGrowth}
            icon={FiUserPlus}
            subtitle="This month"
          />
          <StatCard
            title="Active Customers"
            value={metrics.activeCustomers}
            trend={metrics.activeGrowth}
            icon={FiUserCheck}
            subtitle="Last 30 days"
          />
          <StatCard
            title="Churn Rate"
            value={`${metrics.churnRate}%`}
            trend={metrics.churnRateChange}
            icon={FiUserX}
            subtitle="This month"
          />
        </Grid>

        {/* Charts and Activity */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={8}>
          <CustomerGrowthChart data={metrics.trends} />
          <RecentActivityList activities={recentActivity} />
        </Grid>

        {/* Customer Segments */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
          {Object.entries(segments).map(([key, segment]) => (
            <CustomerSegmentCard key={key} segment={segment} />
          ))}
        </Grid>

        {/* Customer List */}
        <Box bg={useColorModeValue('white', 'gray.800')} borderRadius="lg" shadow="sm">
          <Flex p={6} justify="space-between" align="center">
            <InputGroup maxW="320px">
              <InputLeftElement><FiSearch color="gray.400" /></InputLeftElement>
              <Input
                placeholder="Search customers..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </InputGroup>
            <Flex align="center" gap={4}>
              <Select
                maxW="200px"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
              <Select
                maxW="200px"
                value={filters.segment}
                onChange={(e) => handleFilterChange('segment', e.target.value)}
              >
                <option value="all">All Segments</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </Select>
            </Flex>
          </Flex>

          {filteredCustomers.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Customer</Th>
                  <Th>Status</Th>
                  <Th>Segment</Th>
                  <Th>Joined</Th>
                  <Th>Orders</Th>
                  <Th>Spent</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCustomers.map((customer) => (
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
                      <Badge colorScheme={customer.status === 'active' ? 'green' : 'red'}>
                        {customer.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme="purple">{customer.segment}</Badge>
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
          ) : (
            <EmptyStatePage
              title="No Results Found"
              sub="Try adjusting your search or filters"
              icon={<FiSearch size={50} />}
            />
          )}
        </Box>
      </>
    );
  };

  return (
    <Box minH="100vh" bg={bgColor} p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Customers</Text>
          <Text color="gray.500">Manage and analyze your customer base</Text>
        </Box>
        <Button
          leftIcon={<FiUserPlus />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Add Customer
        </Button>
      </Flex>

      {renderContent()}

      <AddCustomerModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddCustomer}
      />
    </Box>
  );
};

export default Customers;