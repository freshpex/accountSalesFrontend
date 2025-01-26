import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMail, FiPhone } from 'react-icons/fi';

const ViewProfileModal = ({ isOpen, onClose, customer }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const handleEmailClick = () => {
    window.location.href = `mailto:${customer.email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${customer.phoneNumber}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customer Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <Box p={4} bg={bgColor} borderRadius="md">
              <Text fontWeight="bold" mb={2}>Personal Information</Text>
              <Text>Name: {customer?.firstName} {customer?.lastName}</Text>
              <HStack mt={2}>
                <Button
                  leftIcon={<FiMail />}
                  size="sm"
                  onClick={handleEmailClick}
                  isDisabled={!customer?.email}
                >
                  {customer?.email}
                </Button>
                <Button
                  leftIcon={<FiPhone />}
                  size="sm"
                  onClick={handlePhoneClick}
                  isDisabled={!customer?.phoneNumber}
                >
                  {customer?.phoneNumber || 'N/A'}
                </Button>
              </HStack>
            </Box>

            <Box p={4} bg={bgColor} borderRadius="md">
              <Text fontWeight="bold" mb={2}>Business Information</Text>
              <Text>Business Name: {customer?.businessName}</Text>
              <Text>Business Type: {customer?.businessType}</Text>
            </Box>

            <Box p={4} bg={bgColor} borderRadius="md">
              <Text fontWeight="bold" mb={2}>Customer Status</Text>
              <HStack>
                <Badge colorScheme={customer?.status === 'active' ? 'green' : 'red'}>
                  {customer?.status}
                </Badge>
                <Badge colorScheme="purple">{customer?.segment}</Badge>
              </HStack>
            </Box>

            <Box p={4} bg={bgColor} borderRadius="md">
              <Text fontWeight="bold" mb={2}>Metrics</Text>
              <Text>Total Orders: {customer?.metrics?.totalOrders || 0}</Text>
              <Text>Total Spent: ${customer?.metrics?.totalSpent?.toLocaleString() || 0}</Text>
              <Text>Last Order: {customer?.metrics?.lastOrderDate ? new Date(customer.metrics.lastOrderDate).toLocaleDateString() : 'Never'}</Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewProfileModal;
