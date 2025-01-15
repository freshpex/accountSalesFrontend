import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Skeleton,
  Button,
  useDisclosure,
  Icon,
  Circle,
  Tooltip,
  Progress,
  useToast,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FiShield,
  FiClock,
  FiAlertCircle,
  FiLock,
  FiUnlock,
  FiInfo
} from 'react-icons/fi';
import { useColors } from '../../../utils/colors';
import api from '../../../services/DataService';
import PaymentModal from '../modal/PaymentModal';
import { ApiEndpoints } from '../../../store/types';    

const MotionBox = motion(Box);

const steps = [
  { title: 'Escrow Created', description: 'Request submitted' },
  { title: 'Payment Pending', description: 'Awaiting payment' },
  { title: 'Verification', description: 'Account transfer' },
  { title: 'Completed', description: 'Transaction finished' }
];

const EscrowDetails = () => {
  const { escrowId } = useParams();
  const [escrow, setEscrow] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const colors = useColors();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length
  });

  useEffect(() => {
    const fetchEscrowDetails = async () => {
      try {
        const response = await api.get(`${ApiEndpoints.ESCROW}/${escrowId}`);
        console.log('Escrow response:', response.data);
        
        if (response.data.success && response.data.escrow) {
          setEscrow(response.data.escrow);
          if (response.data.escrow.product) {
            setProduct(response.data.escrow.product);
          }
          
          // Set active step based on status
          const stepMap = {
            'pending': 1,
            'active': 2,
            'verification': 3,
            'completed': 4
          };
          setActiveStep(stepMap[response.data.escrow.status] || 1);
        } else {
          throw new Error(response.data.error || 'Failed to fetch escrow details');
        }
      } catch (error) {
        console.error('Error fetching escrow:', error);
        setError(error.response?.data?.error || error.message);
        toast({
          title: 'Error',
          description: error.response?.data?.error || 'Failed to fetch escrow details',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEscrowDetails();
  }, [escrowId, setActiveStep, toast]);

  const handlePayment = async (paymentDetails) => {
    try {
      const response = await api.post('/api/v1/transactions/initiate', {
        productId: product._id,
        escrowId: escrow._id,
        ...paymentDetails
      });

      if (response.data.success) {
        onClose();
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      toast({
        title: 'Payment Error',
        description: error.response?.data?.message || 'Failed to initiate payment',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  if (loading) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={6}>
          <Skeleton height="40px" width="100%" />
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} width="100%">
            <Skeleton height="200px" />
            <Skeleton height="200px" />
            <Skeleton height="200px" />
          </SimpleGrid>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack>
          <Icon as={FiAlertCircle} boxSize={12} color="red.500" />
          <Heading size="lg" color="red.500">Error</Heading>
          <Text>{error}</Text>
          <Button onClick={() => navigate('/products')}>Return to Products</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={4} px={4}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={{ base: 4, md: 8 }}>
          <HStack 
            w="full" 
            justify="space-between"
            flexDir={{ base: 'column', sm: 'row' }}
            align={{ base: 'start', sm: 'center' }}
            spacing={{ base: 2, sm: 4 }}
          >
            <VStack align="start" spacing={1}>
              <Heading size={{ base: "md", md: "lg" }}>Escrow Transaction</Heading>
              <Text 
                color="gray.500" 
                fontSize={{ base: "sm", md: "md" }}
              >
                ID: {escrowId}
              </Text>
            </VStack>
            <Badge
              size="lg"
              variant="subtle"
              colorScheme={
                escrow.status === 'completed' ? 'green' :
                escrow.status === 'pending' ? 'yellow' :
                escrow.status === 'active' ? 'blue' : 'red'
              }
              p={2}
              borderRadius="md"
              fontSize={{ base: "xs", md: "sm" }}
            >
              {escrow.status.toUpperCase()}
            </Badge>
          </HStack>

          {/* Stepper - Responsive adjustments */}
          <Box w="full" p={{ base: 2, md: 4 }} bg={colors.bgColor} borderRadius="lg" borderWidth="1px">
            <Stepper 
              index={activeStep} 
              colorScheme="blue"
              orientation={{ base: "vertical", md: "horizontal" }}
              size={{ base: "sm", md: "md" }}
              gap={{ base: 2, md: 4 }}
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepIcon />}
                      active={<StepIcon />}
                    />
                  </StepIndicator>
                  <Box flexShrink='0'>
                    <StepTitle fontSize={{ base: "sm", md: "md" }}>{step.title}</StepTitle>
                    <StepDescription 
                      fontSize={{ base: "xs", md: "sm" }}
                      display={{ base: "none", sm: "block" }}
                    >
                      {step.description}
                    </StepDescription>
                  </Box>
                </Step>
              ))}
            </Stepper>
          </Box>

          <SimpleGrid 
            columns={{ base: 1, md: 3 }} 
            spacing={{ base: 4, md: 6 }} 
            w="full"
          >
            {/* Transaction Details Card */}
            <MotionBox
              whileHover={{ y: -5 }}
              p={{ base: 4, md: 6 }}
              bg={colors.bgColor}
              borderRadius="lg"
              borderWidth="1px"
              shadow="md"
            >
              <VStack align="start" spacing={4}>
                <Circle size={12} bg="blue.50">
                  <Icon as={FiInfo} boxSize={6} color="blue.500" />
                </Circle>
                <Heading size="md">Transaction Details</Heading>
                <VStack align="start" spacing={2} w="full">
                  <HStack justify="space-between" w="full">
                    <Text color="gray.500">Amount:</Text>
                    <Text fontWeight="bold">₦{escrow.amount?.toLocaleString()}</Text>
                  </HStack>
                  <HStack justify="space-between" w="full">
                    <Text color="gray.500">Created:</Text>
                    <Text>{new Date(escrow.createdAt).toLocaleDateString()}</Text>
                  </HStack>
                </VStack>
              </VStack>
            </MotionBox>

            {/* Product Information Card */}
            <MotionBox
              whileHover={{ y: -5 }}
              p={{ base: 4, md: 6 }}
              bg={colors.bgColor}
              borderRadius="lg"
              borderWidth="1px"
              shadow="md"
            >
              <VStack align="start" spacing={4}>
                <Circle size={12} bg="green.50">
                  <Icon as={FiShield} boxSize={6} color="green.500" />
                </Circle>
                <Heading size="md">Product Information</Heading>
                <VStack align="start" spacing={2} w="full">
                  <Text color="gray.500">Name:</Text>
                  <Text fontWeight="bold">{escrow.metadata?.productName}</Text>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/product/${product?.type}/${product?._id}`)}
                  >
                    View Product
                  </Button>
                </VStack>
              </VStack>
            </MotionBox>

            {/* Security Status Card */}
            <MotionBox
              whileHover={{ y: -5 }}
              p={{ base: 4, md: 6 }}
              bg={colors.bgColor}
              borderRadius="lg"
              borderWidth="1px"
              shadow="md"
            >
              <VStack align="start" spacing={4}>
                <Circle size={12} bg="purple.50">
                  <Icon 
                    as={escrow.status === 'pending' ? FiLock : FiUnlock} 
                    boxSize={6} 
                    color="purple.500" 
                  />
                </Circle>
                <Heading size="md">Security Status</Heading>
                <VStack align="start" spacing={2} w="full">
                  <Progress 
                    value={
                      escrow.status === 'completed' ? 100 :
                      escrow.status === 'active' ? 66 :
                      escrow.status === 'pending' ? 33 : 0
                    }
                    w="full"
                    colorScheme="purple"
                    borderRadius="full"
                  />
                  <Text fontSize="sm" color="gray.500">
                    {escrow.status === 'pending' ? 'Funds will be held securely' :
                     escrow.status === 'active' ? 'Transaction in progress' :
                     'Transaction completed'}
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>
          </SimpleGrid>

          {/* Action Buttons - Stack on mobile */}
          <HStack 
            spacing={{ base: 2, md: 4 }} 
            w="full" 
            justify="center"
            flexDir={{ base: 'column', sm: 'row' }}
          >
            <Tooltip label={escrow.status !== 'pending' ? 'Payment already processed' : ''}>
              <Button
                size={{ base: "md", md: "lg" }}
                width={{ base: "full", sm: "auto" }}
                colorScheme="blue"
                isDisabled={escrow.status !== 'pending'}
                onClick={onOpen}
              >
                Proceed to Payment
              </Button>
            </Tooltip>
            <Button
              size={{ base: "md", md: "lg" }}
              width={{ base: "full", sm: "auto" }}
              variant="outline"
              leftIcon={<FiClock />}
              onClick={() => navigate('/transaction')}
            >
              View All Transactions
            </Button>
          </HStack>
        </VStack>
      </MotionBox>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        product={product}
        onSubmit={handlePayment}
        escrowId={escrowId}
        isMobile={true}
      />
    </Container>
  );
};

export default EscrowDetails;