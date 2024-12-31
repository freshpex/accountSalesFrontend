import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Container,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Instagram from './tabs/instagram';
import Facebook from './tabs/facebook';
import Twitter from './tabs/twitter';
import Whatsapp from './tabs/whatsapp';
import { tabCounts } from './data';
import { useFilters } from '../../context/FilterContext';
import { exportToCSV } from '../../utils/export';
import AddProduct from './modal/addProduct';
import { image } from 'framer-motion/client';

const Product = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { filters, updateFilters } = useFilters();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const toast = useToast();

  const handleModalOpen = (action, post = null) => {
    setModalAction(action);
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setModalAction('');
  };

  const handleSavePost = (updatedPost) => {
    const message = modalAction === 'add' ? 'Post created successfully!' : 'Post updated successfully!';
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      duration: 3000,
    });
    handleModalClose();
  };

  const handleDeletePost = (postId) => {
    toast({
      title: 'Success',
      description: 'Post deleted successfully!',
      status: 'success',
      duration: 3000,
    });
    handleModalClose();
  };

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    const tabMap = {
      'instagram': 0,
      'facebook': 1,
      'twitter': 2,
      'whatsapp': 3
    };
    setTabIndex(tabMap[path] || 0);
  }, [location]);

  const components = [Instagram, Facebook, Twitter, Whatsapp];
  const ActiveComponent = components[tabIndex];

  const handleTabChange = (index) => {
    const paths = ['instagram', 'facebook', 'twitter', 'whatsapp'];
    navigate(`/product/${paths[index]}`);
    setTabIndex(index);
  };

  const applyFilters = useCallback((data) => {
    if (!data) return [];
    
    return data.filter(item => {
      const searchLower = searchQuery?.toLowerCase() || '';
      const itemUsername = item?.username?.toLowerCase() || '';
      const itemContent = item?.about?.toLowerCase() || '';
      
      const matchesSearch = 
        itemUsername.includes(searchLower) ||
        itemContent.includes(searchLower);
      
      const matchesStatus = !filters.status || 
        (item?.status?.toLowerCase() || '') === filters.status.toLowerCase();
      
      const matchesType = !filters.type || 
        (item?.type?.toLowerCase() || '') === filters.type.toLowerCase();
      
      const matchesDate = !filters.date || 
        (item?.date && new Date(item.date) >= new Date(filters.date));
      
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [searchQuery, filters]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    updateFilters({ search: value });
  };

  const handleFilter = (type, value) => {
    updateFilters({ [type]: value });
  };

  const handleExport = () => {
    if (filteredData.length === 0) return;
    
    const currentTab = ['instagram', 'facebook', 'twitter', 'whatsapp'][tabIndex];
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${currentTab}-export-${timestamp}`;
    
    const dataToExport = filteredData.map(item => ({
      'Username': item.Username,
      'Images': item.about,
      'Type': item.type,
      'Engagement': item.status,
      'Followers': item.follower,
      'Age': item.age,
      'Status': item.status,
      'About': item.about,
      'Price': item.price,
      'images': item.images.join(', '),
      'Region': item.region,
    }));
    
    exportToCSV(dataToExport, filename);
  };

  const tabs = [
    { key: 'instagram', label: 'Instagram', count: tabCounts.instagram },
    { key: 'facebook', label: 'Facebook', count: tabCounts.facebook },
    { key: 'twitter', label: 'Twitter', count: tabCounts.twitter },
    { key: 'whatsapp', label: 'Whatsapp', count: tabCounts.whatsapp },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header */}
      <Box mb={6}>
        <Text fontSize="2xl" mb={2}>
          Product
        </Text>
        <Breadcrumb fontSize="sm" color="gray.500">
            <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">products</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      {/* Search and Actions */}
      <Flex justify="space-between" mb={6} gap={4} flexWrap="wrap">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>

        <HStack spacing={4}>
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Menu placement="right-start">
                  <MenuButton w="full">Status</MenuButton>
                </Menu>
              </MenuItem>
              <MenuItem onClick={() => handleFilter('status', 'sold')}>Sold</MenuItem>
              <MenuItem onClick={() => handleFilter('status', 'available')}>Available</MenuItem>
              <MenuItem>
                <Input
                  type="date"
                  onChange={(e) => handleFilter('date', e.target.value)}
                />
              </MenuItem>
              <MenuItem onClick={() => {
                updateFilters({
                  status: null,
                  date: null,
                  type: null
                });
                setSearchQuery('');
              }}>
                Clear All Filters
              </MenuItem>
            </MenuList>
          </Menu>

          <Button 
            onClick={handleExport} 
            leftIcon={<ChevronDownIcon />}
          >
            Export
          </Button>

          <Button colorScheme="blue" leftIcon={<ChevronDownIcon />} onClick={() => handleModalOpen('add')}>
            New Post
          </Button>
        </HStack>
      </Flex>

      {/* Tabs */}
      <Flex
        overflowX="auto"
        borderBottom="1px"
        borderColor="gray.200"
        mb={6}
        whiteSpace="nowrap"
      >
        {tabs.map((tab) => (
          <Box
            key={tab.key}
            px={4}
            py={2}
            cursor="pointer"
            borderBottom="2px"
            borderColor={tab.key === location.pathname.split('/').pop() ? 'blue.500' : 'transparent'}
            color={tab.key === location.pathname.split('/').pop() ? 'blue.500' : 'gray.600'}
            onClick={() => handleTabChange(tabs.findIndex(t => t.key === tab.key))}
          >
            {tab.label} ({tab.count})
          </Box>
        ))}
      </Flex>

      <ActiveComponent 
        searchQuery={searchQuery} 
        filters={filters}
        onDataFiltered={setFilteredData}
        applyFilters={applyFilters}
        onViewPost={(post) => handleModalOpen('view', post)}
        onEditPost={(post) => handleModalOpen('edit', post)}
        onDeletePost={(post) => handleModalOpen('delete', post)}
      />

    <AddProduct
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={selectedPost}
        action={modalAction}
        onSave={handleSavePost}
        onDelete={handleDeletePost}
      />
    </Container>
  );
};

export default Product;