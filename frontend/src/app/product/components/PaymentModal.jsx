import { useState } from 'react';
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
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';

const PaymentModal = ({ isOpen, onClose, product, onSubmit, isLoading, error }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: 'card',
    email: '',
    name: '',
    phone: ''
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentDetails.email || !paymentDetails.name || !paymentDetails.phone) {
      toast({
        title: 'Error',
        description: 'Please fill in all payment details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onSubmit({
      productId: product.id,
      ...paymentDetails
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payment Details</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Payment Method</FormLabel>
              <Select
                name="paymentMethod"
                value={paymentDetails.paymentMethod}
                onChange={handleChange}
              >
                <option value="card">Card</option>
                <option value="banktransfer">Bank Transfer</option>
                <option value="ussd">USSD</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={paymentDetails.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="name"
                value={paymentDetails.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={paymentDetails.phone}
                onChange={handleChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Proceed to Payment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
