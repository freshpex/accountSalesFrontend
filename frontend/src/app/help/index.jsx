import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Input,
  Textarea,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  useToast,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { 
  ChevronRightIcon, 
  EmailIcon, 
  BellIcon, 
  AddIcon,
  SearchIcon
} from '@chakra-ui/icons';
import { helpData, ticketPriorityColors, ticketStatusColors } from './data';

const Help = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleNewTicket = () => {
    // Here you would typically make an API call to create a new ticket
    toast({
      title: "Ticket Created",
      description: "We'll respond to your inquiry soon.",
      status: "success",
      duration: 3000
    });
    onClose();
    setNewTicket({ subject: '', message: '', priority: 'medium' });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Box>
          <Heading size="lg">Help & Support</Heading>
          <Text color="gray.600">Get help with your account and transactions</Text>
        </Box>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
          New Ticket
        </Button>
      </Flex>

      <Tabs variant="enclosed" onChange={(index) => setActiveTab(index)}>
        <TabList>
          <Tab>Support Tickets</Tab>
          <Tab>
            Notifications
            <Badge ml={2} colorScheme="red" borderRadius="full">
              {helpData.notifications.filter(n => !n.read).length}
            </Badge>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box mb={4}>
              <HStack spacing={4} mb={4}>
                <Input
                  placeholder="Search tickets..."
                  maxW="400px"
                  leftIcon={<SearchIcon />}
                />
                <Select maxW="200px" defaultValue="all">
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </Select>
              </HStack>
            </Box>

            <VStack spacing={4} align="stretch">
              {helpData.tickets.map((ticket) => (
                <Box
                  key={ticket.id}
                  p={4}
                  borderWidth={1}
                  borderRadius="lg"
                  _hover={{ shadow: "sm" }}
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