import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  Avatar,
  Divider,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { sidebarData, userData, company } from "../data";
import SidebarCloseButton from "../assets/icons/SidebarCloseButton";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.700", "white");
  const hoverColor = useColorModeValue("gray.100", "white");
  const activeColor = useColorModeValue("blue.100", "blue.800");
  const iconColor = useColorModeValue("gray.700", "white");

  const toggleCollapse = () => setCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Sidebar */}
      <Drawer isOpen={isSidebarOpen} placement="left" onClose={toggleSidebar}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <Flex align="center" justifyContent="space-between" px={4} py={4}>
            <Flex align="center">
              <Box
                as="img"
                src="https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?w=167&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7"
                alt="App Logo"
                boxSize="30px"
                mr={2}
              />
              <Text fontWeight="bold" fontSize="lg" color={textColor}>
                Culters
              </Text>
            </Flex>
          </Flex>
          <Flex
            align="center"
            px={1}
            py={1}
            mx={6}
            borderRadius="md"
            border="0.5px solid"
            color="#888888"
            mr="50%"
          >
            <Box as="img" src={company.logo} alt="Company Logo" boxSize="25px" />
            <VStack align="start" spacing={0} ml={2}>
              <Text color={textColor} fontSize="xs">
                Company
              </Text>
              <Text fontWeight="bold" fontSize="xs" color={textColor}>
                {company.name}
              </Text>
            </VStack>
          </Flex>
          <SidebarContent
            isCollapsed={isCollapsed}
            activeColor={activeColor}
            hoverColor={hoverColor}
            textColor={textColor}
            iconColor={iconColor}
          />
          <Flex align="center" px={4} py={4} mt="auto">
            <Menu>
              <MenuButton as={Flex} align="center" cursor="pointer">
                <Avatar src={userData.avatar} size="sm" mr={isCollapsed ? 0 : 3} />
                <Box>
                  <Text fontWeight="bold" color={textColor}>
                    {userData.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {userData.role}
                  </Text>
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        as="aside"
        display={{ base: "none", md: "block" }}
        w={isCollapsed ? "16" : "72"}
        h="100vh"
        bg={bgColor}
        borderRightWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        position="fixed"
        shadow="sm"
      >
        {/* Top Section */}
        <Flex align="center" justifyContent="space-between" px={4} py={4}>
          <Flex align="center">
            <Box
              as="img"
              src="https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?w=167&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7"
              alt="App Logo"
              boxSize="30px"
              mr={2}
            />
            {!isCollapsed && (
              <Text fontWeight="bold" fontSize="lg" color={textColor}>
                Culters
              </Text>
            )}
          </Flex>
          <IconButton
            icon={<SidebarCloseButton />}
            aria-label="Toggle Sidebar"
            variant="ghost"
            size="sm"
            display={{ base: "none", md: "block" }}
            onClick={toggleCollapse}
          />
        </Flex>

        {/* Company Info */}
        <Flex
          align="center"
          px={1}
          py={1}
          mx={6}
          borderRadius="md"
          border="0.5px solid"
          color="#888888"
          mr="50%"
          display={{ base: "flex", md: isCollapsed ? "none" : "flex" }}
        >
          <Box as="img" src={company.logo} alt="Company Logo" boxSize="25px" />
          <VStack align="start" spacing={0} ml={2}>
            <Text color={textColor} fontSize="xs">
              Company
            </Text>
            <Text fontWeight="bold" fontSize="xs" color={textColor}>
              {company.name}
            </Text>
          </VStack>
        </Flex>

        <Divider />

        {/* Sidebar Content */}
        <SidebarContent
          isCollapsed={isCollapsed}
          activeColor={activeColor}
          hoverColor={hoverColor}
          textColor={textColor}
          iconColor={iconColor}
        />

        <Divider />

        {/* User Info */}
        <Flex align="center" px={4} py={4} mt="auto">
          <Menu>
            <MenuButton as={Flex} align="center" cursor="pointer">
              <Avatar src={userData.avatar} size="sm" mr={isCollapsed ? 0 : 3} />
              {!isCollapsed && (
                <Box>
                  <Text fontWeight="bold" color={textColor}>
                    {userData.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {userData.role}
                  </Text>
                </Box>
              )}
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </>
  );
};

const SidebarContent = ({ isCollapsed, activeColor, hoverColor, textColor, iconColor }) => {
  const [expanded, setExpanded] = useState(null);
  const { toggleColorMode } = useColorMode();

  const toggleExpand = (index) => setExpanded(expanded === index ? null : index);

  return (
    <VStack align="start" spacing={6} px={4} py={4}>
      {sidebarData.map((section, idx) => (
        <Box key={idx} w="full">
          <Text fontSize="xs" color="gray.700" textTransform="uppercase" mb={2}>
            {section.section}
          </Text>
          {section.items.map((item, index) => (
            <Box key={index} w="full">
              <Flex
                align="center"
                py={2}
                bg={expanded === index ? activeColor : "transparent"}
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: hoverColor }}
                onClick={() => toggleExpand(index)}
              >
                <Box as={item.icon} size="24px" mr={isCollapsed ? 0 : 3} color={iconColor} />
                {!isCollapsed && (
                  <Text fontSize="sm" color={textColor}>
                    {item.title}
                  </Text>
                )}
                {item.subItems && !isCollapsed && (
                  <Box
                    as={HiOutlineChevronDown}
                    ml="auto"
                    transform={expanded === index ? "rotate(180deg)" : "rotate(0deg)"}
                    color={iconColor}
                  />
                )}
              </Flex>
              {item.subItems && expanded === index && !isCollapsed && (
                <VStack align="start" pl={6} spacing={2} borderLeft="2px" borderColor={hoverColor}>
                  {item.subItems.map((subItem, idx) => (
                    <Text key={idx} fontSize="sm" color="gray.500" >
                      {subItem.name}
                    </Text>
                  ))}
                </VStack>
              )}
            </Box>
          ))}
        </Box>
      ))}
      <Flex align="center" py={2} w="full">
        {!isCollapsed && <Text color={textColor} mr={3}>Dark Mode</Text>}
        <Switch onChange={toggleColorMode} />
      </Flex>
    </VStack>
  );
};

export default Sidebar;
