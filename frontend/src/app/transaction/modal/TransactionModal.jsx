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
} from '@chakra-ui/react';
import { useColors } from '../../../utils/colors';
import { validateTransactionData } from '../../../utils/validation';
import toast from 'react-hot-toast';
import { fetch_transaction_products } from '../../product/redux/reducer';

const TransactionModal = ({ isOpen, onClose, data, action, onSave, onDelete }) => {
  const dispatch = useDispatch();
  const isReadOnly = action === 'view';
  const isEdit = action === 'edit';
  const colors = useColors();
  
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
      phone: ''
    },
    notes: ''
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
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
          phone: data.customerDetails?.phone || ''
        },
        notes: data.notes || '',
        transactionId: data.transactionId || '',
        id: data.id
      });

      if (data.productId) {
        const product = products.find(p => p._id === data.productId);
        setSelectedProduct(product);
      }
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

  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    
    try {
      if (!formData.productId) {
        errors.productId = 'Product ID is required';
      }
      
      if (!formData.amount || formData.amount <= 0) {
        errors.amount = 'Valid amount is required';
      }
      
      if (!formData.customerDetails?.name?.trim()) {
        errors.customerName = 'Customer name is required';
      }
      
      if (!formData.customerDetails?.email?.trim()) {
        errors.email = 'Customer email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerDetails.email)) {
        errors.email = 'Valid email address is required';
      }
      
      if (!formData.paymentMethod) {
        errors.paymentMethod = 'Payment method is required';
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    } catch (error) {
      console.error('Validation error:', error);
      return {
        isValid: false,
        errors: { general: 'Validation failed. Please check all fields.' }
      };
    }
  };

  const handleSubmit = () => {
    try {
      const validation = validateForm();
      
      if (!validation.isValid) {
        // Show all validation errors
        Object.values(validation.errors).forEach(error => {
          toast.error(error);
        });
        return;
      }

      // Format data for API
      const submissionData = {
        productId: formData.productId,
        amount: Number(formData.amount),
        currency: formData.currency,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentStatus.toLowerCase(),
        status: formData.status.toLowerCase(),
        customerDetails: {
          name: formData.customerDetails.name.trim(),
          email: formData.customerDetails.email.toLowerCase().trim(),
          phone: formData.customerDetails.phone,
          address: formData.customerDetails.address,
          country: formData.customerDetails.country
        },
        metadata: {
          customerName: formData.customerDetails.name,
          customerEmail: formData.customerDetails.email
        },
        notes: formData.notes
      };

      if (isEdit) {
        submissionData.id = formData.id;
        submissionData.action = 'edit';
      }

      onSave(submissionData);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to submit form. Please try again.');
    }
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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={{ base: "full", md: "6xl" }}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent 
        maxW={{ base: "100%", md: "1200px" }}
        maxH={{ base: "100vh", md: "90vh" }}
        m={{ base: 0, md: 4 }}
        borderRadius={{ base: 0, md: "lg" }}
      >
        <ModalHeader 
          fontSize={{ base: "lg", md: "xl" }}
          p={{ base: 4, md: 6 }}
        >
          {action === 'add' && 'New Transaction'}
          {action === 'edit' && 'Edit Transaction'}
          {action === 'view' && 'View Transaction'}
          {action === 'delete' && 'Delete Transaction'}
        </ModalHeader>
        <ModalBody 
          px={{ base: 4, md: 6 }}
          py={{ base: 2, md: 4 }}
        >
          {action === 'delete' ? (
            <Text>Are you sure you want to delete this transaction?</Text>
          ) : (
            <VStack spacing={{ base: 4, md: 6 }}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                {data?.productImage && (
                  <Image
                    src={data.productImage}
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
                    value={formData?.transactionId || 'Will be generated'}
                    isReadOnly={true}
                    bg="gray.100"
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Select Product</FormLabel>
                <Select
                  value={formData?.productId}
                  onChange={handleProductSelect}
                  isDisabled={isReadOnly || isLoading}
                  placeholder={isLoading ? "Loading products..." : "Select a product"}
                >
                  {renderProductOptions()}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Customer</FormLabel>
                <Input
                  value={formData?.metadata?.customerName}
                  onChange={handleChange('metadata.customerName')}
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
                    value={formData?.amount}
                    onChange={handleChange('amount')}
                    type="number"
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={formData?.date}
                    onChange={handleChange('date')}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                </FormControl>
              </HStack>

              <HStack w="full" spacing={4}>
                <FormControl>
                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    value={formData?.paymentStatus}
                    onChange={handleChange('paymentStatus')}
                    isDisabled={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={formData?.status}
                    onChange={handleChange('status')}
                    isDisabled={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  >
                    <option value="Completed">pending</option>
                    <option value="Shipping">processing</option>
                    <option value="Shipping">completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Shipping">failed</option>
                  </Select>
                </FormControl>
              </HStack>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter 
          p={{ base: 4, md: 6 }}
          borderTop="1px"
          borderColor={colors.borderColor}
        >
          {action === 'delete' ? (
            <>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => onDelete(data)}>
                Delete
              </Button>
            </>
          ) : action === 'view' ? (
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          ) : (
            <>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit}>
                {isEdit ? 'Update' : 'Save'}
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
