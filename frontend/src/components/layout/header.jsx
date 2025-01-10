import { useEffect } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import {
  MdMenu,
  MdOutlineSearch,
} from "react-icons/md";
import { selectProfile } from "../../app/accountSettings.jsx/redux/selector";
import { logout } from "./redux/actions";
import { convertToPublicUrl } from '../../utils/supabase';
import { fetchNotifications, fetchHelpTickets } from "../../app/help/redux/actions";
import NotificationsPopover from "./NotificationsPopover";
import MessagesPopover from "./MessagesPopover";

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.200");

  const notifications = useSelector(state => state.notifications.items);
  const messages = useSelector(state => state.help.tickets);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  useEffect(() => {
    dispatch(fetchNotifications());
    dispatch(fetchHelpTickets());
  }, [dispatch]);

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
        {/* Messages Popover */}
        <MessagesPopover
          messages={messages}
          unreadCount={unreadMessages}
          onViewAll={() => navigate('/help')}
        />

        {/* Notifications Popover */}
        <NotificationsPopover
          notifications={notifications}
          unreadCount={unreadNotifications}
          onViewAll={() => navigate('/notifications')}
        />

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
