import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { register_user } from './redux/reducer';
import { getLoading, getError, getSuccess } from './redux/selector';
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
  Text,
  Image,
  IconButton,
  Select,
  Checkbox,
  Grid,
  useToast,
  HStack,
  VStack,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { useColors } from '../../../utils/colors';

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const success = useSelector(getSuccess);
  const toast = useToast();
  const colors = useColors();
  const [showPassword, setShowPassword] = useState(false);
  // const bgColor = useColorModeValue("white", "gray.900");
  // const textColor = useColorModeValue("gray.600", "gray.200");
  // const activeColor = useColorModeValue("blue.50", "blue.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
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
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        businessName: formData.businessName,
        businessType: formData.businessType,
        address: formData.address,
        city: formData.city,
        country: formData.country
      };
      
      dispatch(register_user(registrationData));
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/user/auth/google`;
  };

  useEffect(() => {
    if (error) {
      toast({
        title: 'Registration Error',
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
        title: 'Registration Successful',
        description: "You'll be redirected to login shortly",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [success, toast]);

  const isMobile = useBreakpointValue({ base: true, md: false });

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
              Create your account
            </Text>
            <Text fontSize="sm" color={colors.textColor} textAlign="center">
              Join our community of business owners
            </Text>
          </VStack>
        </VStack>

        {/* Main Form Box */}
        <Box 
          w="full" 
          p={{ base: 4, md: 8 }} 
          borderRadius="2xl"
          bg={colors.bgColor}
          boxShadow="lg"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6}>
            {/* Google Sign Up Button */}
            <Button
              w="full"
              h="50px"
              variant="outline"
              leftIcon={<FcGoogle size="24px" />}
              onClick={handleGoogleSignUp}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'md'
              }}
              transition="all 0.2s"
            >
              Sign up with Google
            </Button>

            <HStack w="full">
              <Divider />
              <Text px={2} color={colors.textColor} fontSize="sm">
                Or continue with
              </Text>
              <Divider />
            </HStack>

            {/* Form Fields */}
            <VStack spacing={4} w="full">
              {/* Name Fields */}
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} w="full">
                <FormControl isRequired isInvalid={!!errors.firstName}>
                  <FormLabel fontSize="sm">First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="lg"
                  />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.lastName}>
                  <FormLabel fontSize="sm">Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="lg"
                  />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
              </Grid>

              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel fontSize="sm">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  size="lg"
                  borderRadius="lg"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.password}>
                <FormLabel fontSize="sm">Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="lg"
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
                <FormLabel fontSize="sm">Business Name</FormLabel>
                <Input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  size="lg"
                  borderRadius="lg"
                />
                <FormErrorMessage>{errors.businessName}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Business Type</FormLabel>
                <Select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  placeholder="Select business type"
                  size="lg"
                  borderRadius="lg"
                >
                  <option value="retail">Retail Store</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="service">Service Provider</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">Phone Number</FormLabel>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+62"
                  size="lg"
                  borderRadius="lg"
                />
              </FormControl>

              {/* Terms and Privacy Section */}
              <VStack spacing={4} w="full" pt={4}>
                <FormControl isInvalid={!!errors.agreeToTerms}>
                  <Flex align="start" gap={2}>
                    <Checkbox
                      name="agreeToTerms"
                      isChecked={formData.agreeToTerms}
                      onChange={handleChange}
                      size="lg"
                    />
                    <Text fontSize="sm" color={colors.textColor}>
                      I agree to the{' '}
                      <Link 
                        as={RouterLink} 
                        to="/terms" 
                        color="blue.400"
                        textDecoration="underline"
                        _hover={{ color: 'blue.500' }}
                      >
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link
                        as={RouterLink}
                        to="/privacy"
                        color="blue.400"
                        textDecoration="underline"
                        _hover={{ color: 'blue.500' }}
                      >
                        Privacy Policy
                      </Link>
                    </Text>
                  </Flex>
                  <FormErrorMessage>{errors.agreeToTerms}</FormErrorMessage>
                </FormControl>

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
                  isDisabled={!formData.agreeToTerms || loading}
                  isLoading={loading}
                  loadingText="Creating Account..."
                  fontSize="md"
                  borderRadius="xl"
                  transition="all 0.2s"
                >
                  Create Account
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </Box>

        {/* Footer */}
        <HStack justify="center" pt={4} spacing={1}>
          <Text fontSize="sm" color={colors.textColor}>
            Already have an account?
          </Text>
          <Link
            as={RouterLink}
            to="/login"
            color="blue.400"
            fontWeight="semibold"
            _hover={{ color: 'blue.500', textDecoration: 'none' }}
          >
            Sign In
          </Link>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Register;