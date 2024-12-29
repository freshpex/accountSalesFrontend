import { useState } from "react";
import {
  Flex,
  IconButton,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  HStack,
  Box,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import {
  MdMenu,
  MdOutlineNotifications,
  MdOutlineMail,
  MdOutlineSearch,
} from "react-icons/md";
import { userData } from "../data";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const bgColor = useColorModeValue("white", "gray.100");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Dummy data for notifications and messages
  const [notifications] = useState(3);
  const [messages] = useState(5);

  return (
    <Flex
      px={4}
      py={2}
      align="center"
      justify="space-between"
    >
      {/* Sidebar Toggle Button */}
      <IconButton
        icon={<MdMenu />}
        aria-label="Toggle Sidebar"
        display={{ base: "block", md: "none" }}
        onClick={toggleSidebar}
        variant="ghost"
      />

      {/* Search Bar */}
      <InputGroup w="300px" display={{ base: "none", md: "flex" }}>
        <InputLeftElement pointerEvents="none">
          <MdOutlineSearch color={textColor} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search product"
          borderRadius="md"
          bg="white"
          color={textColor}
          _placeholder={{ color: textColor }}
          focusBorderColor="blue.400"
        />
      </InputGroup>

      {/* Icons & User Section */}
      <HStack>
        {/* Message Icon */}
        <Box position="relative">
          <IconButton
            icon={<MdOutlineMail size="24px" />}
            aria-label="Messages"
            variant="ghost"
          />
          {messages > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              fontSize="0.7em"
              colorScheme="red"
              borderRadius="full"
            >
              {messages}
            </Badge>
          )}
        </Box>

        {/* Notification Icon */}
        <Box position="relative">
          <IconButton
            icon={<MdOutlineNotifications size="24px" />}
            aria-label="Notifications"
            variant="ghost"
          />
          {notifications > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              fontSize="0.7em"
              colorScheme="red"
              borderRadius="full"
            >
              {notifications}
            </Badge>
          )}
        </Box>

        {/* User Avatar */}
        <Menu>
          <MenuButton>
            <Flex align="center">
              <Avatar borderRadius="10px" name={userData.name} src={userData.avatar} size="md" />
              <Box ml={2} display={{ base: "none", md: "block" }}>
                <Text fontSize="sm" fontWeight="bold">
                  {userData.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {userData.role}
                </Text>
              </Box>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
