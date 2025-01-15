import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Image,
  Tag,
  Divider,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import {
  FiUser,
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiShield,
  FiUsers,
  FiPercent,
  FiCheck,
  FiAlertTriangle,
} from 'react-icons/fi';
import { fetch_single_product, clear_selected_product, initiate_purchase, request_escrow, clear_purchase_status, clear_escrow_status } from '../redux/reducer';
import PaymentModal from '../modal/PaymentModal';
import ImageGallery from '../components/ImageGallery';
import { motion } from 'framer-motion';
import { useColors } from '../../../utils/colors';
import {
  getSelectedProduct,
  getProductDetailLoading,
  getProductDetailError,
  getProductPurchaseStatus
} from '../redux/selector';

const MotionBox = motion(Box);

const ProductDetail = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const product = useSelector(getSelectedProduct);
  const loading = useSelector(getProductDetailLoading);
  const error = useSelector(getProductDetailError);
  const { loading: purchaseLoading, error: purchaseError, success: purchaseSuccess } = useSelector(getProductPurchaseStatus);
  const toast = useToast();
  const colors = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(product);

  // Subcomponents for better organization
  const StatBox = ({ icon, label, value }) => (
    <HStack p={4} bg="gray.50" borderRadius="md">
      <Icon as={icon} boxSize={5} color="blue.500" />
      <VStack align="start" spacing={0}>
        <Text fontSize="sm" color="gray.500">{label}</Text>
        <Text fontWeight="bold">{value}</Text>
      </VStack>
    </HStack>
  );

  const SecurityFeature = ({ text, isAvailable }) => (
    <ListItem>
      <ListIcon
        as={isAvailable ? FiCheck : FiAlertTriangle}
        color={isAvailable ? 'green.500' : 'orange.500'}
      />
      {text}
    </ListItem>
  );

  const IncludedItem = ({ text }) => (
    <ListItem>
      <ListIcon as={FiCheck} color="green.500" />
      {text}
    </ListItem>
  );

  const StatisticCard = ({ title, value, change }) => (
    <Stat
      px={4}
      py={2}
      bg="gray.50"
      borderRadius="md"
    >
      <StatLabel fontSize="sm" color="gray.500">{title}</StatLabel>
      <StatNumber fontSize="lg" fontWeight="bold">
        {value.toLocaleString()}
      </StatNumber>
      <StatHelpText color={change.startsWith('+') ? 'green.500' : 'red.500'}>
        {change} from last month
      </StatHelpText>
    </Stat>
  );

  const Alert = ({ status, title, description }) => (
    <Box
      p={4}
      borderRadius="md"
      bg={status === 'info' ? 'blue.50' : 'red.50'}
      color={status === 'info' ? 'blue.700' : 'red.700'}
    >
      <HStack spacing={3}>
        <Icon
          as={status === 'info' ? FiShield : FiAlertTriangle}
          boxSize={5}
        />
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">{title}</Text>
          <Text fontSize="sm">{description}</Text>
        </VStack>
      </HStack>
    </Box>
  );

  const LoadingSkeleton = () => (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <GridItem>
          <VStack align="stretch" spacing={6}>
            <Skeleton height="400px" borderRadius="lg" />
            <Skeleton height="200px" borderRadius="lg" />
          </VStack>
        </GridItem>
        <GridItem>
          <Skeleton height="500px" borderRadius="lg" />
        </GridItem>
      </Grid>
    </Container>
  );

  const ErrorState = () => (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={4} align="center">
        <Icon as={FiAlertTriangle} boxSize={12} color="red.500" />
        <Heading size="lg">Product Not Found</Heading>
        <Text color="gray.600">
          The product you`re looking for doesn`t exist or has been removed.
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => navigate('/products')}
        >
          Back to Products
        </Button>
      </VStack>
    </Container>
  );

  useEffect(() => {
    dispatch(fetch_single_product({ id, type }));
    return () => dispatch(clear_selected_product());
  }, [id, type, dispatch]);

  const handleBuyNow = () => {
    onOpen();
  };

  const handlePaymentSubmit = async (paymentDetails) => {
    try {
      const result = await dispatch(initiate_purchase({
        productId: id,
        paymentMethod: paymentDetails.paymentMethod,
        ...paymentDetails
      })).unwrap();

      if (result.success) {
        onClose();
        toast.success('Purchase initiated successfully');
        navigate(`/payment/process/${result.transactionId}`);
      }
    } catch (error) {
      toast.error(error.message || 'Payment initiation failed');
    }
  };

  const handleEscrowRequest = async () => {
    try {
      const result = await dispatch(request_escrow({
        productId: id,
        type: 'product_purchase'
      })).unwrap();

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Escrow request initiated',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        navigate(`/escrow/${result.escrowId}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clear_purchase_status());
      dispatch(clear_escrow_status());
    };
  }, [dispatch]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState error={error} />;
  if (!product) return <ErrorState />;

  return (
    <Container maxW="container.xl" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <GridItem>
            <VStack align="stretch" spacing={6}>
              {/* Image Gallery */}
              <Box
                borderRadius="lg"
                overflow="hidden"
                bg={colors.bgColor}
                p={4}
              >
                <ImageGallery
                  images={product.images}
                  onImageClick={setSelectedImage}
                />
              </Box>

              {/* Product Information Tabs */}
              <Tabs colorScheme="blue" isLazy>
                <TabList>
                  <Tab>Details</Tab>
                  <Tab>Statistics</Tab>
                  <Tab>Security</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Heading size="md">Account Information</Heading>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <StatBox
                          icon={FiUser}
                          label="Username"
                          value={product.username}
                        />
                        <StatBox
                          icon={FiCalendar}
                          label="Account Age"
                          value={`${product.age} years`}
                        />
                        <StatBox
                          icon={FiUsers}
                          label="Followers"
                          value={product.followers.toLocaleString()}
                        />
                        <StatBox
                          icon={FiPercent}
                          label="Engagement Rate"
                          value={`${product.engagement}%`}
                        />
                        <StatBox
                          icon={FiMapPin}
                          label="Region"
                          value={product.region}
                        />
                      </SimpleGrid>

                      <Divider />

                      <Box>
                        <Heading size="md" mb={4}>Description</Heading>
                        <Text>{product.about}</Text>
                      </Box>
                    </VStack>
                  </TabPanel>

                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Heading size="md">Account Statistics</Heading>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <StatisticCard
                          title="Average Likes"
                          value={product.stats.averageLikes || Math.floor(product.followers * (product.engagement / 100))}
                          change="+5%"
                        />
                        <StatisticCard
                          title="Average Comments"
                          value={product.stats.averageComments || Math.floor(product.followers * 0.01)}
                          change="+3%"
                        />
                        <StatisticCard
                          title="Monthly Growth"
                          value={Math.floor(product.followers * 0.03)}
                          change="+2.5%"
                        />
                        <StatisticCard
                          title="Reach"
                          value={Math.floor(product.followers * 0.3)}
                          change="+4%"
                        />
                      </SimpleGrid>
                    </VStack>
                  </TabPanel>

                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Heading size="md">Security Features</Heading>
                      <List spacing={3}>
                        <SecurityFeature
                          text="2FA Enabled"
                          isAvailable={product.security.twoFactorEnabled || false}
                        />
                        <SecurityFeature
                          text="Original Email Available"
                          isAvailable={product.security.originalEmailAvailable || false}
                        />
                        <SecurityFeature
                          text="Account Recovery Options"
                          isAvailable={true}
                        />
                        <SecurityFeature
                          text="Previous Password History"
                          isAvailable={false}
                        />
                      </List>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </GridItem>

          {/* Right Column - Purchase Info */}
          <GridItem>
            <Box
              position="sticky"
              top="20px"
              p={6}
              borderRadius="lg"
              bg={colors.bgColor}
              borderWidth="1px"
              borderColor={colors.borderColor}
            >
              <VStack align="stretch" spacing={6}>
                <HStack justify="space-between">
                  <Heading size="lg">₦{product.price}</Heading>
                  <Tag
                    size="lg"
                    colorScheme={product.status === 'available' ? 'green' : 'red'}
                  >
                    {product.status}
                  </Tag>
                </HStack>

                <VStack align="stretch" spacing={4}>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    isDisabled={product.status !== 'available'}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>

                  <Button
                    variant="outline"
                    leftIcon={<FiShield />}
                    onClick={handleEscrowRequest}
                  >
                    Request Escrow
                  </Button>
                </VStack>

                <Divider />

                <VStack align="stretch" spacing={2}>
                  <Heading size="sm">What`s included:</Heading>
                  <List spacing={3}>
                    <IncludedItem text="Full account access" />
                    <IncludedItem text="Original email access" />
                    <IncludedItem text="24/7 Support" />
                    <IncludedItem text="Transfer assistance" />
                  </List>
                </VStack>

                <Alert
                  status="info"
                  title="Secure Transaction"
                  description="All purchases are protected by our escrow service"
                />
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </MotionBox>

      {/* Image Preview Modal */}
      <Modal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        size="6xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={colors.bgColor}>
          <ModalBody p={0}>
            <Image
            src={selectedImage}
            w="full"
            h="auto"
            objectFit="contain"
            maxH="90vh"
            />
          </ModalBody>
          </ModalContent>
        </Modal>      
        {/* Payment Modal */}      
        <PaymentModal
          isOpen={isOpen}
          onClose={onClose}
          product={product}
          onSubmit={handlePaymentSubmit}
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
          isLoading={purchaseLoading}
          error={purchaseError}
        />
    </Container>
  );
};

export default ProductDetail;
