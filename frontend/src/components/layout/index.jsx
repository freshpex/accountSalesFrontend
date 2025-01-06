import {useState} from 'react';
import Header from './header';
import Sidebar from './sideBar';
import { Box} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Box display="flex" spacing={0} w="100vw" h="100vh">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box flex="1" align="stretch" ml={{ base: 0, md: isSidebarOpen ? "72" : "72" }}>
        <Header toggleSidebar={toggleSidebar} />
        <Box p={4} flex={1} bg="gray.50">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;