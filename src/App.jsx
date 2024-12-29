import { useState } from 'react';
import './App.css';
import Header from './layout/header';
import Sidebar from './layout/sideBar';
import 
{ 
  Box,
  VStack,
  HStack,
 } from '@chakra-ui/react';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Box display="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box flex="1" ml={{ base: 0, md: isSidebarOpen ? "72" : "72" }}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Box p={4}>
          {/* Your main content goes here */}
          Your main content goes here
        </Box>
      </Box>
    </Box>
  );
}

export default App;
