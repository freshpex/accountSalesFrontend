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
  useBreakpointValue,
} from '@chakra-ui/react';
import { useColors } from '../../../utils/colors';

const TransactionModal = ({ isOpen, onClose, data, action, onSave, onDelete }) => {
    const isReadOnly = action === 'view';
    const colors = useColors();

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent 
      maxW="1200px" maxH="90vh" overflowY="auto"
      bg={colors.bgColor} color={colors.textColor}
      >
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
                    alt={data.productName}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                )}
                <FormControl>
                  <FormLabel>Transaction ID</FormLabel>
                  <Input
                    value={data?.id || ''}
                    isReadOnly={true}
                    bg="gray.100"
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  value={data?.productName || ''}
                  isReadOnly={isReadOnly}
                  bg={isReadOnly ? "gray.100" : colors.bgColor}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Customer</FormLabel>
                <Input
                  value={data?.customer || ''}
                  isReadOnly={isReadOnly}
                  bg={isReadOnly ? "gray.100" : colors.bgColor}
                />
              </FormControl>

              <HStack w="full" spacing={4}>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    value={data?.price || ''}
                    type="number"
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={data?.date || ''}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                </FormControl>
              </HStack>

              <HStack w="full" spacing={4}>
                <FormControl>
                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    value={data?.payment || ''}
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
                    value={data?.status || ''}
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
              <Button colorScheme="blue" onClick={onSave}>
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
