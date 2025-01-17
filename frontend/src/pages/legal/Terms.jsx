// Terms.jsx
import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  VStack,
  useColorModeValue,
  Link as ChakraLink,
  Grid,
  Icon,
  Divider,
  Badge,
  HStack,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiBook, 
  FiShield, 
  FiDollarSign, 
  FiUsers, 
  FiMessageCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiHelpCircle,
  FiClock,
  FiFileText
} from 'react-icons/fi';
import { useEffect, useRef } from 'react';

const MotionBox = motion(Box);

const Terms = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sectionRefs = useRef({});

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const highlightColor = useColorModeValue('blue.50', 'blue.900');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  const termsItems = [
    {
      id: 'account',
      icon: FiUsers,
      title: "Account Terms",
      badge: "Important",
      content: [
        "Users must maintain accurate account information and are responsible for all activities under their accounts.",
        "Accounts must be registered by adults over 18 years old.",
        "Users are prohibited from creating multiple accounts for malicious purposes.",
        "Two-factor authentication is strongly recommended for account security.",
        "Account credentials must not be shared with third parties.",
        "We reserve the right to terminate accounts that violate our terms."
      ]
    },
    {
      id: 'usage',
      icon: FiShield,
      title: "Service Usage",
      badge: "Required",
      content: [
        "Our services must be used in accordance with applicable laws and regulations.",
        "Users agree not to misuse or attempt to gain unauthorized access to our services.",
        "Rate limiting and fair usage policies apply to all service endpoints.",
        "API keys and access tokens must be kept secure.",
        "Service availability is subject to maintenance windows.",
        "Usage metrics are monitored for security purposes."
      ]
    },
    {
      id: 'payment',
      icon: FiDollarSign,
      title: "Payment Terms",
      badge: "Billing",
      content: [
        "Users agree to pay all fees associated with the services.",
        "Payments are non-refundable unless otherwise specified.",
        "We reserve the right to modify pricing with 30 days notice.",
        "Late payments may result in service suspension.",
        "All prices are listed in USD unless otherwise specified.",
        "Billing disputes must be reported within 60 days."
      ]
    },
    {
      id: 'content',
      icon: FiFileText,
      title: "Content Policy",
      badge: "Guidelines",
      content: [
        "Users are responsible for their content and must have rights to share any content uploaded to our platform.",
        "We reserve the right to remove inappropriate content.",
        "Content must not violate intellectual property rights.",
        "User-generated content may be monitored for compliance.",
        "Backup of user content is the user's responsibility.",
        "Content distribution and sharing settings must be configured appropriately."
      ]
    },
    {
      id: 'privacy',
      icon: FiShield,
      title: "Privacy and Data",
      badge: "GDPR",
      content: [
        "User data is processed in accordance with our Privacy Policy.",
        "Data retention periods vary by data type and jurisdiction.",
        "Users may request data exports and deletion.",
        "Third-party data processors are bound by DPAs.",
        "Security incidents will be reported as required by law.",
        "Analytics data is collected for service improvement."
      ]
    },
    {
      id: 'liability',
      icon: FiAlertTriangle,
      title: "Liability and Warranties",
      badge: "Legal",
      content: [
        "Services are provided 'as-is' without warranties.",
        "We are not liable for indirect or consequential damages.",
        "Force majeure events may affect service availability.",
        "Users indemnify us against third-party claims.",
        "Limitation of liability is capped at fees paid.",
        "Jurisdictional restrictions may apply."
      ]
    }
  ];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const lastUpdated = "January 17, 2024";

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg={useColorModeValue('blue.50', 'blue.900')}
        py={20}
        px={4}
        mb={8}
      >
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Icon as={FiBook} boxSize={16} color="blue.500" />
            <Heading size="2xl">Terms and Conditions</Heading>
            <Text fontSize="xl" color={textColor} maxW="2xl">
              Please read these terms carefully before using our services. By accessing or using our platform, you agree to be bound by these terms.
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="blue" p={2} borderRadius="full">
                Last Updated: {lastUpdated}
              </Badge>
              <Badge colorScheme="green" p={2} borderRadius="full">
                Version 2.1
              </Badge>
            </HStack>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={onOpen}
              leftIcon={<FiFileText />}
            >
              Download PDF Version
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" pb={16}>
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={8}>
          <Box>
            {/* Quick Summary */}
            <Box
              mb={8}
              p={6}
              borderRadius="lg"
              bg={highlightColor}
              border="1px"
              borderColor={borderColor}
            >
              <Heading size="md" mb={4}>Quick Summary</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {[
                  { icon: FiCheckCircle, text: "Fair usage policy applies" },
                  { icon: FiClock, text: "30-day notice for changes" },
                  { icon: FiShield, text: "Data protection compliant" },
                  { icon: FiHelpCircle, text: "24/7 support available" }
                ].map((item, index) => (
                  <HStack key={index} spacing={3}>
                    <Icon as={item.icon} color="blue.500" />
                    <Text>{item.text}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </Box>

            {/* Terms Sections */}
            <Accordion allowMultiple>
              {termsItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  ref={el => sectionRefs.current[item.id] = el}
                  id={item.id}
                  mb={4}
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <AccordionButton
                    p={4}
                    _hover={{ bg: highlightColor }}
                  >
                    <HStack flex="1" spacing={4}>
                      <Icon as={item.icon} color="blue.500" boxSize={6} />
                      <Box flex="1" textAlign="left">
                        <Heading size="md">{item.title}</Heading>
                      </Box>
                      <Badge colorScheme="blue">{item.badge}</Badge>
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack align="stretch" spacing={4}>
                      {item.content.map((text, idx) => (
                        <Text key={idx} color={textColor}>
                          {text}
                        </Text>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>

          {/* Sidebar */}
          <Box display={{ base: 'none', lg: 'block' }}>
            <Box
              position="sticky"
              top="100px"
              p={6}
              borderRadius="lg"
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
            >
              <VStack spacing={6} align="stretch">
                <Heading size="md">Navigation</Heading>
                <List spacing={3}>
                  {termsItems.map((item, index) => (
                    <ListItem key={index}>
                      <ChakraLink
                        as={Link}
                        to={`#${item.id}`}
                        display="flex"
                        alignItems="center"
                        color="blue.500"
                        _hover={{ textDecoration: 'none', color: 'blue.600' }}
                      >
                        <ListIcon as={item.icon} />
                        {item.title}
                      </ChakraLink>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <Box>
                  <Text fontWeight="bold" mb={2}>Questions?</Text>
                  <Button
                    as={Link}
                    to="/contact"
                    colorScheme="blue"
                    leftIcon={<FiMessageCircle />}
                    size="sm"
                    width="full"
                  >
                    Contact Legal Team
                  </Button>
                </Box>
              </VStack>
            </Box>
          </Box>
        </Grid>
      </Container>

      {/* PDF Download Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Download Terms & Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text>
                Choose your preferred format to download the complete Terms & Conditions document:
              </Text>
              <SimpleGrid columns={2} spacing={4}>
                <Button leftIcon={<FiFileText />}>PDF Format</Button>
                <Button leftIcon={<FiFileText />}>Word Format</Button>
              </SimpleGrid>
              <Text fontSize="sm" color={textColor}>
                Last updated: {lastUpdated} - Version 2.1
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Terms;