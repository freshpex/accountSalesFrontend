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
  import { useState } from 'react';
  
  const Transaction = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');
    const [page, setPage] = useState(1);
  
    const tabs = [
      { key: 'all', label: 'All Transactions', count: transactionData.stats.all },
      { key: 'shipping', label: 'Shipping', count: transactionData.stats.shipping },
      { key: 'completed', label: 'Completed', count: transactionData.stats.completed },
      { key: 'cancelled', label: 'Cancel', count: transactionData.stats.cancelled },
    ];
  
    return (
      <Container maxW="container.xl" py={8}>
        {/* Header */}
        <Box mb={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Transactions
          </Text>
          <Breadcrumb fontSize="sm" color="gray.500">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Transactions</BreadcrumbLink>
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
              placeholder="Search for id, name product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
  
          <HStack spacing={4}>
            <Button
              leftIcon={<ChevronDownIcon />}
              variant="outline"
            >
              Filter
            </Button>
            <Button
              leftIcon={<ChevronDownIcon />}
              variant="outline"
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
              {transactionData.transactions.map((transaction) => (
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
            1 - 10 of 13 Pages
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
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Select>
            <Button
              variant="ghost"
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