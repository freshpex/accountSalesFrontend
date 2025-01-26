import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Flex,
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
  Button,
  TabList,
  Tabs,
  Tab,
  VStack,
  Icon,
  HStack,
  Grid,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  FiArchive,
  FiInbox,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import TransactionModal from "./modal/TransactionModal";
import TransactionTable from "./components/tables";
import { getStatusColor, getPaymentColor } from "../../utils/utils";
import { useFilters } from "../../context/FilterContext";
import { exportToCSV } from "../../utils/export";
import EmptyStatePage from "../../components/emptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  getTransactions,
  getTransactionStats,
  getTransactionMeta,
  getLoading,
} from "./redux/selector";
import {
  fetch_transactions,
  add_transaction,
  update_transaction,
  delete_transaction,
  update_filters,
  reset_filters,
} from "./redux/reducer";
import { useColors } from "../../utils/colors";
import TransactionLookup from "./components/TransactionLookup";

const TransactionTabs = () => {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState("all");
  const stats = useSelector(getTransactionStats);

  const tabs = [
    { id: "all", label: "All", count: stats?.all || 0, icon: FiInbox },
    {
      id: "completed",
      label: "Completed",
      count: stats?.completed || 0,
      icon: FiCheckCircle,
    },
    {
      id: "pending",
      label: "Pending",
      count: stats?.pending || 0,
      icon: FiClock,
    },
    {
      id: "failed",
      label: "Failed",
      count: stats?.failed || 0,
      icon: FiXCircle,
    },
  ];

  return (
    <Tabs onChange={setActiveTab} value={activeTab} variant="unstyled" w="100%">
      <TabList
        bg={colors.cardBg}
        p={2}
        borderRadius="lg"
        border="1px solid"
        borderColor={colors.borderColor}
        display="flex"
        gap={2}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            flex={1}
            py={3}
            px={4}
            borderRadius="md"
            _selected={{
              bg: colors.accentLight,
              color: colors.buttonPrimaryBg,
              fontWeight: "600",
            }}
            transition="all 0.2s"
          >
            <VStack spacing={1}>
              <Icon as={tab.icon} boxSize={5} />
              <Text fontSize="sm">{tab.label}</Text>
              <Text fontSize="xs" fontWeight="bold">
                {tab.count}
              </Text>
            </VStack>
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

const Transaction = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.accountSettings.data.profile);
  const transactions = useSelector(getTransactions);
  const stats = useSelector(getTransactionStats);
  const meta = useSelector(getTransactionMeta);
  const loading = useSelector(getLoading);
  const [selectedItems, setSelectedItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
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
    if (data.action === "edit") {
      dispatch(
        update_transaction({
          id: data.id,
          data: {
            amount: data.amount,
            status: data.status,
            paymentStatus: data.paymentStatus,
            paymentMethod: data.paymentMethod,
            notes: data.notes,
            metadata: data.metadata,
          },
        }),
      );
    } else {
      dispatch(add_transaction(data));
    }
    handleModalClose();
  };

  const handleDeleteTransaction = (data) => {
    if (!data?.id && !data?._id) {
      return "Invalid transaction ID";
    }

    dispatch(delete_transaction(data.id || data._id));
    handleModalClose();
  };

  useEffect(() => {
    setPage(1);
  }, [selectedTab, searchQuery, filters]);

  useEffect(() => {
    dispatch(
      fetch_transactions({
        status: selectedTab,
        page,
        limit: itemsPerPage,
        search: searchQuery,
        ...filters,
      }),
    );
  }, [dispatch, selectedTab, page, itemsPerPage, filters, searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    dispatch(update_filters({ search: value }));
  };

  const handleFilter = (type, value) => {
    dispatch(update_filters({ [type]: value }));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    dispatch(reset_filters());
  };

  const handleExport = () => {
    if (!transactions.length) return;

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `transactions-${selectedTab}-${timestamp}`;

    const dataToExport = transactions.map((item) => ({
      "Transaction ID": item.id,
      Product: item.productName,
      Customer: item.customer,
      Price: `₦${item.price}`,
      Date: new Date(item.date).toLocaleString(),
      Payment: item.payment,
      Status: item.status,
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
          isLink={true}
          link="/product/instagram"
        />
      );
    }

    return (
      <>
        {/* Hide export and bulk actions for non-admin users */}
        {profile?.role === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Grid
              templateColumns={{ base: "1fr", md: "1fr auto" }}
              gap={4}
              mb={6}
            >
              <InputGroup
                bg={colors.cardBg}
                borderRadius="lg"
                border="1px solid"
                borderColor={colors.borderColor}
              >
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search transactions..."
                  border="none"
                  _focus={{ boxShadow: "none" }}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </InputGroup>

              <HStack spacing={2}>
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
                          <MenuItem
                            onClick={() => handleFilter("payment", "Paid")}
                          >
                            Paid
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilter("payment", "Unpaid")}
                          >
                            Unpaid
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilter("payment", "Pending")}
                          >
                            Pending
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleFilter("payment", null)}
                          >
                            Clear
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </MenuItem>
                    <MenuItem>
                      <Input
                        type="date"
                        onChange={(e) => handleFilter("date", e.target.value)}
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
              </HStack>
            </Grid>
          </motion.div>
        )}

        {/* Tabs */}
        <Box
          overflowX="auto"
          mb={4}
          mx={-3}
          px={3}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <TransactionTabs />
        </Box>

        <Box overflowX="hidden" mx={-3} px={3}>
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
            colors={colors}
          />
        </Box>
      </>
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === transactions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(transactions.map((t) => t.id || t._id));
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <Container maxW="100%" p={0}>
      <Box
        bg={colors.glassBg}
        backdropFilter="blur(10px)"
        position="sticky"
        top={0}
        zIndex={10}
        borderBottom="1px solid"
        borderColor={colors.borderColor}
        px={6}
        py={4}
      >
        <Flex direction="column" gap={4}>
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">
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
            </VStack>
          </Flex>
        </Flex>
      </Box>

      <Box p={6}>
        <TransactionLookup />

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
        colors={colors}
      />
    </Container>
  );
};

export default Transaction;
