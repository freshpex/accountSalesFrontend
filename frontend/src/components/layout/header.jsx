import { useState } from "react";
import { useSelector } from "react-redux";
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
import { selectProfile } from "../../app/accountSettings.jsx/redux/selector";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const profile = useSelector(selectProfile);
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const activeColor = useColorModeValue("blue.50", "blue.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

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
          bg={bgColor}
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
            <Flex align="center" textAlign="right">
              <Avatar
                borderRadius="10px"
                name={profile?.name || "User"}
                src={profile?.profilePicture || "https://via.placeholder.com/150"}
                size="sm"
              />
              <Box ml={2} display={{ base: "none", md: "block" }}>
                <Text fontSize="sm" color="gray.700">
                  {profile?.name || "User"}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {profile?.role || "Role"}
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
