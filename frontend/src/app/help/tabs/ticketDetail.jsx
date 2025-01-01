import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Textarea,
  Divider,
  Select,
} from '@chakra-ui/react';
import { ticketStatusColors, ticketPriorityColors } from '../data';
import { useColors } from '../../../utils/colors';

const TicketDetail = ({ 
  isOpen, 
  onClose, 
  ticket, 
  onStatusUpdate, 
  onAddResponse 
}) => {
  const [reply, setReply] = useState('');
  const [status, setStatus] = useState(ticket?.status);
  const colors = useColors();

  const handleReply = () => {
    onAddResponse(ticket.id, {
      message: reply,
      timestamp: new Date().toISOString()
    });
    setReply('');
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusUpdate(ticket.id, newStatus);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={colors.bgColor} color={colors.textColor}>
        <ModalHeader>
          <HStack justify="space-between">
            <Text>Ticket Details</Text>
            <Select
              width="150px"
              value={status}
              onChange={handleStatusChange}
              size="sm"
            >
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </Select>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Avatar 
                size="lg" 
                name={ticket?.customer.name} 
                src={ticket?.customer.avatar}
              />
              <Box>
                <HStack spacing={2}>
                  <Text fontSize="xl" fontWeight="bold">{ticket?.subject}</Text>
                  <Badge {...ticketStatusColors[ticket?.status]}>
                    {ticket?.status}
                  </Badge>
                  <Badge {...ticketPriorityColors[ticket?.priority]}>
                    {ticket?.priority}
                  </Badge>
                </HStack>
                <Text color="gray.600">
                  {ticket?.customer.name} - {new Date(ticket?.createdAt).toLocaleString()}
                </Text>
              </Box>
            </HStack>

            <Box bg={colors.activeColor} p={4} borderRadius="md">
              <Text>{ticket?.message}</Text>
            </Box>

            <Divider />

            {ticket?.responses?.map((response) => (
              <Box 
                key={response.id}
                p={4}
                bg={response.sender === 'support' ? 'blue.50' : 'gray.50'}
                borderRadius="md"
              >
                <HStack spacing={4} mb={2}>
                  <Avatar 
                    size="sm" 
                    name={response.sender === 'support' ? 'Support Team' : ticket.customer.name}
                  />
                  <Text fontWeight="bold">
                    {response.sender === 'support' ? 'Support Team' : ticket.customer.name}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {new Date(response.timestamp).toLocaleString()}
                  </Text>
                </HStack>
                <Text ml={12}>{response.message}</Text>
              </Box>
            ))}

            <Box mt={4}>
              <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply..."
                rows={4}
                mb={4}
              />
              <HStack justify="flex-end">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  colorScheme="blue" 
                  isDisabled={!reply.trim()}
                  onClick={handleReply}
                >
                  Send Reply
                </Button>
              </HStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TicketDetail;