import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

const AddCustomerModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    segment: 'bronze',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      segment: 'bronze',
      status: 'active'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Customer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter customer name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Segment</FormLabel>
              <Select
                name="segment"
                value={formData.segment}
                onChange={handleChange}
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={!formData.name || !formData.email}
          >
            Add Customer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCustomerModal;
