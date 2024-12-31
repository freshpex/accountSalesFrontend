import TransactionModal from './modal/TransactionModal';
import TransactionTable from './components/tables';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
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

  const [modalData, setModalData] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  const handleModalOpen = (action, data = null) => {
    setModalAction(action);
    setModalData(data);
  };

  const handleModalClose = () => {
    setModalAction(null);
    setModalData(null);
  };

  const handleSaveTransaction = (data) => {
    // Implement save logic here
    console.log('Saving transaction:', data);
    handleModalClose();
  };

  const handleDeleteTransaction = (data) => {
    // Implement delete logic here
    console.log('Deleting transaction:', data);
    handleModalClose();
  };

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

          <Button 
            colorScheme="blue" 
            leftIcon={<ChevronDownIcon />}
            onClick={() => handleModalOpen('add')}
          >
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

      <TransactionTable
        data={currentData}
        selectedItems={[]} // Add selected items state if needed
        onSelectAll={(e) => {/* Add select all handler */}}
        onSelectItem={(id) => {/* Add select item handler */}}
        currentPage={page}
        totalPages={totalPages}
        pageSize={itemsPerPage}
        totalItems={filteredData.length}
        onPageChange={setPage}
        onView={handleModalOpen}
        onDelete={handleModalOpen}
        getStatusColor={getStatusColor}
        getPaymentColor={getPaymentColor}
      />

      {/* Modal */}
      <TransactionModal
        isOpen={!!modalAction}
        onClose={handleModalClose}
        data={modalData}
        action={modalAction}
        onSave={handleSaveTransaction}
        onDelete={handleDeleteTransaction}
      />
    </Container>
  );
};

export default Transaction;