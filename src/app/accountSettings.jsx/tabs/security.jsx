import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FiShieldOff } from "react-icons/fi";
import EmptyStatePage from "../../../components/emptyState";
import {
  getSecuritySettings,
  getLoginHistory,
  getLoading,
} from "../redux/selector";
import {
  toggle_two_factor,
  update_password,
  fetch_login_history,
} from "../redux/reducer";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { validatePassword } from "../../../utils/validation";

const Security = () => {
  const dispatch = useDispatch();
  const securitySettings = useSelector(getSecuritySettings);
  const loginHistory = useSelector(getLoginHistory);
  const loading = useSelector(getLoading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetch_login_history());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetch_login_history());
  }, [dispatch]);

  const handleTwoFactorToggle = () => {
    if (!securitySettings.twoFactorEnabled) {
      onOpen();
    } else {
      dispatch(toggle_two_factor({ enabled: false }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    const passwordValidation = validatePassword(passwordForm.newPassword);

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordValidation.isValid) {
      newErrors.newPassword = passwordValidation.error;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePasswordUpdate = () => {
    const newErrors = validatePasswordForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(update_password(passwordForm));
    onClose();
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!securitySettings) {
    return (
      <EmptyStatePage
        title="No Security Settings"
        sub="Your security settings will appear here"
        icon={<FiShieldOff size={50} />}
      />
    );
  }

  return (
    <Stack spacing={8}>
      {/* Two-Factor Authentication */}
      <Box>
        <Heading size="md" mb={4}>
          Two-Factor Authentication
        </Heading>
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="medium">Enable 2FA</Text>
            <Text color="gray.600" fontSize="sm">
              Add an extra layer of security to your account
            </Text>
          </Box>
          <Switch
            isChecked={securitySettings.twoFactorEnabled}
            onChange={handleTwoFactorToggle}
            colorScheme="blue"
          />
        </Flex>
      </Box>

      <Divider />

      {/* Password Section */}
      <Box>
        <Heading size="md" mb={4}>
          Password
        </Heading>
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Change Password</Text>
              <Text color="gray.600" fontSize="sm">
                Last changed:{" "}
                {new Date(
                  securitySettings.lastPasswordChange,
                ).toLocaleDateString()}
              </Text>
            </Box>
            <Button colorScheme="blue" variant="outline" onClick={onOpen}>
              Update Password
            </Button>
          </Flex>
        </VStack>
      </Box>

      <Divider />

      {/* Login History */}
      <Box>
        <Heading size="md" mb={4}>
          Login History
        </Heading>
        {loginHistory.length > 0 ? (
          <VStack align="stretch" spacing={4}>
            {loginHistory.map((login, index) => (
              <Flex key={index} justify="space-between" align="center">
                <Box>
                  <Text fontWeight="medium">{login.device}</Text>
                  <Text color="gray.600" fontSize="sm">
                    {login.location} - {new Date(login.time).toLocaleString()}
                  </Text>
                </Box>
                <Button size="sm" variant="ghost">
                  Details
                </Button>
              </Flex>
            ))}
          </VStack>
        ) : (
          <EmptyStatePage
            title="No Login History"
            sub="Your recent login activities will appear here"
            icon={<FiShieldOff size={40} />}
          />
        )}
      </Box>

      {/* Change Password Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md", lg: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
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
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
