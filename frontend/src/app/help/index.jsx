import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Container, Flex, Heading, Tab, TabList, TabPanel, TabPanels,
  Tabs, Text, HStack, Badge, Input, Select, Button, useDisclosure
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
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
import LoadingSpinner from '../../components/LoadingSpinner';

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
      return <LoadingSpinner />;
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
                  leftelement={<SearchIcon color="gray.400" />}
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
            ) : (
              <EmptyStatePage
                title="No Tickets Found"
                sub={filters.search ? "No tickets match your search criteria" : "You haven't created any support tickets yet"}
                icon={<FiInbox size={50} />}
                btnText="Create New Ticket"
                handleClick={onOpen}
              />
            )}
          </TabPanel>

          <TabPanel>
            {notifications.length > 0 ? (
              <NotificationList
                notifications={notifications}
                onNotificationRead={handleNotificationRead}
              />
            ) : (
              <EmptyStatePage
                title="No Notifications"
                sub="You're all caught up! No new notifications"
                icon={<FiMail size={50} />}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg">Help & Support</Heading>
          <Text color="gray.600">Get help with your account and transactions</Text>
        </Box>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={onOpen}
        >
          New Ticket
        </Button>
      </Flex>

      {renderContent()}

      <NewTicketModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateTicket}
      />
    </Container>
  );
};

export default Help;