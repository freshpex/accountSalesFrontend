import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const FlutterwavePayment = ({ config, onSuccess, onError }) => {
  const toast = useToast();

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

  const initializePayment = async () => {
    try {
      await loadFlutterwaveScript();
      
      const paymentConfig = {
        ...config,
        callback: async (response) => {
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
              onSuccess(response);
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            onError(error);
          }
        },
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
        window.FlutterwaveCheckout(paymentConfig);
      } else {
        throw new Error('Flutterwave not initialized properly');
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      onError(error);
    }
  };

  useEffect(() => {
    initializePayment();
  }, []);

  return null;
};

export default FlutterwavePayment;
