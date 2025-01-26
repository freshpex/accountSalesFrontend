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
} from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useColors } from "../../../utils/colors";
import { STATUS_CONFIG, PAYMENT_STATUS_CONFIG } from "../../../utils/constants";
import { convertToPublicUrl } from "../../../utils/supabase";
import { useState } from "react";
import { useSelector } from "react-redux";

const MotionBox = motion(Box);

const ImageWithZoom = ({ src, alt }) => {
  const colors = useColors();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box position="relative">
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <Image
          src={src}
          alt={alt}
          boxSize="40px"
          objectFit="cover"
          borderRadius="md"
          cursor="pointer"
          onClick={() => setIsOpen(true)}
          border="1px solid"
          borderColor={colors.imageBorder}
          _hover={{
            boxShadow: colors.cardHoverShadow,
          }}
        />
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg={colors.glassHover}
            zIndex="modal"
            onClick={() => setIsOpen(false)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backdropFilter="blur(5px)"
          >
            <Image
              src={src}
              alt={alt}
              maxH="80vh"
              maxW="90vw"
              objectFit="contain"
              borderRadius="lg"
              boxShadow={colors.cardShadow}
            />
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

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
  // getStatusColor,
  // getPaymentColor
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const colors = useColors();
  const profile = useSelector((state) => state.accountSettings.data.profile);
  const isAdmin = profile?.role === "admin";

  const tableAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  const rowAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2 },
  };

  const renderStatus = (status, paymentStatus) => {
    const statusConfig =
      STATUS_CONFIG[status?.toLowerCase()] || STATUS_CONFIG.pending;
    const paymentConfig =
      PAYMENT_STATUS_CONFIG[paymentStatus?.toLowerCase()] ||
      PAYMENT_STATUS_CONFIG.pending;

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
      {...rowAnimation}
      bg={colors.cardBg}
      p={4}
      borderRadius="xl"
      border="1px solid"
      borderColor={colors.borderColor}
      mb={4}
      position="relative"
      overflow="hidden"
      boxShadow={colors.cardShadow}
      _hover={{
        borderColor: colors.borderHover,
        transform: "translateY(-2px)",
        boxShadow: colors.cardHoverShadow,
        transition: "all 0.2s",
      }}
    >
      <VStack spacing={4} align="stretch">
        {transaction.productImage && (
          <Box
            position="relative"
            h="200px"
            bg={colors.imageCardBg}
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={convertToPublicUrl(transaction.productImage)}
              alt={transaction.productType}
              w="100%"
              h="100%"
              objectFit="cover"
              transition="transform 0.3s"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
        )}

        {/* Header with ID and Amount */}
        <Flex justify="space-between" w="full">
          <VStack align="start">
            <Text fontSize="sm" color="gray.500">
              Transaction ID
            </Text>
            <Text fontWeight="semibold">{transaction.transactionId}</Text>
          </VStack>
          <VStack align="end">
            <Text fontSize="sm" color="gray.500">
              Amount
            </Text>
            <Text fontWeight="bold">
              {transaction.currency} {transaction.amount}
            </Text>
          </VStack>
        </Flex>

        {/* Customer Info */}
        <Box w="full" p={3} bg="gray.50" borderRadius="md">
          <VStack align="start" spacing={1}>
            <Text fontSize="sm" color="gray.500">
              Customer
            </Text>
            <Text fontWeight="medium">{transaction.customerDetails.name}</Text>
            <Text fontSize="sm">{transaction.customerDetails.email}</Text>
            {transaction.customerDetails.phone && (
              <Text fontSize="sm">{transaction.customerDetails.phone}</Text>
            )}
          </VStack>
        </Box>

        {/* Status Badges */}
        <HStack w="full" justify="space-between">
          <Badge
            colorScheme={
              STATUS_CONFIG[transaction.status?.toLowerCase()]?.colorScheme ||
              "gray"
            }
          >
            {STATUS_CONFIG[transaction.status?.toLowerCase()]?.label ||
              transaction.status}
          </Badge>
          <Badge
            colorScheme={
              PAYMENT_STATUS_CONFIG[transaction.paymentStatus?.toLowerCase()]
                ?.colorScheme || "gray"
            }
          >
            {PAYMENT_STATUS_CONFIG[transaction.paymentStatus?.toLowerCase()]
              ?.label || transaction.paymentStatus}
          </Badge>
        </HStack>

        {/* Actions */}
        <HStack w="full" spacing={2}>
          {isAdmin && (
            <>
              <IconButton
                icon={<ViewIcon />}
                onClick={() => onView("view", transaction)}
              />
              <IconButton
                icon={<EditIcon />}
                onClick={() => onEdit("edit", transaction)}
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => onDelete("delete", transaction)}
                colorScheme="red"
              />
            </>
          )}
        </HStack>
      </VStack>
    </MotionBox>
  );

  const renderDesktopTable = () => (
    <MotionBox {...tableAnimation}>
      <Box
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor={colors.borderColor}
        boxShadow={colors.cardShadow}
      >
        <Table variant="simple">
          <Thead bg={colors.tableHeaderBg}>
            <Tr>
              {isAdmin && (
                <Th>
                  <Checkbox
                    isChecked={
                      data.length > 0 && selectedItems.length === data.length
                    }
                    isIndeterminate={
                      selectedItems.length > 0 &&
                      selectedItems.length < data.length
                    }
                    onChange={onSelectAll}
                  />
                </Th>
              )}
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
              <Tr
                key={transaction.id}
                _hover={{
                  bg: colors.tableRowHoverBg,
                  transition: "all 0.2s",
                }}
                css={{
                  "&:hover td": {
                    borderColor: colors.borderHover,
                  },
                }}
              >
                {isAdmin && (
                  <Td>
                    <Checkbox
                      isChecked={selectedItems.includes(transaction.id)}
                      onChange={() => onSelectItem(transaction.id)}
                      colorScheme="blue"
                    />
                  </Td>
                )}
                <Td>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Text
                      color={colors.buttonPrimaryBg}
                      fontWeight="medium"
                      cursor="pointer"
                      onClick={() => onView("view", transaction)}
                    >
                      {transaction.transactionId}
                    </Text>
                  </motion.div>
                </Td>
                <Td>
                  <HStack spacing={3}>
                    {transaction.productImage && (
                      <ImageWithZoom
                        src={convertToPublicUrl(transaction.productImage)}
                        alt={transaction.productName}
                      />
                    )}
                    <Text fontWeight="medium">{transaction.productName}</Text>
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
                    {transaction.currency} {transaction.amount?.toFixed(2)}
                  </Text>
                </Td>
                <Td>{transaction.paymentMethod}</Td>
                <Td>
                  <VStack align="start" spacing={0}>
                    <Text>
                      {new Date(transaction.updatedAt).toLocaleDateString()}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(transaction.updatedAt).toLocaleTimeString()}
                    </Text>
                  </VStack>
                </Td>
                <Td>{renderStatus(transaction.status, transaction.payment)}</Td>
                <Td>
                  <HStack>
                    {isAdmin && (
                      <>
                        <IconButton
                          icon={<ViewIcon />}
                          onClick={() => onView("view", transaction)}
                          aria-label="View"
                          size="sm"
                        />
                        <IconButton
                          icon={<EditIcon />}
                          onClick={() => onEdit("edit", transaction)}
                          aria-label="Edit"
                          size="sm"
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          onClick={() => onDelete("delete", transaction)}
                          aria-label="Delete"
                          size="sm"
                          colorScheme="red"
                        />
                      </>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Pagination */}
        <Box
          bg={colors.tableHeaderBg}
          p={4}
          borderTop="1px solid"
          borderColor={colors.borderColor}
        >
          <Flex justify="space-between" align="center">
            <Text fontSize="sm">
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)}{" "}
              to {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
              entries
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
      </Box>
    </MotionBox>
  );

  return isMobile ? (
    <VStack spacing={4}>{data.map(renderMobileCard)}</VStack>
  ) : (
    renderDesktopTable()
  );
};

export default TransactionTable;
