import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  VStack,
  Heading,
  Text,
  Spinner,
  Container,
  Button,
  useToast,
  Code
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import api from '../../services/DataService';

const PaymentCallback = () => {
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const verifyPayment = useCallback(async (params) => {
    try {
      setStatus('processing');
      
      const storedData = JSON.parse(localStorage.getItem('paymentData') || '{}');
      const userId = localStorage.getItem('userId');
      
      const payload = {
        transaction_id: params.get('transaction_id'),
        tx_ref: params.get('tx_ref'),
        status: params.get('status'),
        meta: {
          ...Object.fromEntries(params.entries()),
          userId: storedData.userId || userId,
          customerId: storedData.customerId || userId,
          productId: storedData.productId,
          amount: parseFloat(storedData.amount) || 0,
          paymentMethod: 'flutterwave',
          checkoutUrl: window.location.href,
          verificationTime: new Date().toISOString(),
          customer: {
            email: storedData.customerEmail,
            name: storedData.customerName
          }
        }
      };

      const maxRetries = 3;
      let retryCount = 0;
      let lastError;

      while (retryCount < maxRetries) {
        try {
          if (retryCount === 0) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }

          const response = await api.post('/api/v1/transactions/callback', payload);
          console.log('Verification response:', response.data);

          if (response.data?.success) {
            setStatus('success');
            const transactionId = response.data.transaction?.id || 
                                 response.data.transaction?.transactionId ||
                                 params.get('tx_ref');
            
            toast({
              title: 'Payment Successful',
              description: 'Transaction verified successfully. Redirecting...',
              status: 'success',
              duration: 3000,
            });
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate(`/purchased-account/${transactionId}`);
            return;
          }
          
          throw new Error(response.data.error || 'Payment verification failed');
        } catch (error) {
          console.error(`Verification attempt ${retryCount + 1} failed:`, error);
          lastError = error;
          retryCount++;
          
          if (retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }
          throw error;
        }
      }

      throw lastError;
    } catch (error) {
      console.error('Payment verification error:', error);
      setStatus('failed');
      setError(error.response?.data?.error || error.message || 'Payment verification failed');
      
      toast({
        title: 'Payment Error',
        description: `Verification failed: ${error.message}. Please contact support with your transaction reference: ${params.get('tx_ref')}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  }, [navigate, toast]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const tx_ref = params.get('tx_ref');
    const transaction_id = params.get('transaction_id');

    if (status === 'successful' || status === 'completed') {
      if (!tx_ref || !transaction_id) {
        setStatus('failed');
        setError('Missing transaction reference or ID');
        return;
      }
      verifyPayment(params);
    } else {
      setStatus('failed');
      setError(`Invalid payment status: ${status}`);
    }
  }, [location, verifyPayment]);

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="center">
        {status === 'processing' && (
          <>
            <Spinner size="xl" color="blue.500" />
            <Heading size="lg">Verifying Payment</Heading>
            <Text>Please wait while we verify your payment...</Text>
            <Code fontSize="sm">Transaction Ref: {new URLSearchParams(location.search).get('tx_ref')}</Code>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleIcon boxSize={12} color="green.500" />
            <Heading size="lg">Payment Successful!</Heading>
            <Text>Your transaction has been completed successfully.</Text>
            <Text fontSize="sm">Redirecting to your purchase...</Text>
          </>
        )}

        {status === 'failed' && (
          <>
            <WarningIcon boxSize={12} color="red.500" />
            <Heading size="lg">Payment Failed</Heading>
            <Text color="red.500">{error || 'Failed to process payment'}</Text>
            <Code fontSize="sm">
              Transaction Ref: {new URLSearchParams(location.search).get('tx_ref')}
            </Code>
            <VStack spacing={4}>
              <Button colorScheme="blue" onClick={() => navigate('/transaction')}>
                View Transactions
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry Verification
              </Button>
            </VStack>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default PaymentCallback;
