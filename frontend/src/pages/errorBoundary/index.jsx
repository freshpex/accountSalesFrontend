import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          minH="100vh" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          bg="gray.50"
        >
          <VStack spacing={6} p={8} textAlign="center">
            <Heading size="xl">Oops! Something went wrong</Heading>
            <Text color="gray.600">
              We`re sorry for the inconvenience. Please try refreshing the page.
            </Text>
            <Button colorScheme="blue" onClick={this.handleReset}>
              Return to Home
            </Button>
            {import.meta.env.NODE_ENV === 'development' && (
              <Box 
                mt={4} 
                p={4} 
                bg="red.50" 
                borderRadius="md"
                maxW="600px"
                overflow="auto"
              >
                <Text color="red.600" fontFamily="monospace" fontSize="sm">
                  {this.state.error && this.state.error.toString()}
                </Text>
              </Box>
            )}
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
