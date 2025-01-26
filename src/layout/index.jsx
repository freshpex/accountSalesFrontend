import { useState } from "react";
import Header from "./header";
import Sidebar from "./sideBar";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const bgColor = useColorModeValue("white", "gray.900");

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setCollapsed(!isCollapsed);

  return (
    <Box display="flex" w="100vw" h="100vh">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />
      <Box
        flex="1"
        ml={{
          base: 0,
          md: isCollapsed ? "16" : "64",
        }}
        transition="margin-left 0.2s"
      >
        <Header toggleSidebar={toggleSidebar} />
        <Box p={4} flex={1} bg={bgColor}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
