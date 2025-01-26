import {
    Container,
    VStack,
    Text,
    Heading,
    Button,
    Icon,
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
    FiAlertTriangle,
  } from 'react-icons/fi';

const ErrorState = () => {    
  const navigate = useNavigate();

    return (
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
};

export default ErrorState;