import { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  Icon,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Divider,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  FiShield,
  FiLock,
  FiDatabase,
  FiUserCheck,
  FiGlobe,
  FiAlertCircle,
  FiCheck,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);

const Privacy = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth scroll to anchor
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  
  return (
    <Box>
      {/* Progress Bar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        height="4px"
        bg="blue.100"
        zIndex={100}
      >
        <motion.div
          style={{
            height: '100%',
            backgroundImage: 'linear-gradient(to right, #3182CE, #63B3ED)',
            transformOrigin: '0%',
            scaleX
          }}
        />
      </Box>

      {/* Hero Section */}
      <Box
        bg={useColorModeValue('blue.50', 'blue.900')}
        py={20}
        px={4}
        textAlign="center"
      >
        <Container maxW="container.xl">
          <VStack spacing={6}>
            <Icon as={FiShield} boxSize={16} color="blue.500" />
            <Heading size="2xl" color={headingColor}>Privacy Policy</Heading>
            <Text fontSize="xl" maxW="2xl" color={useColorModeValue('gray.600', 'gray.300')}>
              We value your privacy and are committed to protecting your personal information.
              Learn how we collect, use, and safeguard your data.
            </Text>
            <Badge colorScheme="blue" px={4} py={2} borderRadius="full">
              Last Updated: January 17, 2024
            </Badge>
          </VStack>
        </Container>
      </Box>

      {/* Quick Navigation */}
      <Box bg={bgColor} py={8} borderBottom="1px" borderColor={borderColor}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {[
              { icon: FiDatabase, text: "Data Collection", href: "#collection" },
              { icon: FiLock, text: "Data Security", href: "#security" },
              { icon: FiUserCheck, text: "Your Rights", href: "#rights" },
              { icon: FiGlobe, text: "Cookie Policy", href: "#cookies" },
            ].map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                _hover={{ textDecoration: 'none' }}
              >
                <MotionBox
                  whileHover={{ y: -5 }}
                  p={6}
                  bg={bgColor}
                  borderRadius="lg"
                  boxShadow="md"
                  textAlign="center"
                >
                  <Icon as={item.icon} boxSize={8} color="blue.500" mb={3} />
                  <Text fontWeight="medium">{item.text}</Text>
                </MotionBox>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={12}>
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={8}>
          <Box>
            {/* Data Collection Section */}
            <Section
              id="collection"
              icon={FiDatabase}
              title="Data Collection"
              subtitle="Information we collect and process"
            >
              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontWeight="medium">Personal Information</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={FiCheck} color="green.500" />
                        Name and contact information
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FiCheck} color="green.500" />
                        Account credentials
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FiCheck} color="green.500" />
                        Payment information
                      </ListItem>
                    </List>
                  </AccordionPanel>
                </AccordionItem>
                {/* Add more accordion items */}
              </Accordion>
            </Section>

            {/* Data Security Section */}
            <Section
              id="security"
              icon={FiLock}
              title="Data Security"
              subtitle="How we protect your information"
            >
              <Box>
                <Text mb={4}>
                  We implement various security measures to maintain the safety of your personal information:
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {[
                    {
                      title: "Encryption",
                      description: "All data is encrypted using industry-standard protocols"
                    },
                    {
                      title: "Access Control",
                      description: "Strict access controls and authentication mechanisms"
                    },
                    {
                      title: "Regular Audits",
                      description: "Continuous security audits and vulnerability assessments"
                    },
                    {
                      title: "Data Backups",
                      description: "Regular automated backups with encryption"
                    }
                  ].map((item, index) => (
                    <Box
                      key={index}
                      p={5}
                      borderRadius="lg"
                      border="1px"
                      borderColor={borderColor}
                    >
                      <Heading size="sm" mb={2}>{item.title}</Heading>
                      <Text fontSize="sm">{item.description}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
                </Box>
            </Section>

            {/* Your Rights Section */}
            <Section
              id="rights"
              icon={FiUserCheck}
              title="Your Rights"
              subtitle="Understanding your data privacy rights"
            >
              <VStack spacing={6} align="stretch">
                <Text>
                  You have several rights regarding your personal data:
                </Text>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                  {[
                    {
                      title: "Right to Access",
                      description: "You can request a copy of your personal data"
                    },
                    {
                      title: "Right to Rectification",
                      description: "You can request corrections to your personal data"
                    },
                    {
                      title: "Right to Erasure",
                      description: "You can request deletion of your personal data"
                    },
                    {
                      title: "Right to Object",
                      description: "You can object to processing of your personal data"
                    }
                  ].map((right, index) => (
                    <Box
                      key={index}
                      p={6}
                      borderRadius="lg"
                      bg={bgColor}
                    >
                      <Heading size="sm" mb={3}>{right.title}</Heading>
                      <Text fontSize="sm">{right.description}</Text>
                    </Box>
                  ))}
                </Grid>
              </VStack>
            </Section>

            {/* Cookie Policy Section */}
            <Section
              id="cookies"
              icon={FiGlobe}
              title="Cookie Policy"
              subtitle="How we use cookies and similar technologies"
            >
              <VStack spacing={6} align="stretch">
                <Text>
                  We use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic.
                </Text>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Cookie Type</Th>
                      <Th>Purpose</Th>
                      <Th>Duration</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {[
                      {
                        type: "Essential",
                        purpose: "Required for basic site functionality",
                        duration: "Session"
                      },
                      {
                        type: "Analytics",
                        purpose: "Track site usage and performance",
                        duration: "1 year"
                      },
                      {
                        type: "Preferences",
                        purpose: "Remember your settings",
                        duration: "6 months"
                      }
                    ].map((cookie, index) => (
                      <Tr key={index}>
                        <Td>{cookie.type}</Td>
                        <Td>{cookie.purpose}</Td>
                        <Td>{cookie.duration}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>
            </Section>
          </Box>

          {/* Sidebar */}
          <Box display={{ base: 'none', lg: 'block' }}>
            <Box
              position="sticky"
              top="100px"
              p={6}
              borderRadius="lg"
              bg={useColorModeValue('gray.50', 'gray.700')}
            >
              <VStack spacing={4} align="stretch">
                <Heading size="md">Quick Links</Heading>
                <List spacing={3}>
                  {[
                    { text: "Data Collection", href: "#collection", icon: FiDatabase },
                    { text: "Data Security", href: "#security", icon: FiLock },
                    { text: "Your Rights", href: "#rights", icon: FiUserCheck },
                    { text: "Cookie Policy", href: "#cookies", icon: FiGlobe }
                  ].map((link, index) => (
                    <ListItem key={index}>
                      <Link
                        href={link.href}
                        display="flex"
                        alignItems="center"
                        color={headingColor}
                      >
                        <ListIcon as={link.icon} />
                        {link.text}
                      </Link>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <Box>
                  <Text fontWeight="bold" mb={2}>Need Help?</Text>
                  <Button
                    as={RouterLink}
                    to="/contact"
                    colorScheme="blue"
                    leftIcon={<FiAlertCircle />}
                    size="sm"
                    width="full"
                  >
                    Contact Support
                  </Button>
                </Box>
              </VStack>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

// Section component for reusability
const Section = ({ id, icon, title, subtitle, children }) => (
  <Box id={id} mb={12} scrollMarginTop="100px">
    <Flex align="center" mb={6}>
      <Icon as={icon} boxSize={6} color="blue.500" mr={3} />
      <Box>
        <Heading size="lg" color={useColorModeValue('gray.700', 'white')}>
          {title}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.300')} mt={1}>
          {subtitle}
        </Text>
      </Box>
    </Flex>
    {children}
  </Box>
);

export default Privacy;