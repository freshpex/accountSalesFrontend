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
      console.log('Full payment params:', {
        transaction_id: params.get('transaction_id'),
        tx_ref: params.get('tx_ref'),
        status: params.get('status'),
        productId: params.get('productId')
      });
      
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
        toast({
          title: 'Payment Successful',
          description: 'Your transaction has been completed successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Add delay before redirect
        setTimeout(() => {
          if (response.data.transaction?.escrowId) {
            navigate(`/escrow/${response.data.transaction.escrowId}`);
          } else {
            navigate('/transaction');
          }
        }, 2000);
      } else {
        throw new Error(response.data.error || 'Payment verification failed');
      }
    } catch (error) {
      setStatus('failed');
      setError(error.response?.data?.error || error.message);
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
