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
  FiClock,
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
                  bg={useColorModeValue('white', 'gray.700')}
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