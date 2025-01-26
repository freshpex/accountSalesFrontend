import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  Grid,
  Text,
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
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiUsers,
  FiUserPlus,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import StatCard from "./components/StatCard";
import CustomerSegmentCard from "./components/CustomerSegmentCard";
import CustomerGrowthChart from "./components/CustomerGrowthChart";
import RecentActivityList from "./components/RecentActivityList";
import AddCustomerModal from "./components/AddCustomerModal";
import EmptyStatePage from "../../components/emptyState";
import {
  getCustomers,
  getCustomerMetrics,
  getCustomerSegments,
  getRecentActivity,
  getLoading,
} from "./redux/selector";
import {
  fetch_customers,
  fetch_customer_activity,
  add_customer,
  update_customer_segment,
} from "./redux/reducer";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useColors } from "../../utils/colors";
import CustomerActionMenu from "./components/CustomerActionMenu";

const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector(getCustomers);
  const metrics = useSelector(getCustomerMetrics);
  const segments = useSelector(getCustomerSegments);
  const recentActivity = useSelector(getRecentActivity) || [];
  const loading = useSelector(getLoading);

  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    segment: "all",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colors = useColors();

  useEffect(() => {
    dispatch(fetch_customers(filters));
  }, [dispatch, filters]);

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    if (selectedCustomerId) {
      dispatch(fetch_customer_activity(selectedCustomerId));
    }
  }, [dispatch, selectedCustomerId]);

  const handleAddCustomer = (customerData) => {
    dispatch(add_customer(customerData));
    onClose();
  };

  const handleSegmentUpdate = (customerId, oldSegment, newSegment) => {
    dispatch(
      update_customer_segment({
        customerId,
        oldSegment: oldSegment.toLowerCase(),
        newSegment: newSegment.toLowerCase(),
      }),
    );
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);
    // Fetch customer activity when selected
    if (customerId) {
      dispatch(fetch_customer_activity(customerId));
    }
  };

  const filteredCustomers = Array.isArray(customers)
    ? customers.filter((customer) => {
        if (!customer) return false;
        if (filters.status !== "all" && customer.status !== filters.status)
          return false;
        if (
          filters.segment !== "all" &&
          customer.segment?.toLowerCase() !== filters.segment
        )
          return false;
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          return (
            customer.name?.toLowerCase().includes(searchLower) ||
            customer.email?.toLowerCase().includes(searchLower)
          );
        }
        return true;
      })
    : [];

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderCustomerRow = (customer) => (
    <Tr
      key={customer._id}
      bg={selectedCustomerId === customer._id ? "blue.50" : "transparent"}
      _hover={{ bg: "gray.50" }}
      onClick={() => handleCustomerSelect(customer._id)}
    >
      <Td>
        <Flex align="center">
          <Avatar
            size="sm"
            name={`${customer.firstName} ${customer.lastName}`}
            mr={3}
          />
          <Box>
            <Text fontWeight="medium">
              {`${customer.firstName} ${customer.lastName}`}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {customer.email}
            </Text>
          </Box>
        </Flex>
      </Td>
      <Td display={{ base: "none", md: "table-cell" }}>
        <Text>{customer.businessName}</Text>
        <Text fontSize="sm" color="gray.500">
          {customer.businessType}
        </Text>
      </Td>
      <Td>
        <Badge colorScheme={customer.status === "active" ? "green" : "red"}>
          {customer.status}
        </Badge>
      </Td>
      <Td>
        <Badge colorScheme="purple">{customer.segment || "Unknown"}</Badge>
      </Td>
      <Td display={{ base: "none", md: "table-cell" }}>
        {new Date(customer.createdAt).toLocaleDateString()}
      </Td>
      <Td display={{ base: "none", md: "table-cell" }}>
        {customer.metrics?.totalOrders || 0}
      </Td>
      <Td display={{ base: "none", md: "table-cell" }}>
        ${customer.metrics?.totalSpent?.toLocaleString() || "0"}
      </Td>
      <Td>
        <CustomerActionMenu
          customer={customer}
          onView={handleCustomerSelect}
          onUpdateSegment={handleSegmentUpdate}
        />
      </Td>
    </Tr>
  );

  const renderCustomerCard = (customer) => (
    <Box
      key={customer._id}
      p={4}
      bg="white"
      borderRadius="lg"
      shadow="sm"
      mb={4}
      onClick={() => handleCustomerSelect(customer._id)}
      cursor="pointer"
      borderLeft={selectedCustomerId === customer._id ? "4px solid" : "none"}
      borderLeftColor="blue.500"
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Flex align="center">
          <Avatar
            size="sm"
            name={`${customer.firstName} ${customer.lastName}`}
            mr={3}
          />
          <Box>
            <Text fontWeight="medium">{`${customer.firstName} ${customer.lastName}`}</Text>
            <Text fontSize="sm" color="gray.500">
              {customer.email}
            </Text>
          </Box>
        </Flex>
        <CustomerActionMenu
          customer={customer}
          onView={handleCustomerSelect}
          onUpdateSegment={handleSegmentUpdate}
        />
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={3}>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Business
          </Text>
          <Text fontSize="sm">{customer.businessName}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Type
          </Text>
          <Text fontSize="sm">{customer.businessType}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Status
          </Text>
          <Badge colorScheme={customer.status === "active" ? "green" : "red"}>
            {customer.status}
          </Badge>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Segment
          </Text>
          <Badge colorScheme="purple">{customer.segment}</Badge>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Orders
          </Text>
          <Text fontSize="sm">{customer.metrics?.totalOrders || 0}</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Total Spent
          </Text>
          <Text fontSize="sm">
            ${customer.metrics?.totalSpent?.toLocaleString() || "0"}
          </Text>
        </Box>
      </Grid>
    </Box>
  );

  const renderFilters = () => (
    <Box mb={6}>
      <InputGroup mb={4}>
        <InputLeftElement>
          <FiSearch color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search customers..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </InputGroup>
      <Flex gap={4} flexWrap="wrap">
        <Select
          flex={{ base: "1 1 100%", md: "1" }}
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          mb={{ base: 2, md: 0 }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
        <Select
          flex={{ base: "1 1 100%", md: "1" }}
          value={filters.segment}
          onChange={(e) => handleFilterChange("segment", e.target.value)}
        >
          <option value="all">All Segments</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
        </Select>
      </Flex>
    </Box>
  );

  const renderStats = () => (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      gap={4}
      mb={6}
      overflowX="auto"
      px={2}
    >
      {[
        {
          title: "Total Customers",
          value: metrics.totalCustomers,
          trend: metrics.totalGrowth,
          icon: FiUsers,
          subtitle: "Active accounts",
        },
        {
          title: "New Customers",
          value: metrics.newCustomers,
          trend: metrics.newGrowth,
          icon: FiUserPlus,
          subtitle: "This month",
        },
        {
          title: "Active Customers",
          value: metrics.activeCustomers,
          trend: metrics.activeGrowth,
          icon: FiUserCheck,
          subtitle: "Last 30 days",
        },
        {
          title: "Churn Rate",
          value: `${metrics.churnRate}%`,
          trend: metrics.churnRateChange,
          icon: FiUserX,
          subtitle: "This month",
        },
      ].map((stat, index) => (
        <StatCard key={`stat-${index}`} {...stat} />
      ))}
    </Grid>
  );

  const renderContent = () => {
    if (loading) return <LoadingSpinner />;

    if (!Array.isArray(customers) || customers.length === 0) {
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
      <Box>
        {renderStats()}

        {/* Mobile-optimized charts section */}
        <Box mb={6} overflowX="auto">
          <Box minW={{ base: "700px", md: "auto" }}>
            <CustomerGrowthChart data={metrics.trends} />
          </Box>
        </Box>

        {/* Customer segments scrollable horizontally on mobile */}
        <Box mb={6} overflowX="auto">
          <Flex gap={4} minW={{ base: "700px", md: "auto" }}>
            {Object.entries(segments).map(([key, value]) => (
              <Box key={key} minW="200px">
                <CustomerSegmentCard segment={{ name: key, count: value }} />
              </Box>
            ))}
          </Flex>
        </Box>

        {renderFilters()}

        {/* Responsive customer list */}
        <Box>
          {/* Desktop view */}
          <Box display={{ base: "none", lg: "block" }}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Customer</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Business</Th>
                  <Th>Status</Th>
                  <Th>Segment</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Joined</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Orders</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Spent</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>{filteredCustomers.map(renderCustomerRow)}</Tbody>
            </Table>
          </Box>

          {/* Mobile view */}
          <Box display={{ base: "block", lg: "none" }}>
            {filteredCustomers.map(renderCustomerCard)}
            <RecentActivityList
              activities={recentActivity}
              maxH="500px"
              overflowY="auto"
            />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      minH="100vh"
      bg={colors.bgColor}
      p={{ base: 4, md: 8 }}
      maxW="100vw"
      overflow="hidden"
    >
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
      >
        <Box>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            Customers
          </Text>
          <Text color="gray.500">Manage and analyze your customer base</Text>
        </Box>
        <Button
          leftIcon={<FiUserPlus />}
          colorScheme="blue"
          onClick={onOpen}
          w={{ base: "100%", md: "auto" }}
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
