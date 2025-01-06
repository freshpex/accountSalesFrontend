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
    dispatch(toggle_notification_setting({ 
      type, 
      setting,
      value: !notifications[type][setting]
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack spacing={8}>
      <Box>
        <Heading size="md" mb={4}>Email Notifications</Heading>
        <VStack align="stretch" spacing={4}>
          <NotificationToggle
            title="News and Updates"
            description="Receive news about features and updates"
            isChecked={notifications.email.newsUpdates}
            onChange={() => handleNotificationToggle('email', 'newsUpdates')}
          />
          <NotificationToggle
            title="Account Activity"
            description="Get important notifications about your account"
            isChecked={notifications.email.accountActivity}
            onChange={() => handleNotificationToggle('email', 'accountActivity')}
          />
          <NotificationToggle
            title="Promotions"
            description="Receive promotional offers and deals"
            isChecked={notifications.email.promotions}
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
            isChecked={notifications.push.messages}
            onChange={() => handleNotificationToggle('push', 'messages')}
          />
          <NotificationToggle
            title="Mentions"
            description="Get notified when you're mentioned"
            isChecked={notifications.push.mentions}
            onChange={() => handleNotificationToggle('push', 'mentions')}
          />
          <NotificationToggle
            title="Reminders"
            description="Get reminders about unread notifications"
            isChecked={notifications.push.reminders}
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
            isChecked={notifications.sms.security}
            onChange={() => handleNotificationToggle('sms', 'security')}
          />
          <NotificationToggle
            title="Order Updates"
            description="Receive order status updates via SMS"
            isChecked={notifications.sms.orders}
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
            isChecked={notifications.browser.desktop}
            onChange={() => handleNotificationToggle('browser', 'desktop')}
          />
          <NotificationToggle
            title="Sound Notifications"
            description="Play a sound for important notifications"
            isChecked={notifications.browser.sound}
            onChange={() => handleNotificationToggle('browser', 'sound')}
          />
          <NotificationToggle
            title="Background Notifications"
            description="Receive notifications when browser is in background"
            isChecked={notifications.browser.background}
            onChange={() => handleNotificationToggle('browser', 'background')}
          />
        </VStack>
      </Box>
    </Stack>
  );
};

export default Notification;