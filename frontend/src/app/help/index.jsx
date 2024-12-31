import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Container, Flex, Heading, Tab, TabList, TabPanel, TabPanels,
  Tabs, Text, VStack, HStack, Badge, Input, Select, useDisclosure, useToast
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ticketPriorityColors, ticketStatusColors } from './data';
import EmptyStatePage from '../../components/emptyState';
import NewTicketModal from './components/NewTicketModal';
import TicketList from './components/TicketList';
import NotificationList from './components/NotificationList';
import { 
  getTickets, 
  getTicketStats, 
  getNotifications,
  getLoading 
} from './redux/selector';
import { 
  fetch_tickets,
  create_ticket,
  add_response,
  update_ticket_status,
  mark_notification_read 
} from './redux/reducer';
import { FiMail, FiInbox } from 'react-icons/fi';

const Help = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(getTickets);
  const stats = useSelector(getTicketStats);
  const notifications = useSelector(getNotifications);
  const loading = useSelector(getLoading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState({ status: 'all', search: '' });

  useEffect(() => {
    dispatch(fetch_tickets());
  }, [dispatch]);

  const handleCreateTicket = (ticketData) => {
    dispatch(create_ticket(ticketData));
    onClose();
  };

  const handleAddResponse = (ticketId, response) => {
    dispatch(add_response({ ticketId, response }));
  };

  const handleStatusUpdate = (ticketId, status) => {
    dispatch(update_ticket_status({ ticketId, status }));
  };

  const handleNotificationRead = (notificationId) => {
    dispatch(mark_notification_read(notificationId));
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filters.status !== 'all' && ticket.status !== filters.status) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        ticket.subject.toLowerCase().includes(searchLower) ||
        ticket.message.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const renderContent = () => {
    if (loading) {
      return <Box p={8}>Loading...</Box>;
    }

    return (
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Support Tickets ({stats.total})</Tab>
          <Tab>
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge ml={2} colorScheme="red" borderRadius="full">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box mb={4}>
              <HStack spacing={4}>
                <Input
                  placeholder="Search tickets..."
                  maxW="400px"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  leftElement={<SearchIcon color="gray.400" />}
                />
                <Select
                  maxW="200px"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="all">All Status</option>
                  <option value="open">Open ({stats.open})</option>
                  <option value="pending">Pending ({stats.pending})</option>
                  <option value="resolved">Resolved ({stats.resolved})</option>
                </Select>
              </HStack>
            </Box>

            {filteredTickets.length > 0 ? (
              <TicketList
                tickets={filteredTickets}
                onStatusUpdate={handleStatusUpdate}
                onAddResponse={handleAddResponse}
                statusColors={ticketStatusColors}
                priorityColors={ticketPriorityColors}
              />
                      />
                      <Box>
                        <HStack spacing={2}>
                          <Text fontWeight="bold">{ticket.subject}</Text>
                          <Badge {...ticketStatusColors[ticket.status]}>
                            {ticket.status}
                          </Badge>
                          <Badge {...ticketPriorityColors[ticket.priority]}>
                            {ticket.priority}
                          </Badge>
                        </HStack>
                        <Text color="gray.600" fontSize="sm">
                          {ticket.customer.name} - {ticket.createdAt}
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
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              {helpData.notifications.map((notification) => (
                <Box
                  key={notification.id}
                  p={4}
                  borderWidth={1}
                  borderRadius="lg"
                  bg={notification.read ? "white" : "blue.50"}
                >
                  <Flex justify="space-between" align="center">
                    <HStack spacing={4}>
                      <Icon
                        as={notification.type === 'ticket' ? EmailIcon : BellIcon}
                        boxSize={5}
                        color={notification.type === 'ticket' ? "blue.500" : "purple.500"}
                      />
                      <Box>
                        <Text>{notification.message}</Text>
                        <Text color="gray.600" fontSize="sm">
                          {notification.timestamp}
                        </Text>
                      </Box>
                    </HStack>
                    {!notification.read && (
                      <Badge colorScheme="blue">New</Badge>
                    )}
                  </Flex>
                </Box>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* New Ticket Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Support Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Subject</FormLabel>
                <Input
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  placeholder="Brief description of your issue"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Message</FormLabel>
                <Textarea
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                  placeholder="Describe your issue in detail"
                  rows={5}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleNewTicket}>
              Submit Ticket
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Help;