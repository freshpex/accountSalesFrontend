import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  IconButton,
  Badge,
  Box,
  Button,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { MdOutlineNotifications } from "react-icons/md";
import { useDispatch } from "react-redux";
import { markNotificationRead } from "../../app/help/redux/actions";

const NotificationsPopover = ({ notifications, unreadCount, onViewAll }) => {
  const dispatch = useDispatch();

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      dispatch(markNotificationRead(notification._id));
    }
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            icon={<MdOutlineNotifications size="24px" />}
            aria-label="Notifications"
            variant="ghost"
          />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              fontSize="0.7em"
              colorScheme="red"
              borderRadius="full"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent width="300px">
        <PopoverHeader fontWeight="bold">Notifications</PopoverHeader>
        <PopoverBody maxHeight="300px" overflowY="auto">
          <VStack spacing={2} align="stretch">
            {notifications?.length > 0 ? (
              notifications?.slice(0, 5).map((notification) => (
                <Flex
                  key={notification._id}
                  p={2}
                  borderRadius="md"
                  bg={notification.read ? "transparent" : "blue.50"}
                  cursor="pointer"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <Text fontSize="sm">{notification.message}</Text>
                </Flex>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">
                No notifications
              </Text>
            )}
          </VStack>
        </PopoverBody>
        <PopoverFooter>
          <Button size="sm" width="full" onClick={onViewAll}>
            View All Notifications
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
