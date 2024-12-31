import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Switch,
    Text,
    VStack,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormErrorMessage,
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { userData } from '../data';
  import { useState } from 'react';
  
  const Security = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
  
    const handleTwoFactorToggle = () => {
      toast({
        title: "Two-factor authentication settings updated",
        status: "success",
        duration: 3000,
      });
    };
  
    const validatePasswordForm = () => {
      const newErrors = {};
      if (!passwordForm.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }
      if (!passwordForm.newPassword) {
        newErrors.newPassword = 'New password is required';
      }
      if (passwordForm.newPassword && passwordForm.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      return newErrors;
    };
  
    const handlePasswordChange = (e) => {
      const { name, value } = e.target;
      setPasswordForm(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };
  
    const handlePasswordUpdate = () => {
      const newErrors = validatePasswordForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      // Here you would typically make an API call to update the password
      console.log('Password update:', passwordForm);
      toast({
        title: "Password updated successfully",
        status: "success",
        duration: 3000,
      });
      onClose();
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setErrors({});
    };
  
    return (
      <Stack spacing={8}>
        <Box>
          <Heading size="md" mb={4}>Two-Factor Authentication</Heading>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Enable 2FA</Text>
              <Text color="gray.600" fontSize="sm">
                Add an extra layer of security to your account
              </Text>
            </Box>
            <Switch
              defaultChecked={userData.securitySettings.twoFactorEnabled}
              onChange={handleTwoFactorToggle}
              colorScheme="blue"
            />
          </Flex>
        </Box>
  
        <Divider />
  
        <Box>
          <Heading size="md" mb={4}>Password</Heading>
          <VStack align="stretch" spacing={4}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="medium">Change Password</Text>
                <Text color="gray.600" fontSize="sm">
                  Last changed: {userData.securitySettings.lastPasswordChange}
                </Text>
              </Box>
              <Button colorScheme="blue" variant="outline" onClick={onOpen}>
                Update Password
              </Button>
            </Flex>
          </VStack>
        </Box>
  
        <Divider />
  
        <Box>
          <Heading size="md" mb={4}>Login History</Heading>
          <VStack align="stretch" spacing={4}>
            {userData.securitySettings.loginHistory.map((login, index) => (
              <Flex key={index} justify="space-between" align="center">
                <Box>
                  <Text fontWeight="medium">{login.device}</Text>
                  <Text color="gray.600" fontSize="sm">
                    {login.location} - {login.time}
                  </Text>
                </Box>
                <Button size="sm" variant="ghost">
                  Details
                </Button>
              </Flex>
            ))}
          </VStack>
        </Box>
  
        {/* Change Password Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md", lg: "lg" }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={6}
              >
                <FormControl isInvalid={errors.currentPassword}>
                  <FormLabel>Current Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        size="sm"
                      >
                        {showCurrentPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.newPassword}>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        size="sm"
                      >
                        {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.confirmPassword}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        size="sm"
                      >
                        {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
              </Grid>
            </ModalBody>
  
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handlePasswordUpdate}>
                Update Password
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    );
  };
  
  export default Security;