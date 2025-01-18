import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login_user } from './redux/reducer';
import { getLoading, getError, getSuccess } from './redux/selector';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  Image,
  IconButton,
  useToast,
  useBreakpointValue,
  VStack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { Link as RouterLink } from 'react-router-dom';
import { useColors } from '../../../utils/colors';

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const success = useSelector(getSuccess);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colors = useColors();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleGoogleSignIn = () => {
    const backendUrl = import.meta.env.VITE_API_URL;
    // Ensure we're using the full backend URL for Google auth
    window.location.href = `${backendUrl}/user/auth/google`;
  };

  useEffect(() => {
    if (error) {
      toast({
        title: 'Login Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    dispatch(login_user({ email, password }));
  };

  return (
    <Container maxW="md" py={{ base: 4, md: 12 }} px={{ base: 4, md: 6 }}>
      <VStack spacing={6} align="stretch">
        {/* Logo & Title Section */}
        <VStack spacing={3} align="center">
          <Box 
            position="relative" 
            w="full" 
            h={{ base: "80px", md: "100px" }}
            display="flex"
            justifyContent="center"
          >
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              h="full"
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <VStack spacing={2}>
            <Text 
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Welcome Back
            </Text>
            <Text fontSize="sm" color={colors.textColor} textAlign="center">
              Sign in to continue to your account
            </Text>
          </VStack>
        </VStack>

        {/* Main Form Box */}
        <Box 
          w="full" 
          p={{ base: 6, md: 8 }} 
          borderRadius="2xl"
          bg={colors.bgColor}
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6}>
            {/* Google Sign In Button */}
            <Button
              w="full"
              h="50px"
              variant="outline"
              leftIcon={<FcGoogle size="24px" />}
              onClick={handleGoogleSignIn}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'md'
              }}
              transition="all 0.2s"
            >
              Sign in with Google
            </Button>

            <HStack w="full">
              <Divider />
              <Text px={2} color={colors.textColor} fontSize="sm">
                Or
              </Text>
              <Divider />
            </HStack>

            <VStack spacing={4} w="full">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl>
                <InputGroup size="lg">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    borderRadius="lg"
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <HStack justify="space-between" w="full" py={2}>
                <Checkbox size="sm">Remember me</Checkbox>
                <Link 
                  as={RouterLink} 
                  to="/forgot-password" 
                  color="blue.400"
                  fontSize="sm"
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                >
                  Forgot Password?
                </Link>
              </HStack>

              <Button
                w="full"
                h="50px"
                bg="blue.500"
                color="white"
                _hover={{
                  bg: 'blue.600',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg'
                }}
                onClick={handleSubmit}
                isLoading={loading}
                isDisabled={loading}
                fontSize="md"
                borderRadius="xl"
                transition="all 0.2s"
              >
                Sign In
              </Button>
            </VStack>
          </VStack>
        </Box>

        {/* Footer */}
        <HStack justify="center" pt={4} spacing={1}>
          <Text fontSize="sm" color={colors.textColor}>
            Don`t have an account?
          </Text>
          <Link
            as={RouterLink}
            to="/register"
            color="blue.400"
            fontWeight="semibold"
            _hover={{ color: 'blue.500', textDecoration: 'none' }}
          >
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Login;