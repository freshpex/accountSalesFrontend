import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  VStack,
  Heading,
  Text,
  Spinner,
  Container,
  Button,
  useToast
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

      const maxRetries = 3;
      let retryCount = 0;
      let lastError;

      while (retryCount < maxRetries) {
        try {
          const response = await api.post('/api/v1/transactions/callback', {
            transaction_id: params.get('transaction_id'),
            tx_ref: params.get('tx_ref'),
            meta: {
              productId: params.get('productId'),
              checkoutUrl: window.location.href
            }
          });

          if (response.data.success) {
            setStatus('success');
            
            const transactionId = response.data.transaction?.transactionId || 
                                 response.data.transaction?.id ||
                                 params.get('tx_ref');
            
            toast({
              title: 'Payment Successful',
              description: 'Redirecting to view account credentials...',
              status: 'success',
              duration: 3000,
            });
            
            setTimeout(() => {
              navigate(`/purchased-account/${transactionId}`);
            }, 2000);
            
            return;
          }
          
          throw new Error(response.data.error || 'Payment verification failed');
        } catch (error) {
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
        description: error.response?.data?.error || error.message || 'Payment verification failed',
        status: 'error',
        duration: 5000,
      });
    }
  }, [navigate, toast]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');

    if (status === 'successful' || status === 'completed') {
      verifyPayment(params);
    } else {
      setStatus('failed');
      setError('Payment was not successful');
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
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleIcon boxSize={12} color="green.500" />
            <Heading size="lg">Payment Successful!</Heading>
            <Text>Your transaction has been completed successfully.</Text>
          </>
        )}

        {status === 'failed' && (
          <>
            <WarningIcon boxSize={12} color="red.500" />
            <Heading size="lg">Payment Failed</Heading>
            <Text color="red.500">{error || 'Failed to process payment'}</Text>
            <Button onClick={() => navigate('/transaction')}>
              View Transactions
            </Button>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default PaymentCallback;
