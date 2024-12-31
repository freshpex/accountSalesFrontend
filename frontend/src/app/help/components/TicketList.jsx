import {
  VStack,
  Box,
  Flex,
  HStack,
  Avatar,
  Text,
  Badge,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import TicketDetail from '../tabs/ticketDetail';
import { useState } from 'react';

const TicketList = ({ 
  tickets, 
  onStatusUpdate, 
  onAddResponse, 
  statusColors, 
  priorityColors 
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    onOpen();
  };

  return (
    <>
      <VStack spacing={4} align="stretch">
        {tickets.map((ticket) => (
          <Box
            key={ticket.id}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            _hover={{ shadow: "sm", cursor: "pointer" }}
            onClick={() => handleTicketClick(ticket)}
          >
            <Flex justify="space-between" align="start">
              <HStack spacing={4}>
                <Avatar 
                  size="md" 
                  name={ticket.customer.name} 
                  src={ticket.customer.avatar}
                />
                <Box>
                  <HStack spacing={2}>
                    <Text fontWeight="bold">{ticket.subject}</Text>
                    <Badge {...statusColors[ticket.status]}>
                      {ticket.status}
                    </Badge>
                    <Badge {...priorityColors[ticket.priority]}>
                      {ticket.priority}
                    </Badge>
                  </HStack>
                  <Text color="gray.600" fontSize="sm">
                    {ticket.customer.name} - {new Date(ticket.createdAt).toLocaleString()}
                  </Text>
                  <Text noOfLines={2} mt={2}>
                    {ticket.message}
                  </Text>
                </Box>
              </HStack>
              <ChevronRightIcon boxSize={6} color="gray.400" />
            </Flex>
          </Box>
        ))}
      </VStack>

      {selectedTicket && (
        <TicketDetail
          isOpen={isOpen}
          onClose={onClose}
          ticket={selectedTicket}
          onStatusUpdate={onStatusUpdate}
          onAddResponse={onAddResponse}
        />
      )}
    </>
  );
};

export default TicketList;
