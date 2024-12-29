import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { userData } from '../data';

const Notification = () => {
  const toast = useToast();

  const handleNotificationToggle = (type, setting) => {
    toast({
      title: `${type} notification settings updated`,
      status: "success",
      duration: 3000,
    });
  };

  return (
    <Stack spacing={8}>
      <Box>
        <Heading size="md" mb={4}>Email Notifications</Heading>
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">News and Updates</Text>
              <Text color="gray.600" fontSize="sm">
                Receive news about features and updates
              </Text>
            </Box>
            <Switch
              defaultChecked={userData.notificationSettings.email.newsUpdates}
              onChange={() => handleNotificationToggle('Email', 'news')}
              colorScheme="blue"
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Account Activity</Text>
              <Text color="gray.600" fontSize="sm">
                Get important notifications about your account
              </Text>
            </Box>
            <Switch
              defaultChecked={userData.notificationSettings.email.accountActivity}
              onChange={() => handleNotificationToggle('Email', 'activity')}
              colorScheme="blue"
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Promotions</Text>
              <Text color="gray.600" fontSize="sm">
                Receive promotional offers and deals
              </Text>
            </Box>
            <Switch
              defaultChecked={userData.notificationSettings.email.promotions}
              onChange={() => handleNotificationToggle('Email', 'promotions')}
              colorScheme="blue"
            />
          </Flex>
        </VStack>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={4}>Push Notifications</Heading>
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">New Messages</Text>
              <Text color="gray.600" fontSize="sm">
                Get notified when you receive new messages
              </Text>
            </Box>
            <Switch
              defaultChecked={userData.notificationSettings.push.newMessages}
              onChange={() => handleNotificationToggle('Push', 'messages')}
              colorScheme="blue"
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Mentions</Text>
              <Text color="gray.600" fontSize="sm">
                Get notified when you`re mentioned
              </Text>
            </Box>
            <Switch
              defaultChecked={userData.notificationSettings.push.mentions}
              onChange={() => handleNotificationToggle('Push', 'mentions')}
              colorScheme="blue"
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Reminders</Text>
              <Text color="gray.600" fontSize="sm">
                Get reminders about unread notifications
              </Text>
            </Box>
            <Switch
              defaultChecked={userData.notificationSettings.push.reminders}
              onChange={() => handleNotificationToggle('Push', 'reminders')}
              colorScheme="blue"
            />
          </Flex>
        </VStack>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={4}>SMS Notifications</Heading>
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Security Alerts</Text>
              <Text color="gray.600" fontSize="sm">
                Get SMS alerts for suspicious activities
              </Text>
            </Box>
            <Switch
              defaultChecked={false}
              onChange={() => handleNotificationToggle('SMS', 'security')}
              colorScheme="blue"
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Order Updates</Text>
              <Text color="gray.600" fontSize="sm">
                Receive order status updates via SMS
              </Text>
            </Box>
            <Switch
              defaultChecked={false}
              onChange={() => handleNotificationToggle('SMS', 'orders')}
              colorScheme="blue"
            />
          </Flex>
        </VStack>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={4}>Browser Notifications</Heading>
        <VStack align="stretch" spacing={4}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Desktop Alerts</Text>
              <Text color="gray.600" fontSize="sm">
                Show desktop notifications when browser is open
              </Text>
            </Box>
            <Switch
              defaultChecked={true}
              onChange={() => handleNotificationToggle('Browser', 'desktop')}
              colorScheme="blue"
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Sound Notifications</Text>
              <Text color="gray.600" fontSize="sm">
                Play a sound for important notifications
              </Text>
            </Box>
            <Switch
              defaultChecked={true}
              onChange={() => handleNotificationToggle('Browser', 'sound')}
              colorScheme="blue"
            />
          </Flex>

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">Background Notifications</Text>
              <Text color="gray.600" fontSize="sm">
                Receive notifications when browser is in background
              </Text>
            </Box>
            <Switch
              defaultChecked={false}
              onChange={() => handleNotificationToggle('Browser', 'background')}
              colorScheme="blue"
            />
          </Flex>
        </VStack>
      </Box>
    </Stack>
  );
};

export default Notification;