import { useState } from 'react';
import {
  Box,
  Button,
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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt:', { email, password });
  };

  return (
    <Container maxW="md" py={12}>
      <Stack spacing={8} alignItems="center">
        {/* Logo */}
        <Stack align="center" spacing={2}>
          <Image src="/logo.svg" alt="Culters Logo" h="40px" />
        </Stack>

        {/* Sign Up Form */}
        <Box w="full" p={8} borderRadius="lg" bg="white" boxShadow="sm">
          <Stack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Sign Up
            </Text>

            {/* Google Sign Up Button */}
            <Button
              w="full"
              variant="outline"
              leftIcon={<FcGoogle />}
              onClick={() => console.log('Google sign up')}
            >
              Sign up with Google
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

            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>

            <Text textAlign="center">
              Already have an account?{' '}
              <Link color="blue.500" href="/login">
                Sign In
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;