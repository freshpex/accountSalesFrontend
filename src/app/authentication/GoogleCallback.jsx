import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Spinner, Text } from '@chakra-ui/react';

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      try {
        dispatch({ type: 'HANDLE_GOOGLE_CALLBACK', payload: { token } });
        navigate('/dashboard');
      } catch (err) {
        console.log('error', err)
        console.error('Google callback error:', err);
        navigate('/login?error=Authentication failed');
      }
    } else if (error) {
      navigate(`/login?error=${error}`);
    }
  }, [dispatch, location, navigate]);

  return (
    <Box 
      display="flex" 
      flexDirection="column"
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
    >
      <Spinner size="xl" mb={4} />
      <Text>Processing authentication...</Text>
    </Box>
  );
};

export default GoogleCallback;
