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
        amount: data.price || '',
        quantity: data.quantity || 1,
        status: data.status || 'pending',
        paymentStatus: data.payment || 'pending',
        paymentMethod: data.paymentMethod || 'card',
        notes: data.notes || '',
        metadata: {
          productName: data.productName || '',
          customerName: data.customer || ''
        },
        transactionId: data.transactionId || '',
        id: data.id || data._id
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
    if (!formData.productId) errors.productId = 'Product ID is required';
    if (!formData.amount || formData.amount <= 0) errors.amount = 'Valid amount is required';
    if (!formData.metadata.productName) errors.productName = 'Product name is required';
    if (!formData.metadata.customerName) errors.customerName = 'Customer name is required';
    return errors;
  };

  const handleSubmit = () => {
    const { isValid, errors } = validateForm();
    if (!isValid) {
      Object.values(errors).forEach(error => toast.error(error));
      return;
    }

    const submissionData = {
      ...formData,
      action: isEdit ? 'edit' : 'add',
      metadata: {
        ...formData.metadata,
        customerName: formData.customerDetails.name,
        customerEmail: formData.customerDetails.email,
        productName: formData.metadata.productName
      }
    };

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

              <FormControl>
                <FormLabel>Customer</FormLabel>
                <Input
                  value={formData.metadata.customerName}
                  onChange={handleChange('metadata.customerName')}
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
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.date}
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
                    value={formData.paymentStatus}
                    onChange={handleChange('paymentStatus')}
                    isDisabled={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Pending">Pending</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={formData.status}
                    onChange={handleChange('status')}
                    isDisabled={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Cancelled">Cancelled</option>
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
