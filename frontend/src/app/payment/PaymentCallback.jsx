import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import api from '../../services/DataService';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const transaction_id = searchParams.get('transaction_id');
        const tx_ref = searchParams.get('tx_ref');

        if (!transaction_id || !tx_ref) {
          throw new Error('Invalid payment response');
        }

        const response = await api.post('/api/v1/transactions/callback', {
          transaction_id,
          tx_ref
        });

        if (response.data.success) {
          toast.success('Payment successful!');
          navigate('/transaction');
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (error) {
        toast.error(error.message);
        navigate('/transaction');
      }
    };

    verifyPayment();
  }, [searchParams, navigate, toast]);

  return <div>Processing payment...</div>;
};

export default PaymentCallback;
