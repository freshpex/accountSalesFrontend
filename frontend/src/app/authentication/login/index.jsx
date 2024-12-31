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
  Stack,
  Text,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const success = useSelector(getSuccess);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  useEffect(() => {
    if (success) {
      toast({
        title: 'Login Successful',
        description: 'Redirecting to dashboard...',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [success, toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Validation Error',
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
    <Container maxW="md" py={12}>
      <Stack spacing={8} alignItems="center">
        {/* Logo */}
        <Stack align="center" spacing={2}>
          <Image src="/logo.svg" alt="Culters Logo" h="40px" />
        </Stack>

        {/* Sign In Form */}
        <Box w="full" p={8} borderRadius="lg" bg="white" boxShadow="sm">
          <Stack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Sign In
            </Text>
            
            {/* Google Sign In Button */}
            <Button
              w="full"
              variant="outline"
              leftIcon={<FcGoogle />}
              onClick={() => console.log('Google sign in')}
            >
              Sign in with Google
            </Button>

            <Stack direction="row" align="center" justify="center">
              <Divider />
              <Text px={2} color="gray.500">
                Or
              </Text>
              <Divider />
            </Stack>

            <FormControl>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack direction="row" justify="space-between" align="center">
              <Checkbox>Remember me?</Checkbox>
              <Link color="blue.500" href="#" fontSize="sm">
                Forgot Password?
              </Link>
            </Stack>

            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              onClick={handleSubmit}
              isLoading={loading}
              isDisabled={loading}
            >
              Sign In
            </Button>

            <Text textAlign="center">
              Do not have an account?{' '}
              <Link color="blue.500" href="/register">
                Sign Up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;