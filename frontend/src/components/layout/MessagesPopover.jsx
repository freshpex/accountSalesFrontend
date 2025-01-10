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
  Avatar,
} from "@chakra-ui/react";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { markMessageRead } from "../../app/help/redux/actions";

const MessagesPopover = ({ messages, unreadCount, onViewAll }) => {
  const dispatch = useDispatch();

  const handleMessageClick = (message) => {
    if (!message.read) {
      dispatch(markMessageRead(message._id));
    }
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            icon={<MdOutlineMail size="24px" />}
            aria-label="Messages"
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
        <PopoverHeader fontWeight="bold">Support Messages</PopoverHeader>
        <PopoverBody maxHeight="300px" overflowY="auto">
          <VStack spacing={2} align="stretch">
            {messages?.length > 0 ? (
              messages?.slice(0, 5).map((message) => (
                <Flex
                  key={message._id}
                  p={2}
                  borderRadius="md"
                  bg={message.read ? "transparent" : "blue.50"}
                  cursor="pointer"
                  onClick={() => handleMessageClick(message)}
                  align="center"
                >
                  <Avatar size="sm" name={message.from} mr={2} />
                  <Box flex={1}>
                    <Text fontSize="sm" fontWeight="bold">
                      {message.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500" noOfLines={1}>
                      {message.content}
                    </Text>
                  </Box>
                </Flex>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">
                No support messages
              </Text>
            )}
          </VStack>
        </PopoverBody>
        <PopoverFooter>
          <Button size="sm" width="full" onClick={onViewAll}>
            View All Messages
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default MessagesPopover;
