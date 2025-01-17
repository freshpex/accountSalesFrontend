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
  Button,
  useBreakpointValue,
  Flex,
  Image,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useColors } from '../../../utils/colors';
import { STATUS_CONFIG, PAYMENT_STATUS_CONFIG } from '../../../utils/constants';
import { convertToPublicUrl } from '../../../utils/supabase';

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

  const renderStatus = (status, paymentStatus) => {
    const statusConfig = STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;
    const paymentConfig = PAYMENT_STATUS_CONFIG[paymentStatus?.toLowerCase()] || PAYMENT_STATUS_CONFIG.pending;

    return (
      <HStack spacing={2}>
        <Badge colorScheme={statusConfig.colorScheme} fontSize="xs">
          {statusConfig.label}
        </Badge>
        <Badge colorScheme={paymentConfig.colorScheme} fontSize="xs">
          {paymentConfig.label}
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
      <VStack spacing={4}>
        {/* Header with ID and Amount */}
        <Flex justify="space-between" w="full">
          <VStack align="start">
            <Text fontSize="sm" color="gray.500">Transaction ID</Text>
            <Text fontWeight="semibold">{transaction.transactionId}</Text>
          </VStack>
          <VStack align="end">
            <Text fontSize="sm" color="gray.500">Amount</Text>
            <Text fontWeight="bold">{transaction.currency} {transaction.amount}</Text>
          </VStack>
        </Flex>

        {/* Product Info */}
        {transaction.productImage && (
          <Image
            src={convertToPublicUrl(transaction.productImage)}
            alt={transaction.productType}
            borderRadius="md"
            objectFit="cover"
          />
        )}

        {/* Customer Info */}
        <Box w="full" p={3} bg="gray.50" borderRadius="md">
          <VStack align="start" spacing={1}>
            <Text fontSize="sm" color="gray.500">Customer</Text>
            <Text fontWeight="medium">{transaction.customerDetails.name}</Text>
            <Text fontSize="sm">{transaction.customerDetails.email}</Text>
            {transaction.customerDetails.phone && (
              <Text fontSize="sm">{transaction.customerDetails.phone}</Text>
            )}
          </VStack>
        </Box>

        {/* Status Badges */}
        <HStack w="full" justify="space-between">
          <Badge colorScheme={STATUS_CONFIG[transaction.status?.toLowerCase()]?.colorScheme || 'gray'}>
            {STATUS_CONFIG[transaction.status?.toLowerCase()]?.label || transaction.status}
          </Badge>
          <Badge colorScheme={PAYMENT_STATUS_CONFIG[transaction.paymentStatus?.toLowerCase()]?.colorScheme || 'gray'}>
            {PAYMENT_STATUS_CONFIG[transaction.paymentStatus?.toLowerCase()]?.label || transaction.paymentStatus}
          </Badge>
        </HStack>

        {/* Actions */}
        <HStack w="full" spacing={2}>
          <IconButton
            icon={<ViewIcon />}
            onClick={() => onView('view', transaction)}
          />
          <IconButton
            icon={<EditIcon />}
            onClick={() => onEdit('edit', transaction)}
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => onDelete('delete', transaction)}
            colorScheme="red"
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
                      src={convertToPublicUrl(transaction.productImage)}
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
