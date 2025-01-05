import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Container, Flex, HStack, Input, InputGroup, InputLeftElement,
  Text, Menu, MenuButton, MenuList, MenuItem, Breadcrumb, BreadcrumbItem,
  BreadcrumbLink, Button
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FiArchive } from 'react-icons/fi';
import TransactionModal from './modal/TransactionModal';
import TransactionTable from './components/tables';
import { getStatusColor, getPaymentColor } from '../../utils/utils';
import { useFilters } from '../../context/FilterContext';
import { exportToCSV } from '../../utils/export';
import EmptyStatePage from '../../components/emptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  getTransactions,
  getTransactionStats,
  getTransactionMeta,
  getLoading
} from './redux/selector';
import {
  fetch_transactions,
  add_transaction,
  update_transaction,
  delete_transaction,
  update_filters,
  reset_filters
} from './redux/reducer';
import { useColors } from '../../utils/colors';

const Transaction = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(getTransactions);
  const stats = useSelector(getTransactionStats);
  const meta = useSelector(getTransactionMeta);
  const loading = useSelector(getLoading);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { filters } = useFilters();
  const colors = useColors();

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
    if (modalAction === 'add') {
      dispatch(add_transaction(data));
    } else {
      dispatch(update_transaction({ id: data.id, data }));
    }
    handleModalClose();
  };

  const handleDeleteTransaction = (data) => {
    dispatch(delete_transaction(data.id));
    handleModalClose();
  };

  const tabs = [
    { key: 'all', label: 'All Transactions', count: stats?.all || 0 },
    { key: 'shipping', label: 'Shipping', count: stats?.shipping || 0 },
    { key: 'completed', label: 'Completed', count: stats?.completed || 0 },
    { key: 'cancelled', label: 'Cancelled', count: stats?.cancelled || 0 },
  ];

  useEffect(() => {
    if (!loading) {
      dispatch(fetch_transactions({ 
        status: selectedTab,
        page,
        limit: itemsPerPage,
        search: searchQuery,
        ...filters
      }));
    }
  }, [dispatch, selectedTab, page, itemsPerPage, filters, searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    dispatch(update_filters({ search: value }));
  };

  const handleFilter = (type, value) => {
    dispatch(update_filters({ [type]: value }));
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    dispatch(reset_filters());
  };

  const handleExport = () => {
    if (!transactions.length) return;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `transactions-${selectedTab}-${timestamp}`;
    
    const dataToExport = transactions.map(item => ({
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!stats) {
    return <LoadingSpinner />;
  }

  const renderContent = () => {
    if (!transactions.length) {
      return (
        <EmptyStatePage
          title="No Transactions Found"
          sub="Get started by adding your first transaction"
          icon={<FiArchive size={50} />}
          btnText="Add Transaction"
          handleClick={() => handleModalOpen('add')}
        />
      );
    }

    return (
      <>
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
              bg={colors.bgColor}
              color={colors.textColor}
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
                    bg={colors.bgColor}
                    color={colors.textColor}
                  />
                </MenuItem>
                <MenuItem onClick={handleClearFilters}>
                  Clear All Filters
                </MenuItem>
              </MenuList>
            </Menu>

            <Button 
              onClick={handleExport} 
              leftIcon={<ChevronDownIcon />}
              isDisabled={!transactions.length}
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
          borderColor={colors.borderColor}
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
              color={selectedTab === tab.key ? 'blue.500' : colors.textColor}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label} ({stats[tab.key] || 0})
            </Box>
          ))}
        </Flex>

        <TransactionTable
          data={transactions}
          currentPage={page}
          totalPages={meta.totalPages}
          pageSize={itemsPerPage}
          totalItems={meta.totalItems}
          onPageChange={setPage}
          onView={handleModalOpen}
          onDelete={handleModalOpen}
          getStatusColor={getStatusColor}
          getPaymentColor={getPaymentColor}
        />
      </>
    );
  };

  return (
    <Container maxW="container.xl" py={8} bg={colors.bgColor} color={colors.textColor}>
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

      {renderContent()}

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