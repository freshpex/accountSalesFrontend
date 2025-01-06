import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  RadioGroup,
  Stack,
  Radio,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

const UpdateSegmentModal = ({ isOpen, onClose, customer, onUpdate }) => {
  const [selectedSegment, setSelectedSegment] = useState(customer?.segment?.toLowerCase() || 'bronze');

  const handleUpdate = () => {
    // Add validation
    if (!customer?._id) {
      console.error('No customer ID available');
      toast.error('Unable to update segment: Invalid customer ID');
      return;
    }

    onUpdate(customer._id, customer.segment, selectedSegment);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Customer Segment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Current Segment: {customer?.segment}</Text>
          <RadioGroup onChange={setSelectedSegment} value={selectedSegment}>
            <Stack direction="column">
              <Radio value="bronze">Bronze</Radio>
              <Radio value="silver">Silver</Radio>
              <Radio value="gold">Gold</Radio>
              <Radio value="platinum">Platinum</Radio>
            </Stack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleUpdate}
            isDisabled={selectedSegment === customer?.segment?.toLowerCase()}
          >
            Update Segment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSegmentModal;
