import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Container, Flex, Input, InputGroup, InputLeftElement,
  Text, Menu, MenuButton, MenuList, MenuItem, Breadcrumb, BreadcrumbItem,
  BreadcrumbLink, Button, Stack
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

  console.log('Transactions:', transactions);
  
  const [selectedItems, setSelectedItems] = useState([]);

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
    if (data.action === 'edit') {
      dispatch(update_transaction({
        id: data.id,
        data: {
          amount: data.amount,
          status: data.status,
          paymentStatus: data.paymentStatus,
          paymentMethod: data.paymentMethod,
          notes: data.notes,
          metadata: data.metadata
        }
      }));
    } else {
      dispatch(add_transaction(data));
    }
    handleModalClose();
  };

  const handleDeleteTransaction = (data) => {
    if (!data?.id && !data?._id) {
      return 'Invalid transaction ID';
    }
    
    dispatch(delete_transaction(data.id || data._id));
    handleModalClose();
  };

  const tabs = [
    { key: 'all', label: 'All Transactions', count: stats?.all || 0 },
    { key: 'shipping', label: 'Shipping', count: stats?.shipping || 0 },
    { key: 'completed', label: 'Completed', count: stats?.completed || 0 },
    { key: 'cancelled', label: 'Cancelled', count: stats?.cancelled || 0 },
  ];

  useEffect(() => {
    dispatch(fetch_transactions({ 
      status: selectedTab,
      page,
      limit: itemsPerPage,
      search: searchQuery,
      ...filters
    }));
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
      'Price': `₦${item.price}`,
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
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          gap={3} 
          mb={4}
          w="100%"
        >
          <InputGroup maxW={{ base: "100%", md: "400px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>

          <Stack 
            direction={{ base: "row", md: "row" }} 
            spacing={2} 
            w={{ base: "100%", md: "auto" }}
            overflowX={{ base: "auto", md: "visible" }}
            pb={{ base: 2, md: 0 }}
            sx={{
              '::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            <Menu>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />}
                minW="auto"
                size="sm"
              >
                Filter
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Text>Payment Status</Text>
                  <Menu placement="right-start">
                    <MenuButton as={Box} w="full" cursor="pointer">
                      Payment Status
                    </MenuButton>
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
              minW="auto"
              size="sm"
            >
              Export
            </Button>

            <Button 
              colorScheme="blue" 
              leftIcon={<ChevronDownIcon />}
              onClick={() => handleModalOpen('add')}
              minW="auto"
              size="sm"
            >
              New
            </Button>
          </Stack>
        </Flex>

        {/* Tabs */}
        <Box 
          overflowX="auto" 
          mb={4}
          mx={-3}
          px={3}
          sx={{
            '::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          <Flex 
            borderBottom="1px"
            borderColor={colors.borderColor}
            whiteSpace="nowrap"
            minW="min-content"
          >
            {tabs.map((tab) => (
              <Box
                key={tab.key}
                px={3}
                py={2}
                cursor="pointer"
                fontSize={{ base: "sm", md: "md" }}
                borderBottom="2px"
                borderColor={selectedTab === tab.key ? 'blue.500' : 'transparent'}
                color={selectedTab === tab.key ? 'blue.500' : colors.textColor}
                onClick={() => setSelectedTab(tab.key)}
              >
                {tab.label} ({stats[tab.key] || 0})
              </Box>
            ))}
          </Flex>
        </Box>

        <Box 
          overflowX="hidden"
          mx={-3}
          px={3}
        >
          <TransactionTable
            data={transactions}
            selectedItems={selectedItems}
            onSelectAll={handleSelectAll}
            onSelectItem={handleSelectItem}
            currentPage={page}
            totalPages={meta.totalPages}
            pageSize={itemsPerPage}
            totalItems={meta.totalItems}
            onPageChange={setPage}
            onView={handleModalOpen}
            onDelete={handleModalOpen}
            getStatusColor={getStatusColor}
            getPaymentColor={getPaymentColor}
            onEdit={handleModalOpen}
          />
        </Box>
      </>
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === transactions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(transactions.map(t => t.id || t._id));
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <Container 
      maxW="100%"
      p={0}
      bg={colors.bgColor} 
      color={colors.textColor}
    >
      {/* Header */}
      <Box px={3} py={4}>
        <Text fontSize={{ base: "xl", md: "2xl" }} mb={2}>
          Transactions
        </Text>
        <Breadcrumb display={{ base: "none", md: "flex" }} fontSize="sm" color="gray.500">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">All Transactions</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box px={3}>
        {renderContent()}
      </Box>

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