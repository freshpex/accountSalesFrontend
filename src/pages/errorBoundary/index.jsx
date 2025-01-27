import React from "react";
import { keyframes } from "@emotion/react";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Heading,
  VStack,
} from "@chakra-ui/react";

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-20px) }
  100% { transform: translateY(0px) }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      countdown: 10,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/dashboard";
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasError && !prevState.hasError) {
      this.startCountdown();
    }
  }

  startCountdown = () => {
    this.countdownTimer = setInterval(() => {
      if (this.state.countdown <= 1) {
        clearInterval(this.countdownTimer);
        this.handleReset();
      } else {
        this.setState((prev) => ({ countdown: prev.countdown - 1 }));
      }
    }, 1000);
  };

  componentWillUnmount() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <ChakraProvider>
          <Box
            minH="100vh"
            bgGradient="linear(to-r, blue.400, gray.400)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              width="full"
              height="full"
              bgImage="url('data:image/svg+xml,...')"
              opacity={0.1}
            />
            <VStack
              spacing={8}
              p={12}
              bg="rgba(255,255,255,0.95)"
              borderRadius="2xl"
              boxShadow="2xl"
              backdropFilter="blur(10px)"
              animation={`${float} 3s ease-in-out infinite`}
            >
              <Box position="relative">
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, blue.500, gray.500)"
                  bgClip="text"
                >
                  Oops! System Hiccup, We will be right back.
                </Heading>
                <Text
                  position="absolute"
                  top={0}
                  left={2}
                  opacity={0.1}
                  fontSize="6xl"
                  fontWeight="black"
                >
                  404
                </Text>
              </Box>
              <Text fontSize="lg" color="gray.600">
                Auto-refresh in {this.state.countdown} seconds...
              </Text>
              <Button
                size="lg"
                bgGradient="linear(to-r, blue.500, gray.500)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, blue.600, gray.600)",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
                onClick={this.handleReset}
              >
                Return to Home
              </Button>
              {import.meta.env.NODE_ENV === "development" &&
                this.state.error && (
                  <Box
                    mt={6}
                    p={6}
                    bg="rgba(0,0,0,0.05)"
                    borderRadius="xl"
                    maxW="600px"
                    maxH="200px"
                    overflow="auto"
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#718096",
                        borderRadius: "24px",
                      },
                    }}
                  >
                    <Text color="red.500" fontFamily="mono" fontSize="sm">
                      {this.state.error.toString()}
                    </Text>
                  </Box>
                )}
            </VStack>
          </Box>
        </ChakraProvider>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
