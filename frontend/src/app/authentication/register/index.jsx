import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  Image,
  IconButton,
  Select,
  Checkbox,
  Grid,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    businessName: '',
    businessType: '',
    address: '',
    city: '',
    country: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeToTerms' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log('Registration data:', formData);
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Stack spacing={8} alignItems="center">
        <Stack align="center" spacing={2}>
          <Image src="/logo.svg" alt="Logo" h="40px" />
          <Text fontSize="2xl" fontWeight="bold">Create your account</Text>
        </Stack>

        <Box w="full" p={8} borderRadius="lg" bg="white" boxShadow="sm">
          <Stack spacing={4}>
            <Button
              w="full"
              variant="outline"
              leftIcon={<FcGoogle />}
              onClick={() => console.log('Google sign up')}
            >
              Sign up with Google
            </Button>

            <Stack direction="row" align="center">
              <Divider />
              <Text px={2} color="gray.500">Or</Text>
              <Divider />
            </Stack>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl isRequired isInvalid={!!errors.firstName}>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
            </Grid>

            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
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
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.businessName}>
              <FormLabel>Business Name</FormLabel>
              <Input
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.businessName}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Business Type</FormLabel>
              <Select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                placeholder="Select business type"
              >
                <option value="retail">Retail Store</option>
                <option value="wholesale">Wholesale</option>
                <option value="service">Service Provider</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+62"
              />
            </FormControl>

            <FormControl isInvalid={!!errors.agreeToTerms}>
              <Checkbox
                name="agreeToTerms"
                isChecked={formData.agreeToTerms}
                onChange={handleChange}
              >
                I agree to the Terms of Service and Privacy Policy
              </Checkbox>
              <FormErrorMessage>{errors.agreeToTerms}</FormErrorMessage>
            </FormControl>

            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              onClick={handleSubmit}
              isDisabled={!formData.agreeToTerms}
            >
              Create Account
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