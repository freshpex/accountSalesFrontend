import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  HStack,
  Image,
  Text,
  Flex,
  Spinner,
  SimpleGrid,
  Textarea,
  useBreakpointValue,
  IconButton,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useColors } from '../../../utils/colors';
import toast from 'react-hot-toast';
import { fetch_transaction_products } from '../../product/redux/reducer';
import { CloseIcon } from '@chakra-ui/icons';

const TransactionModal = ({ isOpen, onClose, data, action, onSave, onDelete }) => {
  const dispatch = useDispatch();
  const isReadOnly = action === 'view';
  const isEdit = action === 'edit';
  const colors = useColors();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  const [formData, setFormData] = useState({
    productId: '',
    amount: '',
    currency: 'NGN',
    paymentMethod: 'card',
    paymentStatus: 'pending',
    status: 'pending',
    customerDetails: {
      name: '',
      email: '',
      phone: '',
      address: '',
      country: ''
    },
    metadata: {
      productName: '',
      customerName: ''
    },
    notes: '',
    transactionId: ''
  });

  const { transactionProducts: products, loading: isLoading } = useSelector(state => ({
    transactionProducts: state.product.transactionProducts || [],
    loading: state.product.loading
  }));

  const [hasFetchedProducts, setHasFetchedProducts] = useState(false);

  useEffect(() => {
    if (isOpen && !hasFetchedProducts) {
      dispatch(fetch_transaction_products());
      setHasFetchedProducts(true);
    }

    if (!isOpen) {
      setHasFetchedProducts(false);
    }
  }, [isOpen, hasFetchedProducts, dispatch]);

  useEffect(() => {
    if (data && (action === 'edit' || action === 'view')) {
      setFormData({
        productId: data.productId || '',
        amount: data.amount || '',
        currency: data.currency || 'NGN',
        paymentMethod: data.paymentMethod || 'card',
        paymentStatus: data.paymentStatus || 'pending',
        status: data.status || 'pending',
        customerDetails: {
          name: data.customerDetails?.name || '',
          email: data.customerDetails?.email || '',
          phone: data.customerDetails?.phone || '',
          address: data.customerDetails?.address || '',
          country: data.customerDetails?.country || ''
        },
        metadata: {
          productName: data.metadata?.productName || '',
          customerName: data.metadata?.customerName || ''
        },
        notes: data.notes || '',
        transactionId: data.transactionId || '',
        id: data.id || data._id
      });
    }
  }, [data, action, products]);

  const handleChange = (field) => (e) => {
    setFormData(prev => {
      if (field.includes('metadata.')) {
        const metadataField = field.split('.')[1];
        return {
          ...prev,
          metadata: {
            ...prev.metadata,
            [metadataField]: e.target.value
          }
        };
      }
      if (field.includes('customerDetails.')) {
        const customerField = field.split('.')[1];
        return {
          ...prev,
          customerDetails: {
            ...prev.customerDetails,
            [customerField]: e.target.value
          }
        };
      }
      return {
        ...prev,
        [field]: e.target.value
      };
    });
  };

  const handleProductSelect = (e) => {
    const selectedProduct = products.find(p => p._id === e.target.value);
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        productId: selectedProduct._id,
        amount: selectedProduct.price || 0,
        metadata: {
          ...prev.metadata,
          productName: selectedProduct.name
        }
      }));
    }
  };

  // Update validation to match backend requirements
  const validateForm = () => {
    const errors = {};
    if (!formData.productId || !/^[0-9a-fA-F]{24}$/.test(formData.productId)) {
      errors.productId = 'Valid Product ID is required';
    }
    if (!formData.amount || formData.amount <= 0) {
      errors.amount = 'Valid amount is required';
    }
    if (!formData.customerDetails.name?.trim()) {
      errors.customerName = 'Customer name is required';
    }
    if (!formData.customerDetails.email?.trim()) {
      errors.email = 'Customer email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerDetails.email)) {
      errors.email = 'Valid email address is required';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  // Update handleSubmit to better match backend expectations
  const handleSubmit = () => {
    const { isValid, errors } = validateForm();
    if (!isValid) {
      Object.values(errors).forEach(error => toast.error(error));
      return;
    }

    // Format data to match backend schema
    const submissionData = {
      productId: formData.productId,
      amount: Number(formData.amount),
      currency: formData.currency,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentStatus.toLowerCase(),
      status: formData.status.toLowerCase(),
      customerDetails: {
        ...formData.customerDetails,
        name: formData.customerDetails.name.trim(),
        email: formData.customerDetails.email.toLowerCase().trim()
      },
      metadata: {
        productName: formData.metadata.productName,
        customerName: formData.customerDetails.name,
        customerEmail: formData.customerDetails.email
      },
      notes: formData.notes,
      transactionId: formData.transactionId
    };

    if (isEdit) {
      submissionData.id = formData.id;
    }

    onSave(submissionData);
  };

  const renderProductOptions = () => {
    if (!Array.isArray(products)) {
      return <option value="">No products available</option>;
    }

    return products.map(product => (
      <option key={product._id} value={product._id}>
        {product.name} - ${product.price}
      </option>
    ));
  };

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex justify="center" align="center" py={8}>
              <Spinner size="xl" />
              <Text ml={4}>Loading products...</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={isMobile ? "full" : "6xl"}
          motionPreset="slideInBottom"
        >
          <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
          <ModalContent
            as={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            maxW={{ base: "100%", md: "1200px" }}
            minH={{ base: "100vh", md: "auto" }}
            maxH={{ base: "100vh", md: "90vh" }}
            m={{ base: 0, md: 4 }}
            borderRadius={{ base: 0, md: "xl" }}
            overflow="hidden"
          >
            <ModalHeader
              px={{ base: 4, md: 6 }}
              py={{ base: 4, md: 5 }}
              borderBottom="1px"
              borderColor={colors.borderColor}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                {action === 'add' && 'New Transaction'}
                {action === 'edit' && 'Edit Transaction'}
                {action === 'view' && 'View Transaction'}
                {action === 'delete' && 'Delete Transaction'}
              </Text>
              {!isMobile && (
                <IconButton
                  icon={<CloseIcon />}
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  aria-label="Close modal"
                />
              )}
            </ModalHeader>

            <ModalBody
              px={{ base: 4, md: 6 }}
              py={{ base: 4, md: 6 }}
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: colors.scrollTrack,
                },
                '&::-webkit-scrollbar-thumb': {
                  background: colors.scrollThumb,
                  borderRadius: '4px',
                },
              }}
            >
              {action === 'delete' ? (
                <VStack spacing={4} align="start">
                  <Alert status="warning">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Delete Transaction</AlertTitle>
                      <AlertDescription>
                        Are you sure you want to delete this transaction? This action cannot be undone.
                      </AlertDescription>
                    </Box>
                  </Alert>
                  {data && (
                    <Box p={4} bg={colors.bgColor} borderRadius="md" w="full">
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <VStack align="start">
                          <Text fontSize="sm" color="gray.500">Transaction ID</Text>
                          <Text fontWeight="medium">{data.transactionId}</Text>
                        </VStack>
                        <VStack align="start">
                          <Text fontSize="sm" color="gray.500">Amount</Text>
                          <Text fontWeight="medium">
                            {data.currency} {data.amount?.toLocaleString()}
                          </Text>
                        </VStack>
                      </SimpleGrid>
                    </Box>
                  )}
                </VStack>
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={{ base: 4, md: 6 }}
                >
                  {/* Left Column */}
                  <VStack spacing={4} align="stretch">
                    {/* Transaction Details */}
                    <Box
                      p={4}
                      bg={colors.cardBg}
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor={colors.borderColor}
                    >
                      <VStack spacing={4} align="stretch">
                        {/* Existing form fields for left column */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                          {data?.productImage && (
                            <Image
                              src={data.productImage}
                              alt={formData.metadata.productName}
                              height={{ base: "200px", md: "100px" }}
                              width="100%"
                              objectFit="cover"
                              borderRadius="md"
                              fallbackSrc="/logo.svg"
                            />
                          )}
                          <FormControl>
                            <FormLabel>Transaction ID</FormLabel>
                            <Input
                              value={formData.transactionId || 'Will be generated'}
                              isReadOnly={true}
                              bg="gray.100"
                            />
                          </FormControl>
                        </SimpleGrid>

                        <FormControl isRequired>
                          <FormLabel>Select Product</FormLabel>
                          <Select
                            value={formData.productId}
                            onChange={handleProductSelect}
                            isDisabled={isReadOnly || isLoading}
                            placeholder={isLoading ? "Loading products..." : "Select a product"}
                          >
                            {renderProductOptions()}
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Product Name</FormLabel>
                          <Input
                            value={formData.metadata.productName}
                            onChange={handleChange('metadata.productName')}
                            isReadOnly={isReadOnly}
                            bg={isReadOnly ? "gray.100" : colors.bgColor}
                          />
                        </FormControl>
                      </VStack>
                    </Box>
                  </VStack>

                  {/* Right Column */}
                  <VStack spacing={4} align="stretch">
                    {/* Customer Details */}
                    <Box
                      p={4}
                      bg={colors.cardBg}
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor={colors.borderColor}
                    >
                      <VStack spacing={4} align="stretch">
                        {/* Existing form fields for right column */}
                        <FormControl isRequired>
                          <FormLabel>Customer Name</FormLabel>
                          <Input
                            value={formData.customerDetails.name}
                            onChange={handleChange('customerDetails.name')}
                            isReadOnly={isReadOnly}
                            bg={isReadOnly ? "gray.100" : colors.bgColor}
                          />
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel>Customer Email</FormLabel>
                          <Input
                            type="email"
                            value={formData.customerDetails.email}
                            onChange={handleChange('customerDetails.email')}
                            isReadOnly={isReadOnly}
                            bg={isReadOnly ? "gray.100" : colors.bgColor}
                          />
                        </FormControl>

                        <HStack w="full" spacing={4}>
                          <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input
                              value={formData.amount}
                              onChange={handleChange('amount')}
                              type="number"
                              isReadOnly={isReadOnly}
                              bg={isReadOnly ? "gray.100" : colors.bgColor}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Currency</FormLabel>
                            <Select
                              value={formData.currency}
                              onChange={handleChange('currency')}
                              isDisabled={isReadOnly}
                              bg={isReadOnly ? "gray.100" : colors.bgColor}
                            >
                              <option value="NGN">NGN</option>
                              <option value="USD">USD</option>
                            </Select>
                          </FormControl>
                        </HStack>

                        <HStack w="full" spacing={4}>
                          <FormControl>
                            <FormLabel>Payment Method</FormLabel>
                            <Select
                              value={formData.paymentMethod}
                              onChange={handleChange('paymentMethod')}
                              isDisabled={isReadOnly}
                              bg={isReadOnly ? "gray.100" : colors.bgColor}
                            >
                              <option value="card">Card</option>
                              <option value="banktransfer">Bank Transfer</option>
                              <option value="ussd">USSD</option>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel>Payment Status</FormLabel>
                            <Select
                              value={formData.paymentStatus}
                              onChange={handleChange('paymentStatus')}
                              isDisabled={isReadOnly}
                              bg={isReadOnly ? "gray.100" : colors.bgColor}
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="failed">Failed</option>
                              <option value="refunded">Refunded</option>
                            </Select>
                          </FormControl>
                        </HStack>

                        <FormControl>
                          <FormLabel>Status</FormLabel>
                          <Select
                            value={formData.status}
                            onChange={handleChange('status')}
                            isDisabled={isReadOnly}
                            bg={isReadOnly ? "gray.100" : colors.bgColor}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="failed">Failed</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Notes</FormLabel>
                          <Textarea
                            value={formData.notes}
                            onChange={handleChange('notes')}
                            isReadOnly={isReadOnly}
                            bg={isReadOnly ? "gray.100" : colors.bgColor}
                          />
                        </FormControl>
                      </VStack>
                    </Box>
                  </VStack>
                </SimpleGrid>
              )}
            </ModalBody>

            <ModalFooter
              px={{ base: 4, md: 6 }}
              py={{ base: 4, md: 5 }}
              borderTop="1px"
              borderColor={colors.borderColor}
              bg={colors.modalFooterBg}
            >
              <HStack spacing={3} w="full" justify="flex-end">
                {action === 'delete' ? (
                  <>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => onDelete(data)}
                      isLoading={isLoading}
                    >
                      Delete
                    </Button>
                  </>
                ) : action === 'view' ? (
                  <Button colorScheme="blue" onClick={onClose}>
                    Close
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={handleSubmit}
                      isLoading={isLoading}
                    >
                      {isEdit ? 'Update' : 'Save'}
                    </Button>
                  </>
                )}
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;