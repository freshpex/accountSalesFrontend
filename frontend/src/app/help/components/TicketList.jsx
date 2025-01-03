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
import { useColors } from '../../../utils/colors';

const TicketList = ({ tickets = [], onStatusUpdate, onAddResponse, statusColors, priorityColors }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const colors = useColors();

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    onOpen();
  };

  return (
    <>
      <VStack spacing={4} align="stretch">
        {tickets.map((ticket) => {
          // Safely access nested properties
          const customerName = ticket?.customer?.name || 'Unknown';
          const customerEmail = ticket?.customer?.email || 'No email';
          const avatarName = customerName !== 'Unknown' ? customerName : '';
          
          return (
            <Box
              key={ticket._id}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              _hover={{ shadow: "sm", cursor: "pointer" }}
              onClick={() => handleTicketClick(ticket)}
              bg={colors.bgColor}
              color={colors.textColor}
            >
              <Flex justify="space-between" align="start">
                <HStack spacing={4}>
                  <Avatar 
                    size="md" 
                    name={avatarName}
                    src={ticket?.customer?.avatar}
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
                      {customerName} - {new Date(ticket.createdAt).toLocaleString()}
                    </Text>
                    <Text noOfLines={2} mt={2}>
                      {ticket.message}
                    </Text>
                  </Box>
                </HStack>
                <ChevronRightIcon boxSize={6} color="gray.400" />
              </Flex>
            </Box>
          );
        })}
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
