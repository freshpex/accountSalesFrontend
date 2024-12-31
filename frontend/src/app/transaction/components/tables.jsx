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
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { ViewIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const TransactionTable = ({
  data,
  selectedItems,
  onSelectAll,
  onSelectItem,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onView,
  onDelete,
  getStatusColor,
  getPaymentColor
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgCard = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const renderMobileCard = (transaction) => (
    <MotionBox
      key={transaction.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      bg={bgCard}
      p={4}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
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
            {...getPaymentColor(transaction.payment)}
          >
            {transaction.payment}
          </Badge>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="gray.600">Status</Text>
          <Badge
            px={2}
            py={1}
            borderRadius="full"
            {...getStatusColor(transaction.status)}
          >
            {transaction.status}
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
      borderColor={borderColor}
    >
      <Table variant="simple" sx={{
        'th, td': {
          whiteSpace: 'nowrap',
        },
        'thead': {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: useColorModeValue('white', 'gray.800'),
        }
      }}>
        <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
          <Tr>
            <Th w="40px">
              <Checkbox
                isChecked={selectedItems.length === data.length}
                isIndeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                onChange={onSelectAll}
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
          {data.map((transaction) => (
            <Tr
              key={transaction.id}
              as="tr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              _hover={{ bg: hoverBg }}
            >
              <Td>
                <Checkbox
                  isChecked={selectedItems.includes(transaction.id)}
                  onChange={() => onSelectItem(transaction.id)}
                  colorScheme="blue"
                />
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
              <Td>{new Date(transaction.createdDate).toLocaleString()}</Td>
              <Td>{new Date(transaction.updatedDate).toLocaleString()}</Td>
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
                  <Tooltip label="View Details">
                    <IconButton
                      icon={<ViewIcon />}
                      variant="ghost"
                      colorScheme="blue"
                      size="sm"
                      onClick={() => onView('view', transaction)}
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
          bg={bgCard}
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
