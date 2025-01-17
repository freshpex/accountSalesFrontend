import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Badge,
  IconButton,
  HStack,
  Box,
  Text,
  Select,
  Button,
  Stack,
  useBreakpointValue,
  Flex,
  Image,
  Tooltip,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useColors } from '../../../utils/colors';

const MotionBox = motion(Box);

const TransactionTable = ({
  data = [],
  selectedItems = [],
  onSelectAll,
  onSelectItem,
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  getStatusColor,
  getPaymentColor
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const colors = useColors();

  const renderStatus = (status, payment) => {
    // Status badge setup
    const statusConfig = {
      completed: { color: 'green', label: 'Completed' },
      pending: { color: 'yellow', label: 'Pending' },
      cancelled: { color: 'red', label: 'Cancelled' },
      processing: { color: 'blue', label: 'Processing' },
      failed: { color: 'red', label: 'Failed' }
    };

    // Payment badge setup
    const paymentConfig = {
      paid: { color: 'green', label: 'Paid' },
      pending: { color: 'yellow', label: 'Pending' },
      failed: { color: 'red', label: 'Failed' },
      refunded: { color: 'purple', label: 'Refunded' }
    };

    return (
      <HStack spacing={2}>
        <Badge {...getStatusColor(status)} fontSize="xs">
          {statusConfig[status]?.label || status}
        </Badge>
        <Badge {...getPaymentColor(payment)} fontSize="xs">
          {paymentConfig[payment]?.label || payment}
        </Badge>
      </HStack>
    );
  };

  const renderMobileCard = (transaction) => (
    <MotionBox
      key={transaction.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <VStack spacing={4} p={4} bg={colors.cardBg} borderRadius="xl" position="relative">
        {/* Status Badge - Floating */}
        <HStack 
          position="absolute" 
          top={-2} 
          right={-2} 
          spacing={2} 
          bg={colors.glassBg} 
          p={2} 
          borderRadius="full"
          backdropFilter="blur(8px)"
        >
          {renderStatus(transaction.status, transaction.paymentStatus)}
        </HStack>

        {/* Header */}
        <HStack w="full" justify="space-between">
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" color="gray.500">Transaction ID</Text>
            <Text fontWeight="bold" color="blue.500">
              #{transaction.transactionId}
            </Text>
          </VStack>
          <VStack align="end" spacing={0}>
            <Text fontSize="xs" color="gray.500">Amount</Text>
            <Text fontWeight="bold" fontSize="lg">
              {transaction.currency} {transaction.amount?.toLocaleString()}
            </Text>
          </VStack>
        </HStack>

        {/* Product Info */}
        <HStack w="full" spacing={4}>
          <Box 
            position="relative" 
            w="80px" 
            h="80px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={transaction.productImage}
              alt={transaction.productName}
              layout="fill"
              objectFit="cover"
              fallbackSrc="/placeholder.png"
            />
            {transaction.productType && (
              <Box
                position="absolute"
                bottom={0}
                w="full"
                bg={colors.glassBg}
                p={1}
                textAlign="center"
              >
                <Text fontSize="xs" color="white">
                  {transaction.productType}
                </Text>
              </Box>
            )}
          </Box>
          <VStack align="start" flex={1} spacing={1}>
            <Text fontWeight="medium" noOfLines={2}>
              {transaction.productName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(transaction.createdAt).toLocaleString()}
            </Text>
          </VStack>
        </HStack>

        {/* Customer Info */}
        <VStack w="full" align="start" spacing={1} bg={colors.hoverBg} p={3} borderRadius="md">
          <Text fontSize="xs" color="gray.500">Customer Details</Text>
          <Text fontWeight="medium">{transaction.customerDetails.name}</Text>
          <Text fontSize="sm">{transaction.customerDetails.email}</Text>
          {transaction.customerDetails.phone && (
            <Text fontSize="sm">{transaction.customerDetails.phone}</Text>
          )}
        </VStack>

        {/* Payment Info */}
        <SimpleGrid columns={2} w="full" spacing={4}>
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" color="gray.500">Payment Method</Text>
            <Text>{transaction.paymentMethod}</Text>
          </VStack>
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" color="gray.500">Reference</Text>
            <Text noOfLines={1}>{transaction.flutterwaveReference || 'N/A'}</Text>
          </VStack>
        </SimpleGrid>

        {/* Actions */}
        <HStack w="full" spacing={2} pt={2} borderTop="1px" borderColor={colors.borderColor}>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<ViewIcon />}
            onClick={() => onView('view', transaction)}
            flex={1}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<EditIcon />}
            onClick={() => onEdit('edit', transaction)}
            flex={1}
          >
            Edit
          </Button>
          <IconButton
            icon={<DeleteIcon />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={() => onDelete('delete', transaction)}
            aria-label="Delete transaction"
          />
        </HStack>
      </VStack>
    </MotionBox>
  );

  const renderDesktopTable = () => (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                isChecked={data.length > 0 && selectedItems.length === data.length}
                isIndeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                onChange={onSelectAll}
              />
            </Th>
            <Th>Transaction ID</Th>
            <Th>Product</Th>
            <Th>Customer</Th>
            <Th>Amount</Th>
            <Th>Payment Method</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>
                <Checkbox
                  isChecked={selectedItems.includes(transaction.id)}
                  onChange={() => onSelectItem(transaction.id)}
                />
              </Td>
              <Td>
                <Text color="blue.500" fontWeight="medium">
                  {transaction.transactionId}
                </Text>
              </Td>
              <Td>
                <HStack>
                  {transaction.productImage && (
                    <Image
                      src={transaction.productImage}
                      alt={transaction.productName}
                      boxSize="40px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  )}
                  <Text>{transaction.productName}</Text>
                </HStack>
              </Td>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text>{transaction.customerDetails?.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {transaction.customerDetails?.email}
                  </Text>
                </VStack>
              </Td>
              <Td>
                <Text fontWeight="medium">
                  {transaction.currency} {transaction.price?.toFixed(2)}
                </Text>
              </Td>
              <Td>{transaction.paymentMethod}</Td>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text>{new Date(transaction.date).toLocaleDateString()}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(transaction.date).toLocaleTimeString()}
                  </Text>
                </VStack>
              </Td>
              <Td>{renderStatus(transaction.status, transaction.payment)}</Td>
              <Td>
                <HStack>
                  <IconButton
                    icon={<ViewIcon />}
                    onClick={() => onView('view', transaction)}
                    aria-label="View"
                    size="sm"
                  />
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => onEdit('edit', transaction)}
                    aria-label="Edit"
                    size="sm"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => onDelete('delete', transaction)}
                    aria-label="Delete"
                    size="sm"
                    colorScheme="red"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      {/* Pagination */}
      <Flex justify="space-between" align="center" mt={4}>
        <Text fontSize="sm">
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{' '}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
        </Text>
        <HStack>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            size="sm"
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            size="sm"
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );

  return isMobile ? (
    <VStack spacing={4}>
      {data.map(renderMobileCard)}
    </VStack>
  ) : (
    renderDesktopTable()
  );
};

export default TransactionTable;
