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
} from '@chakra-ui/react';
import { ViewIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon, EditIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useColors } from '../../../utils/colors';

const MotionBox = motion(Box);

const TransactionTable = ({
  data = [],
  selectedItems = [],
  onSelectAll = () => {},
  onSelectItem = () => {},
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

  // Add these checks at the beginning
  const handleSelectAll = () => {
    if (typeof onSelectAll === 'function') {
      onSelectAll();
    }
  };

  const handleSelectItem = (id) => {
    if (typeof onSelectItem === 'function') {
      onSelectItem(id);
    }
  };

  const renderMobileCard = (transaction) => (
    <MotionBox
      key={transaction.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      bg={colors.bgColor}
      p={4}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={colors.borderColor}
      shadow="sm"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'md',
        borderColor: 'blue.400',
      }}
    >
      <HStack spacing={3} mb={3}>
        <Image
          src={transaction.productImage}
          alt={transaction.productName}
          boxSize="60px"
          objectFit="cover"
          borderRadius="md"
        />
        <Box flex="1">
          <Text color="blue.500" fontWeight="medium">
            {transaction.id}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {transaction.productName}
          </Text>
        </Box>
      </HStack>

      <Stack spacing={2}>
        <Flex justify="space-between">
          <Text fontSize="sm" color="gray.600">Customer</Text>
          <Text fontSize="sm">{transaction.customer}</Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="sm" color="gray.600">Price</Text>
          <Text fontSize="sm">${transaction.price}</Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="sm" color="gray.600">Date</Text>
          <Text fontSize="sm">{transaction.date}</Text>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="gray.600">Payment</Text>
          <Badge
            px={2}
            py={1}
            borderRadius="full"
            {...getPaymentColor(transaction?.payment || 'pending')}
          >
            {transaction?.payment || 'Pending'}
          </Badge>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="gray.600">Status</Text>
          <Badge
            px={2}
            py={1}
            borderRadius="full"
            {...getStatusColor(transaction?.status || 'pending')}
          >
            {transaction?.status || 'Pending'}
          </Badge>
        </Flex>

        <Flex justify="flex-end" mt={2}>
          <HStack spacing={2}>
            <IconButton
              icon={<ViewIcon />}
              variant="ghost"
              aria-label="View"
              size="sm"
              onClick={() => onView('view', transaction)}
            />
            <IconButton
              icon={<EditIcon />}
              variant="ghost"
              aria-label="Edit"
              size="sm"
              onClick={() => onEdit('edit', transaction)}
            />
            <IconButton
              icon={<DeleteIcon />}
              variant="ghost"
              aria-label="Delete"
              size="sm"
              onClick={() => onDelete('delete', transaction)}
            />
          </HStack>
        </Flex>
      </Stack>
    </MotionBox>
  );

  const renderDesktopTable = () => (
    <Box
      position="relative"
      overflowX="auto"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={colors.borderColor}
    >
      <Table variant="simple" sx={{
        'th, td': {
          whiteSpace: 'nowrap',
        },
        'thead': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: colors.bgColor,
        }
      }}>
        <Thead bg={colors.bgColor}>
          <Tr>
            <Th w="40px">
              <Checkbox
                isChecked={data.length > 0 && selectedItems.length === data.length}
                isIndeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                onChange={handleSelectAll}
                colorScheme="blue"
              />
            </Th>
            <Th>Transaction</Th>
            <Th>Customer</Th>
            <Th>Price</Th>
            <Th>Date</Th>
            <Th>Created</Th>
            <Th>Updated</Th>
            <Th>Payment</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(data || []).map((transaction) => (
            <Tr
              key={transaction.id || transaction._id}
              as="tr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              _hover={{ bg: colors.activeColor }}
            >
              <Td>
                <Checkbox
                  isChecked={selectedItems.includes(transaction.id || transaction._id)}
                  onChange={() => handleSelectItem(transaction.id || transaction._id)}
                  colorScheme="blue"
                />
              </Td>
              <Td>
                <HStack spacing={3}>
                  {transaction.productImage && (
                    <Image
                      src={transaction.productImage}
                      alt={transaction.productName || 'Product'}
                      boxSize="40px"
                      objectFit="cover"
                      borderRadius="md"
                      fallbackSrc="/placeholder.png"
                    />
                  )}
                  <Box>
                    <Text color="blue.500" fontWeight="medium">
                      {transaction.transactionId || 'N/A'}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {transaction.productName || 'N/A'}
                    </Text>
                  </Box>
                </HStack>
              </Td>
              <Td>{transaction.customer || 'N/A'}</Td>
              <Td>${transaction.price?.toFixed(2) || '0.00'}</Td>
              <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
              <Td>{new Date(transaction.createdDate).toLocaleString()}</Td>
              <Td>{new Date(transaction.updatedDate).toLocaleString()}</Td>
              <Td>
                <Badge
                  px={2}
                  py={1}
                  borderRadius="full"
                  {...getPaymentColor(transaction?.payment || 'pending')}
                >
                  {transaction?.payment || 'Pending'}
                </Badge>
              </Td>
              <Td>
                <Badge
                  px={2}
                  py={1}
                  borderRadius="full"
                  {...getStatusColor(transaction?.status || 'pending')}
                >
                  {transaction?.status || 'Pending'}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Tooltip label="View Details">
                    <IconButton
                      icon={<ViewIcon />}
                      variant="ghost"
                      colorScheme="blue"
                      size="sm"
                      onClick={() => onView('view', transaction)}
                    />
                  </Tooltip>
                  <Tooltip label="Edit">
                    <IconButton
                      icon={<EditIcon />}
                      variant="ghost"
                      colorScheme="green"
                      size="sm"
                      onClick={() => onEdit('edit', transaction)}
                    />
                  </Tooltip>
                  <Tooltip label="Delete">
                    <IconButton
                      icon={<DeleteIcon />}
                      variant="ghost"
                      colorScheme="red"
                      size="sm"
                      onClick={() => onDelete('delete', transaction)}
                    />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  return (
    <Box>
      <Stack spacing={6}>
        {isMobile ? (
          <Stack spacing={4}>
            {data?.map(renderMobileCard)}
          </Stack>
        ) : (
          renderDesktopTable()
        )}

        <Flex
          justify="space-between"
          align="center"
          p={4}
          bg={colors.bgColor}
          borderRadius="lg"
          shadow="sm"
        >
          <Text color="gray.600" fontSize="sm">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
          </Text>
          <HStack spacing={2}>
            <Button
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              leftIcon={<ChevronLeftIcon />}
              variant="outline"
              colorScheme="blue"
            >
              Previous
            </Button>
            <Select
              size="sm"
              value={currentPage}
              onChange={(e) => onPageChange(Number(e.target.value))}
              w="70px"
              borderRadius="md"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </Select>
            <Button
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              rightIcon={<ChevronRightIcon />}
              variant="outline"
              colorScheme="blue"
            >
              Next
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default TransactionTable;
