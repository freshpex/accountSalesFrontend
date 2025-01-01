import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  Avatar,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { sidebarData, company } from "./data";
import SidebarCloseButton from "../../assets/icons/SidebarCloseButton";
import { selectProfile } from "../../app/accountSettings.jsx/redux/selector";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const profile = useSelector(selectProfile);
  const [isCollapsed, setCollapsed] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const activeColor = useColorModeValue("blue.50", "blue.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const toggleCollapse = () => setCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer isOpen={isSidebarOpen} placement="left" onClose={toggleSidebar}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <VStack align="stretch" w="full">
            {/* Logo Section for Mobile */}
            <Flex align="center" p={4}>
              <Box
                as="img"
                src="/logo.svg"
                alt="Culters"
                h="6"
                w="auto"
                mr={2}
              />
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                Culters
              </Text>
            </Flex>

            {/* Company Section for Mobile */}
            <Flex
              mx={4}
              p={2}
              borderRadius="md"
              border="1px"
              borderColor={borderColor}
              align="center"
              mb={4}
            >
              <Box
                as="img"
                src={company.logo}
                alt={company.name}
                boxSize="6"
                mr={2}
              />
              <Box>
                <Text fontSize="xs" color={textColor}>
                  Company
                </Text>
                <Text fontSize="sm" fontWeight="medium" color={textColor}>
                  {company.name}
                </Text>
              </Box>
            </Flex>

            <SidebarContent
              isCollapsed={false}
              activeColor={activeColor}
              textColor={textColor}
            />
          </VStack>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        as="aside"
        display={{ base: "none", md: "block" }}
        w={isCollapsed ? "16" : "64"}
        h="100vh"
        bg={bgColor}
        borderRight="1px"
        borderColor={borderColor}
        position="fixed"
        transition="width 0.2s"
      >
        {/* Logo Section */}
        <Flex align="center" justify="space-between" p={4}>
          <Flex align="center" gap={2}>
            <Box
              as="img"
              src="/logo.svg"
              alt="Culters"
              h="6"
              w="auto"
            />
            {!isCollapsed && (
              <Text fontSize="lg" fontWeight="bold">
                Culters
              </Text>
            )}
          </Flex>
          <IconButton
            icon={<SidebarCloseButton />}
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
          />
        </Flex>

        {/* Company Section */}
        {!isCollapsed && (
          <Flex
            mx={4}
            p={2}
            borderRadius="md"
            border="1px"
            borderColor={borderColor}
            align="center"
            mb={4}
          >
            <Box
              as="img"
              src={company.logo}
              alt={company.name}
              boxSize="6"
              mr={2}
            />
            <Box>
              <Text fontSize="xs" color={textColor}>
                Company
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {company.name}
              </Text>
            </Box>
          </Flex>
        )}

        {/* Navigation */}
        <SidebarContent
          isCollapsed={isCollapsed}
          activeColor={activeColor}
          textColor={textColor}
        />

        {/* User Section */}
        <Box position="absolute" bottom="0" w="full" p={4}>
          <Flex alignItems="center" mb={4}>
            {!isCollapsed && (
              <Text flex="1" color={textColor} fontSize="sm">
                Dark Mode
              </Text>
            )}
            <Switch
              size="sm"
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
          </Flex>

          <Menu>
            <MenuButton w="full">
              <Flex align="center" gap={3}>
                <Avatar
                  src={profile?.profilePicture || "https://via.placeholder.com/150"}
                  name={profile?.name || "User"}
                  size="sm"
                />
                {!isCollapsed && (
                  <Box flex="1" textAlign="left">
                    <Text fontSize="sm" color="gray.700">
                      {profile?.name || "User"}
                    </Text>
                    <Text fontSize="xs" color={textColor}>
                      {profile?.role || "Role"}
                    </Text>
                  </Box>
                )}
                {!isCollapsed && <ChevronDownIcon />}
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

const SidebarContent = ({ isCollapsed, activeColor, textColor }) => {
  const [expandedSection, setExpandedSection] = useState("Product");
  const navigate = useNavigate();

  const handleSectionClick = (title, route) => {
    setExpandedSection(expandedSection === title ? null : title);
    if (route) {
      // If it's the main product route, navigate to default tab
      if (route === '/product') {
        navigate('/product/instagram');
      } else {
        navigate(route);
      }
    }
  };

  return (
    <VStack align="stretch" spacing={1} px={2}>
      {sidebarData.map((section) => (
        <Box key={section.section}>
          {!isCollapsed && (
            <Text
              px={2}
              py={1}
              fontSize="xs"
              fontWeight="medium"
              color={textColor}
              textTransform="uppercase"
            >
              {section.section}
            </Text>
          )}
          {section.items.map((item) => (
            <Box key={item.title}>
              <Flex
                align="center"
                px={2}
                py={2}
                cursor="pointer"
                borderRadius="md"
                bg={expandedSection === item.title ? activeColor : "transparent"}
                _hover={{ bg: activeColor }}
                onClick={() => handleSectionClick(item.title, item.route)}
              >
                <Box as={item.icon} fontSize="20px" color={textColor} />
                {!isCollapsed && (
                  <>
                    <Text ml={3} flex="1" fontSize="sm">
                      {item.title}
                    </Text>
                    {item.subItems && (
                      <ChevronDownIcon
                        transform={
                          expandedSection === item.title
                            ? "rotate(180deg)"
                            : "rotate(0deg)"
                        }
                        transition="transform 0.2s"
                      />
                    )}
                  </>
                )}
              </Flex>
              {!isCollapsed && expandedSection === item.title && item.subItems && (
                <VStack align="stretch" ml={8} mt={1} spacing={1}>
                  {item.subItems.map((subItem) => (
                    <Text
                      key={subItem.name}
                      fontSize="sm"
                      color={textColor}
                      py={1}
                      _hover={{ color: "blue.500" }}
                      cursor="pointer"
                      onClick={() => navigate(subItem.route)}
                    >
                      {subItem.name}
                    </Text>
                  ))}
                </VStack>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </VStack>
  );
};

export default Sidebar;