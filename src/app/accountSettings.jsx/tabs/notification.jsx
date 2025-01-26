import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Divider, Flex, Heading, Stack, Switch, Text, VStack,
} from '@chakra-ui/react';
import { getNotificationSettings, getLoading } from '../redux/selector';
import { fetch_notification_settings, toggle_notification_setting } from '../redux/reducer';
import LoadingSpinner from '../../../components/LoadingSpinner';

const NotificationToggle = ({ title, description, isChecked, onChange }) => (
  <Flex justify="space-between" align="center">
    <Box>
      <Text fontWeight="medium">{title}</Text>
      <Text color="gray.600" fontSize="sm">{description}</Text>
    </Box>
    <Switch
      isChecked={isChecked}
      onChange={onChange}
      colorScheme="blue"
    />
  </Flex>
);

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(getNotificationSettings);
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(fetch_notification_settings());
  }, [dispatch]);

  const handleNotificationToggle = (type, setting) => {
    if (!notifications) {
      console.error('Notifications settings not initialized');
      return;
    }

    const currentValue = notifications[type]?.[setting] ?? false;
    dispatch(toggle_notification_setting({ 
      type, 
      setting,
      value: !currentValue
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Initialize with default values if notifications is undefined
  const defaultNotifications = {
    email: { newsUpdates: false, accountActivity: false, promotions: false },
    push: { newMessages: false, mentions: false, reminders: false },
    sms: { security: false, orders: false },
    browser: { desktop: false, sound: false, background: false }
  };

  const notificationSettings = notifications || defaultNotifications;

  return (
    <Stack spacing={8}>
      <Box>
        <Heading size="md" mb={4}>Email Notifications</Heading>
        <VStack align="stretch" spacing={4}>
          <NotificationToggle
            title="News and Updates"
            description="Receive news about features and updates"
            isChecked={notificationSettings.email?.newsUpdates ?? false}
            onChange={() => handleNotificationToggle('email', 'newsUpdates')}
          />
          <NotificationToggle
            title="Account Activity"
            description="Get important notifications about your account"
            isChecked={notificationSettings.email?.accountActivity ?? false}
            onChange={() => handleNotificationToggle('email', 'accountActivity')}
          />
          <NotificationToggle
            title="Promotions"
            description="Receive promotional offers and deals"
            isChecked={notificationSettings.email?.promotions ?? false}
            onChange={() => handleNotificationToggle('email', 'promotions')}
          />
        </VStack>
      </Box>

      <Divider />

      {/* Push Notifications */}
      <Box>
        <Heading size="md" mb={4}>Push Notifications</Heading>
        <VStack align="stretch" spacing={4}>
        <NotificationToggle
            title="New Messages"
            description="Get notified when you receive new messages"
            isChecked={notificationSettings.push?.messages ?? false}
            onChange={() => handleNotificationToggle('push', 'messages')}
          />
          <NotificationToggle
            title="Mentions"
            description="Get notified when you're mentioned"
            isChecked={notificationSettings.push?.mentions ?? false}
            onChange={() => handleNotificationToggle('push', 'mentions')}
          />
          <NotificationToggle
            title="Reminders"
            description="Get reminders about unread notifications"
            isChecked={notificationSettings.push?.reminders ?? false}
            onChange={() => handleNotificationToggle('push', 'reminders')}
          />
        </VStack>
      </Box>

      <Divider />

      {/* SMS Notifications */}
      <Box>
        <Heading size="md" mb={4}>SMS Notifications</Heading>
        <VStack align="stretch" spacing={4}>
        <NotificationToggle
            title="Security Alerts"
            description="Get SMS alerts for suspicious activities"
            isChecked={notificationSettings.sms?.security ?? false}
            onChange={() => handleNotificationToggle('sms', 'security')}
          />
          <NotificationToggle
            title="Order Updates"
            description="Receive order status updates via SMS"
            isChecked={notificationSettings.sms?.orders ?? false}
            onChange={() => handleNotificationToggle('sms', 'orders')}
          />
        </VStack>
      </Box>

      <Divider />

      {/* Browser Notifications */}
      <Box>
        <Heading size="md" mb={4}>Browser Notifications</Heading>
        <VStack align="stretch" spacing={4}>
        <NotificationToggle
            title="Desktop Alerts"
            description="Show desktop notifications when browser is open"
            isChecked={notificationSettings.browser?.desktop ?? false}
            onChange={() => handleNotificationToggle('browser', 'desktop')}
          />
          <NotificationToggle
            title="Sound Notifications"
            description="Play a sound for important notifications"
            isChecked={notificationSettings.browser?.sound ?? false}
            onChange={() => handleNotificationToggle('browser', 'sound')}
          />
          <NotificationToggle
            title="Background Notifications"
            description="Receive notifications when browser is in background"
            isChecked={notificationSettings.browser?.background ?? false}
            onChange={() => handleNotificationToggle('browser', 'background')}
          />
        </VStack>
      </Box>
    </Stack>
  );
};

export default Notification;