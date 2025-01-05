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
} from '@chakra-ui/react';
import { useColors } from '../../../utils/colors';
import { validateTransactionData } from '../../../utils/validation';
import toast from 'react-hot-toast';
import { fetch_transaction_products } from '../../product/redux/reducer';

const TransactionModal = ({ isOpen, onClose, data, action, onSave, onDelete }) => {
  const dispatch = useDispatch();
  const isReadOnly = action === 'view';
  const colors = useColors();
  
  const [formData, setFormData] = useState({
    productId: '',
    amount: '',
    quantity: 1,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'card',
    notes: '',
    metadata: {
      productName: '',
      customerName: '',
    },
    transactionId: ''
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = useSelector(state => state.product.transactionProducts || []);
  const isLoading = useSelector(state => state.product.loading);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetch_transaction_products());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (data) {
      setFormData({
        productId: data.productId || '',
        amount: data.amount || '',
        quantity: data.quantity || 1,
        status: data.status || 'pending',
        paymentStatus: data.paymentStatus || 'pending',
        paymentMethod: data.paymentMethod || 'card',
        notes: data.notes || '',
        metadata: {
          productName: data.productName || '',
          customerName: data.customer || ''
        },
        transactionId: data.transactionId || ''
      });
    }
  }, [data]);

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
    const { isValid, errors } = validateTransactionData(formData);
    if (isValid) {
      onSave(formData);
    } else {
      toast.error(Object.values(errors).join('\n'));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent maxW="1200px" maxH="90vh" overflowY="auto" bg={colors.bgColor} color={colors.textColor}>
        <ModalHeader>
          {action === 'add' && 'New Transaction'}
          {action === 'view' && 'View Transaction'}
          {action === 'delete' && 'Delete Transaction'}
        </ModalHeader>
        <ModalBody>
          {action === 'delete' ? (
            <Text>Are you sure you want to delete this transaction?</Text>
          ) : (
            <VStack spacing={4}>
              <HStack w="full" spacing={4}>
                {data?.productImage && (
                  <Image
                    src={data.productImage}
                    alt={formData.metadata.productName}
                    boxSize="100px"
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
              </HStack>

              <FormControl isRequired>
                <FormLabel>Select Product</FormLabel>
                <Select
                  value={formData.productId}
                  onChange={handleProductSelect}
                  isDisabled={isReadOnly || isLoading}
                  placeholder={isLoading ? "Loading products..." : "Select a product"}
                >
                  {products?.map(product => (
                    <option key={product._id} value={product._id}>
                      {product.name} - ${product.price}
                    </option>
                  ))}
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

        <ModalFooter>
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
                Save
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
