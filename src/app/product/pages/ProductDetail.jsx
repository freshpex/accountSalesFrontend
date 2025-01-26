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
  List,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  FiUser,
  FiCalendar,
  FiMapPin,
  FiShield,
  FiUsers,
  FiPercent,
} from 'react-icons/fi';
import { fetch_single_product, clear_selected_product, request_escrow, clear_purchase_status, clear_escrow_status } from '../redux/reducer';
import ImageGallery from '../components/ImageGallery';
import { motion } from 'framer-motion';
import { useColors } from '../../../utils/colors';
import {
  getSelectedProduct,
  getProductDetailLoading,
  getProductDetailError,
  getEscrowStatus
} from '../redux/selector';
import { getProfile } from '../../accountSettings.jsx/redux/selector';
import { fetch_profile } from '../../accountSettings.jsx//redux/reducer';
import StatBox from '../components/statBox';
import SecurityFeature from '../components/securityFeature';
import IncludedItem from '../components/includedItem';
import StatisticCard from '../components/statisticCard';
import Alert from '../components/alert';
import ErrorState from '../components/errorState';
import LoadingSkeleton from '../components/loadingSkeleton';

const MotionBox = motion(Box);

const ProductDetail = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(getSelectedProduct);
  const loading = useSelector(getProductDetailLoading);
  const error = useSelector(getProductDetailError);
  const escrowStatus = useSelector(getEscrowStatus);
  const toast = useToast();
  const colors = useColors();
  const [selectedImage, setSelectedImage] = useState(null);
  const profile = useSelector(getProfile);
  
  useEffect(() => {
      dispatch(fetch_profile());
    }, [dispatch]);

  useEffect(() => {
    dispatch(fetch_single_product({ id, type }));
    return () => dispatch(clear_selected_product());
  }, [id, type, dispatch]);

  const loadFlutterwaveScript = (retryCount = 3) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.flutterwave.com/v3.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        if (retryCount > 0) {
          console.warn(`Flutterwave script load failed. Retrying... (${retryCount} attempts left)`);
          setTimeout(() => loadFlutterwaveScript(retryCount - 1).then(resolve).catch(reject), 1000);
        } else {
          reject(new Error('Failed to load payment script. Please check your connection.'));
        }
      };
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async () => {
    try {
      await loadFlutterwaveScript();
      
      const productId = product._id || product.id;
      
      // Store payment data for callback
      const paymentData = {
        productId,
        userId: profile.userId,
        customerId: profile._id,
        amount: product.price,
        customerEmail: profile.email,
        customerName: `${profile.firstName} ${profile.lastName}`.trim()
      };
      
      localStorage.setItem('paymentData', JSON.stringify(paymentData));

      const config = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: `TX_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        amount: product.price,
        currency: 'NGN',
        payment_options: 'card,banktransfer,ussd',
        redirect_url: `${window.location.origin}/payment/callback`,
        meta: {
          productId: productId,
          productType: product.type,
          userId: profile.userId,
          customerId: profile._id,
          escrowId: null
        },
        customer: {
          email: profile.email || 'customer@example.com',
          phone_number: profile.phoneNumber || '',
          name: `${profile.firstName} ${profile.lastName}`.trim() || 'Customer',
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          address: profile.address || '',
          country: profile.country || '',
          gender: profile.gender || '',
          birthDate: profile.birthDate || null,
          profilePicture: profile.profilePicture || '',
          userId: profile.userId,
          profileId: profile._id
        },
        customizations: {
          title: 'Product Purchase',
          description: `Payment for ${product.username}`,
          logo: import.meta.env.VITE_LOGO_URL,
        },
        callback: handleFlutterwaveSuccess,
        onclose: () => {
          console.log('Payment modal closed');
          toast({
            title: 'Payment Cancelled',
            description: 'You have cancelled the payment',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        }
      };

      if (typeof window.FlutterwaveCheckout === 'function') {
        window.FlutterwaveCheckout(config);
      } else {
        throw new Error('Flutterwave not initialized properly');
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: 'Payment Error',
        description: 'Failed to initialize payment. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFlutterwaveSuccess = async (response) => {
    try {

      // Verify payment status
      const verifyResponse = await fetch('/api/v1/transactions/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transaction_id: response.transaction_id,
          tx_ref: response.tx_ref
        })
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        toast({
          title: 'Payment Successful',
          description: 'Your payment has been verified successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Create escrow after successful payment
        const escrowAction = await dispatch(request_escrow({
          productId: product.id,
          transactionId: response.transaction_id,
          type: 'product_purchase'
        }));

        if (escrowAction.payload?.escrowId) {
          navigate(`/escrow/${escrowAction.payload.escrowId}`);
        }
      } else {
        throw new Error(verifyData.error || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'Failed to process payment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEscrowRequest = async () => {
    try {
      dispatch(request_escrow({
        productId: id,
        type: 'product_purchase'
      }));
      
      if (escrowStatus.escrowData?.escrowId) {
        navigate(`/escrow/${escrowStatus.escrowData.escrowId}`);
      }
    } catch (error) {
      console.error('Escrow request error:', error);
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
                bg={colors.productCardBg}
                borderWidth="1px"
                borderColor={colors.borderColor}
                boxShadow={colors.cardShadow}
                p={4}
              >
                <ImageGallery
                  images={product.images}
                  onImageClick={setSelectedImage}
                />
              </Box>

              {/* Product Information Tabs */}
              <Box
                bg={colors.productCardBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={colors.borderColor}
                boxShadow={colors.cardShadow}
                overflow="hidden"
              >
                <Tabs colorScheme="blue" isLazy>
                  <TabList bg={colors.productTabBg}>
                    <Tab
                      _selected={{
                        bg: colors.productTabSelected,
                        color: colors.buttonPrimaryBg
                      }}
                      _hover={{
                        bg: colors.productTabHover
                      }}
                    >
                      Details
                    </Tab>
                    <Tab>Statistics</Tab>
                    <Tab>Security</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <VStack align="stretch" spacing={4}>
                        <Heading size="md" color={colors.textColor}>Account Information</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                          {/* Update StatBox component */}
                          <Box
                            p={4}
                            bg={colors.statCardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={colors.borderColor}
                            _hover={{ bg: colors.statCardHover }}
                          >
                            <StatBox
                              icon={FiUser}
                              label="Username"
                              value={product.username}
                            />
                          </Box>
                          <Box
                            p={4}
                            bg={colors.statCardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={colors.borderColor}
                            _hover={{ bg: colors.statCardHover }}
                          >
                            <StatBox
                              icon={FiCalendar}
                              label="Account Age"
                              value={`${product.age} years`}
                            />
                          </Box>
                          <Box
                            p={4}
                            bg={colors.statCardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={colors.borderColor}
                            _hover={{ bg: colors.statCardHover }}
                          >
                            <StatBox
                              icon={FiUsers}
                              label="Followers"
                              value={product.followers.toLocaleString()}
                            />
                          </Box>
                          <Box
                            p={4}
                            bg={colors.statCardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={colors.borderColor}
                            _hover={{ bg: colors.statCardHover }}
                          >
                            <StatBox
                              icon={FiPercent}
                              label="Engagement Rate"
                              value={`${product.engagement}%`}
                            />
                          </Box>
                          <Box
                            p={4}
                            bg={colors.statCardBg}
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={colors.borderColor}
                            _hover={{ bg: colors.statCardHover }}
                          >
                            <StatBox
                              icon={FiMapPin}
                              label="Region"
                              value={product.region}
                            />
                          </Box>
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
              </Box>
            </VStack>
          </GridItem>

          {/* Right Column - Purchase Info */}
          <GridItem>
            <Box
              position="sticky"
              top="20px"
              p={6}
              borderRadius="lg"
              bg={colors.productCardBg}
              borderWidth="1px"
              borderColor={colors.borderColor}
              boxShadow={colors.cardShadow}
            >
              <VStack align="stretch" spacing={6}>
                <HStack justify="space-between">
                  <Heading size="lg">₦{product.price.toLocaleString()}</Heading>
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
        <ModalContent bg={colors.productCardBg}>
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
    </Container>
  );
};

export default ProductDetail;
