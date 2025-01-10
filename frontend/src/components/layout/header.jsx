import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { logout } from "./redux/actions";
import { convertToPublicUrl } from '../../utils/supabase';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.200");

  // Dummy data for notifications and messages
  const [notifications] = useState(3);
  const [messages] = useState(5);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const profilePicture = profile?.profilePicture ? 
    convertToPublicUrl(profile.profilePicture) : 
    "https://via.placeholder.com/150";

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
                name={`${profile?.firstName} ${profile?.lastName}` || "User"}
                src={profilePicture}
                size="sm"
              />
              <Box ml={2} display={{ base: "none", md: "block" }}>
                <Text fontSize="sm" color="gray.700">
                  {`${profile?.firstName} ${profile?.lastName}` || "User"}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {profile?.role || "Role"}
                </Text>
              </Box>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate('/settings')}>Profile</MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
