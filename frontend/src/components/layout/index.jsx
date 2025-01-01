import { useSelector, useDispatch } from 'react-redux';
import { selectIsSidebarOpen } from './redux/selector';
import { toggleSidebar } from './redux/actions';
import Header from './header';
import Sidebar from './sideBar';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Box display="flex" spacing={0} w="100vw" h="100vh">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
      <Box flex="1" align="stretch" ml={{ base: 0, md: isSidebarOpen ? "72" : "72" }}>
        <Header toggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Box p={4} flex={1} bg="gray.50">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;