import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  useToast,
  Icon,
  SimpleGrid,
  Badge,
  useClipboard,
  List,
  ListItem,
  ListIcon,
  Collapse,
  Spinner,
  Alert,
  AlertIcon,
  Code,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiDownload,
  FiCopy,
  FiCheckCircle,
  FiAlertTriangle,
  FiSmartphone,
  FiKey,
  FiShield,
} from "react-icons/fi";
import { useColors } from "../../../utils/colors";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import api from "../../../services/DataService";

const MotionBox = motion(Box);

const PurchasedAccountDetails = () => {
  const { purchaseId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const colors = useColors();
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const contentRef = useRef(null);

  const { hasCopied: hasEmailCopied, onCopy: onEmailCopy } = useClipboard(
    credentials?.accountEmail || "",
  );
  const { hasCopied: hasPasswordCopied, onCopy: onPasswordCopy } = useClipboard(
    credentials?.accountPassword || "",
  );

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(
          `/api/v1/transactions/${purchaseId}/credentials`,
        );

        if (response.data.success) {
          setCredentials(response.data.data);
        } else {
          throw new Error(response.data.error || "Failed to fetch credentials");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (purchaseId) {
      fetchCredentials();
    }

    // Cleanup function
    return () => {
      setCredentials(null);
      setError(null);
    };
  }, [purchaseId, toast]);

  const handleDownloadPDF = async () => {
    try {
      const content = contentRef.current;
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`account-details-${purchaseId}.pdf`);

      toast({
        title: "PDF Downloaded",
        description: "Your account details have been saved as PDF",
        status: "success",
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF",
        status: "error",
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Container maxW="container.md" py={10}>
        <VStack spacing={8}>
          <Spinner size="xl" color="blue.500" />
          <Text>Loading account credentials...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
        <Button mt={4} onClick={() => navigate("/transaction")}>
          Back to Transactions
        </Button>
      </Container>
    );
  }

  if (!credentials) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="warning">
          <AlertIcon />
          No credentials found for this purchase.
        </Alert>
        <Button mt={4} onClick={() => navigate("/transaction")}>
          Back to Transactions
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={contentRef}
      >
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box
            bg={colors.gradientBg}
            p={6}
            borderRadius="xl"
            color="white"
            position="relative"
            overflow="hidden"
          >
            <Icon
              as={FiShield}
              position="absolute"
              right="-20px"
              top="-20px"
              w="150px"
              h="150px"
              opacity={0.1}
            />
            <Heading size="lg">Account Details</Heading>
            <Text mt={2}>Purchase ID: {purchaseId}</Text>
            <Badge colorScheme="green" variant="solid" mt={4}>
              Purchase Successful
            </Badge>
          </Box>

          {/* Account Information */}
          <Box p={6} borderWidth={1} borderRadius="xl" bg={colors.cardBg}>
            <VStack align="stretch" spacing={6}>
              <Heading size="md">Account Information</Heading>

              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontWeight="bold" color={colors.labelColor}>
                    Platform
                  </Text>
                  <Text>{credentials?.platform}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color={colors.labelColor}>
                    Username
                  </Text>
                  <Text>{credentials?.username}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color={colors.labelColor}>
                    Account Age
                  </Text>
                  <Text>{credentials?.age} years</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color={colors.labelColor}>
                    Followers
                  </Text>
                  <Text>{credentials?.followers?.toLocaleString()}</Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Login Credentials */}
          <Box p={6} borderWidth={1} borderRadius="xl" bg={colors.cardBg}>
            <VStack align="stretch" spacing={6}>
              <HStack justify="space-between">
                <Heading size="md">Login Credentials</Heading>
                <Button
                  size="sm"
                  leftIcon={showCredentials ? <FiEyeOff /> : <FiEye />}
                  onClick={() => setShowCredentials(!showCredentials)}
                >
                  {showCredentials ? "Hide" : "Show"} Credentials
                </Button>
              </HStack>

              <Collapse in={showCredentials} animateOpacity>
                <VStack align="stretch" spacing={4}>
                  <HStack>
                    <Icon as={FiMail} />
                    <Text fontWeight="bold">Email:</Text>
                    <Code p={2} borderRadius="md">
                      {credentials?.accountEmail}
                    </Code>
                    <Button size="sm" onClick={onEmailCopy}>
                      {hasEmailCopied ? <FiCheckCircle /> : <FiCopy />}
                    </Button>
                  </HStack>

                  <HStack>
                    <Icon as={FiKey} />
                    <Text fontWeight="bold">Password:</Text>
                    <Code p={2} borderRadius="md">
                      {credentials?.accountPassword}
                    </Code>
                    <Button size="sm" onClick={onPasswordCopy}>
                      {hasPasswordCopied ? <FiCheckCircle /> : <FiCopy />}
                    </Button>
                  </HStack>

                  {credentials?.accountPhoneNumber && (
                    <HStack>
                      <Icon as={FiSmartphone} />
                      <Text fontWeight="bold">Phone Number:</Text>
                      <Code p={2} borderRadius="md">
                        {credentials?.accountPhoneNumber}
                      </Code>
                    </HStack>
                  )}
                </VStack>
              </Collapse>
            </VStack>
          </Box>

          {/* Security Notes */}
          <Box p={6} borderWidth={1} borderRadius="xl" bg={colors.cardBg}>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Important Security Notes</Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={FiLock} color="green.500" />
                  Change the password immediately after login
                </ListItem>
                <ListItem>
                  <ListIcon as={FiAlertTriangle} color="orange.500" />
                  IF details do not work, contact support immediately!
                </ListItem>
                <ListItem>
                  <ListIcon as={FiShield} color="blue.500" />
                  Update your personal information
                </ListItem>
              </List>
            </VStack>
          </Box>

          {/* Actions */}
          <HStack spacing={4} justify="center">
            <Button
              leftIcon={<FiDownload />}
              colorScheme="blue"
              onClick={handleDownloadPDF}
            >
              Download Details
            </Button>
            <Button variant="ghost" onClick={() => navigate("/transaction")}>
              View All Transactions
            </Button>
          </HStack>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default PurchasedAccountDetails;
