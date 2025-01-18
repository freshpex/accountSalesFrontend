import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Spinner, Center, Text } from '@chakra-ui/react';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${backendUrl}/user/auth/google/callback${window.location.search}`);
        const data = await response.json();
        
        if (data.success) {
          // Store the token
          localStorage.setItem('token', data.token);
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          setError(data.message || 'Authentication failed');
          // Redirect to login after 3 seconds if there's an error
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (err) {
        setError('Authentication failed. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return (
    <Center h="100vh" flexDirection="column" gap={4}>
      <Spinner size="xl" />
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Text>Completing authentication...</Text>
      )}
    </Center>
  );
};

export default GoogleCallback;
