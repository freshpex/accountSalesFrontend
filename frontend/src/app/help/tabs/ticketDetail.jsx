import { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Textarea,
  Divider,
  useToast
} from '@chakra-ui/react';
import { ticketStatusColors } from '../data';

const TicketDetail = ({ ticket }) => {
  const [reply, setReply] = useState('');
  const toast = useToast();

  const handleReply = () => {
    // Here you would typically make an API call to submit the reply
    toast({
      title: "Reply Sent",
      status: "success",
      duration: 3000
    });
    setReply('');
  };

  return (
    <Box p={6}>
      <HStack spacing={4} mb={6}>
        <Avatar 
          size="lg" 
          name={ticket.customer.name} 
          src={ticket.customer.avatar}
        />
        <Box>
          <HStack spacing={2}>
            <Text fontSize="xl" fontWeight="bold">{ticket.subject}</Text>
            <Badge {...ticketStatusColors[ticket.status]}>
              {ticket.status}
            </Badge>
          </HStack>
          <Text color="gray.600">
            {ticket.customer.name} - {ticket.createdAt}
          </Text>
        </Box>
      </HStack>

      <Box bg="gray.50" p={4} borderRadius="md" mb={6}>
        <Text>{ticket.message}</Text>
      </Box>

      <Divider my={6} />

      <VStack spacing={4} align="stretch">
        {ticket.responses.map((response) => (
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
                {response.timestamp}
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
            <Button variant="ghost">Cancel</Button>
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
    </Box>
  );
};

export default TicketDetail;