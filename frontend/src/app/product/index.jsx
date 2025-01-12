import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
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
  Stack,
  IconButton,
  Tag,
  SimpleGrid,
  useBreakpointValue,
  TagLabel,
  TagRightIcon,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import SocialMediaTab from './components/SocialMediaTab';
import { useFilters } from '../../context/FilterContext';
import { exportToCSV } from '../../utils/export';
import AddProduct from './modal/addProduct';
import {
  getInstagramProducts,
  getFacebookProducts,
  getTwitterProducts,
  getWhatsappProducts,
  getLoading,
  getAllProducts
} from './redux/selector';
import {
  fetch_products,
  add_product,
  update_product,
  delete_product
} from './redux/reducer';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useColors } from '../../utils/colors';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { CheckIcon } from '@chakra-ui/icons';
import { convertToPublicUrl } from '../../utils/supabase';

const platformSelectors = {
  all: getAllProducts,
  instagram: getInstagramProducts,
  facebook: getFacebookProducts,
  twitter: getTwitterProducts,
  whatsapp: getWhatsappProducts
};

const categories = [
  // { id: 'all', label: 'All', icon: null },
  { id: 'instagram', label: 'Instagram', icon: FiInstagram },
  { id: 'facebook', label: 'Facebook', icon: FiFacebook },
  { id: 'twitter', label: 'Twitter', icon: FiTwitter },
  { id: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp },
  // { id: 'popular', label: 'Popular', icon: null },
  // { id: 'recent', label: 'Recent', icon: null },
  // { id: 'trending', label: 'Trending', icon: null },
];

const Product = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  // const platformStats = useSelector(getPlatformStats);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const { filters, updateFilters } = useFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const colors = useColors();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === 'all') {
        navigate(`/product/all`);
      } else if (['instagram', 'facebook', 'twitter', 'whatsapp'].includes(selectedCategory)) {
        selectedCategory === selectedCategory; 
        navigate(`/product/${selectedCategory}`);
      }
    }
  }, [selectedCategory, updateFilters, navigate]);

  const handleModalOpen = (action, post = null) => {
    if (post && post.images) {
      const formattedPost = {
        ...post,
        images: Array.isArray(post.images) 
          ? post.images.map(img => img.startsWith('http') ? convertToPublicUrl(img) : img)
          : [convertToPublicUrl(post.images)]
      };
      setSelectedPost(formattedPost);
    } else {
      setSelectedPost(post);
    }
    
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setModalAction('');
  };

  const handleSavePost = (productData) => {
    if (modalAction === 'add') {
      dispatch(add_product(productData));
    } else {
      dispatch(update_product({ id: selectedPost.id, data: productData }));
    }
    handleModalClose();
  };

  const handleDeletePost = (productId) => {
    dispatch(delete_product(productId));
    handleModalClose();
  };

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    const validCategories = ['all', 'instagram', 'facebook', 'twitter', 'whatsapp'];
    
    if (validCategories.includes(path)) {
      setSelectedCategory(path);
    } else {
      setSelectedCategory('all');
    }

    const tabMap = {
      'instagram': 0,
      'facebook': 1,
      'twitter': 2,
      'whatsapp': 3
    };
    setTabIndex(tabMap[path] || 0);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetch_products({
      platform: location.pathname.split('/').pop(),
      status: filters.status,
      page: currentPage,
      limit: pageSize
    }));
  }, [dispatch, location.pathname, filters, currentPage, pageSize]);

  const getCurrentPlatform = () => {
    const platform = location.pathname.split('/').pop();
    return platform === 'all' ? 'all' : platform;
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


  const FloatingActionButton = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 10
      }}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<AddIcon />}
          colorScheme="blue"
          rounded="full"
          w="60px"
          h="60px"
          shadow="lg"
        />
        <MenuList>
          <MenuItem onClick={() => handleModalOpen('add')}>New Product</MenuItem>
          <MenuItem onClick={handleExport}>Export Data</MenuItem>
          <MenuItem onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            Toggle View
          </MenuItem>
        </MenuList>
      </Menu>
    </motion.div>
  );

  const CategoryChips = () => {
    const columns = useBreakpointValue({ base: 2, sm: 3, md: 8 });
    
    return (
      <Box overflowX={{ base: 'hidden', md: 'auto' }} py={2}>
        <SimpleGrid 
          columns={columns}
          spacing={2}
          mx={{ base: -2, md: 0 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Tag
                key={category.id}
                size="lg"
                variant={selectedCategory === category.id ? "solid" : "outline"}
                colorScheme="blue"
                cursor="pointer"
                onClick={() => setSelectedCategory(category.id)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                px={3}
                py={2}
                borderRadius="full"
                whiteSpace="nowrap"
                transition="all 0.2s"
                _hover={{
                  bg: 'blue.50',
                  color: 'blue.600'
                }}
              >
                {Icon && <Icon size={16} style={{ marginRight: '8px' }} />}
                <TagLabel>{category.label}</TagLabel>
                {selectedCategory === category.id && (
                  <TagRightIcon as={CheckIcon} color="currentColor" />
                )}
              </Tag>
            );
          })}
        </SimpleGrid>
      </Box>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container 
      maxW="container.xl" 
      p={0}
    >
      {/* Header Section */}
      <Box 
        position="sticky" 
        top={0} 
        bg={colors.bgColor} 
        zIndex={10}
        px={4}
        py={2}
        borderBottom="1px"
        borderColor={colors.borderColor}
      >
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align={{ base: "start", md: "center" }}
          mb={6}
          gap={4}
        >
          <Box>
            <Text fontSize={{ base: "xl", md: "2xl" }} mb={2}>
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

          <Button 
            colorScheme="blue" 
            leftIcon={<ChevronDownIcon />} 
            onClick={() => handleModalOpen('add')}
            w={{ base: "full", md: "auto" }}
          >
            New Post
          </Button>
        </Flex>

        <Stack 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          mb={6} 
          spacing={4}
        >
          <InputGroup maxW={{ base: "full", md: "400px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              bg={colors.bgColor}
              color={colors.textColor}
            />
          </InputGroup>

          <Stack 
            direction={{ base: "column", md: "row" }} 
            spacing={4} 
            w={{ base: "full", md: "auto" }}
          >
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
                    bg={colors.bgColor}
                    color={colors.textColor}
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
              w={{ base: "full", md: "auto" }}
            >
              Export
            </Button>
          </Stack>
        </Stack>

        <Box 
          px={4} 
          pb={2}
          bg={colors.bgColor}
          borderBottom="1px"
          borderColor={colors.borderColor}
        >
          <CategoryChips />
        </Box>
      </Box>

      <Box px={4}>
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SocialMediaTab
              platform={getCurrentPlatform()}
              searchQuery={searchQuery}
              filters={filters}
              onDataFiltered={setFilteredData}
              applyFilters={applyFilters}
              onViewPost={(post) => handleModalOpen('view', post)}
              onEditPost={(post) => handleModalOpen('edit', post)}
              onDeletePost={(post) => handleModalOpen('delete', post)}
              getProducts={platformSelectors[getCurrentPlatform()]}
              getLoading={getLoading}
              viewMode={viewMode}
            />
          </motion.div>
        </AnimatePresence>
      </Box>

      <FloatingActionButton />

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