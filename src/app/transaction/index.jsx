import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { transactionData, getStatusColor, getPaymentColor } from './data';
import { useState, useCallback, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import { exportToCSV } from '../../utils/export';

const Transaction = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { filters, updateFilters } = useFilters();

  const tabs = [
    { key: 'all', label: 'All Transactions', count: transactionData.stats.all },
    { key: 'shipping', label: 'Shipping', count: transactionData.stats.shipping },
    { key: 'completed', label: 'Completed', count: transactionData.stats.completed },
    { key: 'cancelled', label: 'Cancel', count: transactionData.stats.cancelled },
  ];

  const applyFilters = useCallback((data) => {
    return data.filter(item => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        item.id.toLowerCase().includes(searchLower) ||
        item.productName.toLowerCase().includes(searchLower) ||
        item.customer.toLowerCase().includes(searchLower);
      
      const matchesStatus = selectedTab === 'all' || 
        item.status.toLowerCase() === selectedTab.toLowerCase();
      
      const matchesPayment = !filters.payment || 
        item.payment.toLowerCase() === filters.payment.toLowerCase();
      
      const matchesDate = !filters.date || 
        new Date(item.date) >= new Date(filters.date);
      
      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });
  }, [searchQuery, selectedTab, filters]);

  useEffect(() => {
    const filtered = applyFilters(transactionData.transactions);
    setFilteredData(filtered);
    setPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedTab, filters, applyFilters]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    updateFilters({ search: value });
  };

  const handleFilter = (type, value) => {
    updateFilters({ [type]: value });
  };

  const handleExport = () => {
    if (filteredData.length === 0) return;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `transactions-${selectedTab}-${timestamp}`;
    
    const dataToExport = filteredData.map(item => ({
      'Transaction ID': item.id,
      'Product': item.productName,
      'Customer': item.customer,
      'Price': `$${item.price}`,
      'Date': new Date(item.date).toLocaleString(),
      'Payment': item.payment,
      'Status': item.status
    }));
    
    exportToCSV(dataToExport, filename);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header */}
      <Box mb={6}>
        <Text fontSize="2xl" mb={2}>
          Transactions
        </Text>
        <Breadcrumb fontSize="sm" color="gray.500">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">All Transactions</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      {/* Search and Actions */}
      <Flex justify="space-between" mb={6} gap={4} flexWrap="wrap">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>

        <HStack spacing={4}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Menu placement="right-start">
                  <MenuButton w="full">Payment Status</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleFilter('payment', 'Paid')}>Paid</MenuItem>
                    <MenuItem onClick={() => handleFilter('payment', 'Unpaid')}>Unpaid</MenuItem>
                    <MenuItem onClick={() => handleFilter('payment', 'Pending')}>Pending</MenuItem>
                    <MenuItem onClick={() => handleFilter('payment', null)}>Clear</MenuItem>
                  </MenuList>
                </Menu>
              </MenuItem>
              <MenuItem>
                <Input
                  type="date"
                  onChange={(e) => handleFilter('date', e.target.value)}
                />
              </MenuItem>
              <MenuItem onClick={() => {
                updateFilters({
                  payment: null,
                  date: null
                });
                setSearchQuery('');
              }}>
                Clear All Filters
              </MenuItem>
            </MenuList>
          </Menu>

          <Button 
            onClick={handleExport} 
            leftIcon={<ChevronDownIcon />}
            isDisabled={filteredData.length === 0}
          >
            Export
          </Button>

          <Button colorScheme="blue" leftIcon={<ChevronDownIcon />}>
            New Transaction
          </Button>
        </HStack>
      </Flex>

      {/* Tabs */}
      <Flex
        overflowX="auto"
        borderBottom="1px"
        borderColor="gray.200"
        mb={6}
        whiteSpace="nowrap"
      >
        {tabs.map((tab) => (
          <Box
            key={tab.key}
            px={4}
            py={2}
            cursor="pointer"
            borderBottom="2px"
            borderColor={selectedTab === tab.key ? 'blue.500' : 'transparent'}
            color={selectedTab === tab.key ? 'blue.500' : 'gray.600'}
            onClick={() => setSelectedTab(tab.key)}
          >
            {tab.label} ({tab.count})
          </Box>
        ))}
      </Flex>

      {/* Table */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th px={4} py={4}>
                <Checkbox />
              </Th>
              <Th>Transaction</Th>
              <Th>Customer</Th>
              <Th>Price</Th>
              <Th>Date</Th>
              <Th>Payment</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentData.map((transaction) => (
              <Tr key={transaction.id}>
                <Td px={4}>
                  <Checkbox />
                </Td>
                <Td>
                  <HStack spacing={3}>
                    <Image
                      src={transaction.productImage}
                      alt={transaction.productName}
                      boxSize="40px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Box>
                      <Text color="blue.500" fontWeight="medium">
                        {transaction.id}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {transaction.productName}
                      </Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>{transaction.customer}</Td>
                <Td>${transaction.price}</Td>
                <Td>{transaction.date}</Td>
                <Td>
                  <Badge
                    px={2}
                    py={1}
                    borderRadius="full"
                    {...getPaymentColor(transaction.payment)}
                  >
                    {transaction.payment}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    px={2}
                    py={1}
                    borderRadius="full"
                    {...getStatusColor(transaction.status)}
                  >
                    {transaction.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<ViewIcon />}
                      variant="ghost"
                      aria-label="View"
                      size="sm"
                    />
                    <IconButton
                      icon={<EditIcon />}
                      variant="ghost"
                      aria-label="Edit"
                      size="sm"
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      variant="ghost"
                      aria-label="Delete"
                      size="sm"
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <Flex justify="space-between" align="center" mt={6}>
        <Text color="gray.600">
          {`${(page - 1) * itemsPerPage + 1} - ${Math.min(page * itemsPerPage, filteredData.length)} of ${filteredData.length} Transactions`}
        </Text>
        <HStack spacing={2}>
          <Button
            variant="ghost"
            isDisabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Select value={page} onChange={(e) => setPage(Number(e.target.value))} w="70px">
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
          <Button
            variant="ghost"
            isDisabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Transaction;