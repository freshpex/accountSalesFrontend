import { useState, useEffect } from "react";
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
  MenuDivider,
  VStack,
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
import { format } from 'date-fns';
import { getUnreadNotifications, getTickets } from "../../app/help/redux/selector";
import { fetch_tickets, mark_notification_read } from "../../app/help/redux/reducer";

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.200");

  const notifications = useSelector(getUnreadNotifications);
  const tickets = useSelector(getTickets);
  const unreadMessages = tickets?.filter(t => t.status === 'open').length;

  useEffect(() => {
    dispatch(fetch_tickets());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNotificationClick = (notificationId) => {
    dispatch(mark_notification_read(notificationId));
  };

  const renderNotificationItem = (notification) => (
    <MenuItem 
      key={notification._id} 
      onClick={() => handleNotificationClick(notification._id)}
    >
      <VStack align="start" spacing={1}>
        <Text fontWeight="medium">{notification.title}</Text>
        <Text fontSize="sm" color="gray.500">{notification.message}</Text>
        <Text fontSize="xs" color="gray.400">
          {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
        </Text>
      </VStack>
    </MenuItem>
  );

  const renderMessageItem = (ticket) => (
    <MenuItem key={ticket._id} onClick={() => navigate(`/help?ticket=${ticket._id}`)}>
      <VStack align="start" spacing={1}>
        <Text fontWeight="medium">{ticket.subject}</Text>
        <Text fontSize="sm" color="gray.500" noOfLines={1}>
          {ticket.message}
        </Text>
        <Text fontSize="xs" color="gray.400">
          Status: {ticket.status}
        </Text>
      </VStack>
    </MenuItem>
  );

  const profilePicture = profile?.profilePicture ? 
    convertToPublicUrl(profile.profilePicture) : 
    "https://via.placeholder.com/150";

  return (
    <Flex
      px={8}
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
      <HStack spacing={1}>
        {/* Messages Menu */}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={
              <Box position="relative">
                <MdOutlineMail size="24px" />
                {unreadMessages > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    fontSize="0.7em"
                    colorScheme="red"
                    borderRadius="full"
                  >
                    {unreadMessages}
                  </Badge>
                )}
              </Box>
            }
            variant="ghost"
            aria-label="Messages"
          />
          <MenuList w="350px">
            {tickets?.slice(0, 5).map(renderMessageItem)}
            <MenuDivider />
            <MenuItem onClick={() => navigate('/help')} color="blue.400">
              View All Messages
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Notifications Menu */}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={
              <Box position="relative">
                <MdOutlineNotifications size="24px" />
                {notifications.length > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    fontSize="0.7em"
                    colorScheme="red"
                    borderRadius="full"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Box>
            }
            variant="ghost"
            aria-label="Notifications"
          />
          <MenuList w="350px">
            {notifications.length === 0 ? (
              <MenuItem isDisabled>No new notifications</MenuItem>
            ) : (
              <>
                {notifications.slice(0, 5).map(renderNotificationItem)}
                {notifications.length > 5 && (
                  <>
                    <MenuDivider />
                    <MenuItem onClick={() => navigate('/help?tab=notifications')} color="blue.400">
                      View All Notifications
                    </MenuItem>
                  </>
                )}
              </>
            )}
          </MenuList>
        </Menu>

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
