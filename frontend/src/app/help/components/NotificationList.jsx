import {
  VStack,
  Box,
  Flex,
  HStack,
  Text,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { EmailIcon, BellIcon } from '@chakra-ui/icons';
import { useColors } from '../../../utils/colors';

const NotificationList = ({ notifications, onNotificationRead }) => {
  const handleClick = (notification) => {
    if (!notification.read) {
      onNotificationRead(notification.id);
    }
  };

  const colors = useColors();

  return (
    <VStack spacing={4} align="stretch">
      {notifications.map((notification) => (
        <Box
          key={notification.id}
          p={4}
          borderWidth={1}
          borderRadius="lg"
          bg={notification.read ? colors.bgColor : colors.activeColor}
          cursor="pointer"
          onClick={() => handleClick(notification)}
          _hover={{ shadow: "sm" }}
          color={colors.textColor}
        >
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Icon
                as={notification.type === 'ticket' ? EmailIcon : BellIcon}
                boxSize={5}
                color={notification.type === 'ticket' ? "blue.500" : "purple.500"}
              />
              <Box>
                <Text>{notification.message}</Text>
                <Text color="gray.600" fontSize="sm">
                  {new Date(notification.timestamp).toLocaleString()}
                </Text>
              </Box>
            </HStack>
            {!notification.read && (
              <Badge colorScheme="blue">New</Badge>
            )}
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default NotificationList;
