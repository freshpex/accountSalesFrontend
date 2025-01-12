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

const PaymentModal = ({ isOpen, onClose, product, onSubmit }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'crypto'
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      toast({
        title: 'Error',
        description: 'Please fill in all payment details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onSubmit(paymentDetails);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payment for {product.username}</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Payment Method</FormLabel>
              <Select
                name="paymentMethod"
                value={paymentDetails.paymentMethod}
                onChange={handleChange}
              >
                <option value="crypto">Crypto</option>
                <option value="creditCard">Credit Card</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Card Number</FormLabel>
              <Input
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
              />
            </FormControl>
            <FormControl>
              <FormLabel>CVV</FormLabel>
              <Input
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                placeholder="CVV"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={handleSubmit}>Submit Payment</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
