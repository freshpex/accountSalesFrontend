import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
  Divider
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import SocialMediaTab from "./components/SocialMediaTab";
import { useFilters } from "../../context/FilterContext";
import { exportToCSV } from "../../utils/export";
import AddProduct from "./modal/addProduct";
import {
  getInstagramProducts,
  getFacebookProducts,
  getTwitterProducts,
  getWhatsappProducts,
  getYoutubeProducts,
  getTiktokProducts,
  getForeignNumberProducts,
  getWhatsappNumberProducts,
  getLoading,
  getAllProducts,
} from "./redux/selector";
import {
  fetch_products,
  add_product,
  update_product,
  delete_product,
} from "./redux/reducer";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useColors } from "../../utils/colors";
import { FiInstagram, FiFacebook, FiTwitter, FiPackage } from "react-icons/fi";
import { FaWhatsapp, FaYoutube, FaTiktok, FaPhone } from "react-icons/fa";
import { CheckIcon } from "@chakra-ui/icons";
import { convertToPublicUrl } from "../../utils/supabase";
import { selectProfile } from "../../app/accountSettings.jsx/redux/selector";

const platformSelectors = {
  all: getAllProducts,
  instagram: getInstagramProducts,
  facebook: getFacebookProducts,
  twitter: getTwitterProducts,
  whatsapp: getWhatsappProducts,
  youtube: getYoutubeProducts,
  tiktok: getTiktokProducts,
  foreignnumber: getForeignNumberProducts,
  whatsappnumber: getWhatsappNumberProducts,
};

const categories = [
  { id: "all", label: "All Products", icon: FiPackage },
  { id: "instagram", label: "Instagram", icon: FiInstagram },
  { id: "facebook", label: "Facebook", icon: FiFacebook },
  { id: "twitter", label: "Twitter", icon: FiTwitter },
  { id: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
  { id: "youtube", label: "YouTube", icon: FaYoutube },
  { id: "tiktok", label: "TikTok", icon: FaTiktok },
  { id: "foreignnumber", label: "Foreign Number", icon: FaPhone },
  { id: "whatsappnumber", label: "WhatsApp Number", icon: FaWhatsapp },
];

const Product = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const profile = useSelector(selectProfile);
  const isAdmin = profile?.role === "admin";
  // const platformStats = useSelector(getPlatformStats);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const location = useLocation();
  const { filters, updateFilters } = useFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const colors = useColors();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const validCategories = useMemo(() => [
    "instagram",
    "facebook",
    "twitter",
    "whatsapp",
    "youtube",
    "tiktok",
    "foreignnumber",
    "whatsappnumber",
  ], []);

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (validCategories.includes(path)) {
      setSelectedCategory(path);
    } else {
      setSelectedCategory("all");
    }

    const tabMap = {
      all: 0,
      instagram: 1,
      facebook: 2,
      twitter: 3,
      whatsapp: 4,
      youtube: 5,
      tiktok: 6,
      foreignnumber: 7,
      whatsappnumber: 8,
    };
    setTabIndex(tabMap[path] || 0);
  }, [location.pathname, validCategories]);

  // Separate effect for navigation to avoid circular dependency
  useEffect(() => {
    if (selectedCategory) {
      navigate(`/product/${selectedCategory}`);
    }
  }, [selectedCategory, navigate]);

  useEffect(() => {
    if (selectedCategory) {
      navigate(`/product/${selectedCategory}`);
    }
  }, [selectedCategory, navigate]);

  const handleModalOpen = (action, post = null) => {
    if (post && post.images) {
      const formattedPost = {
        ...post,
        images: Array.isArray(post.images)
          ? post.images.map((img) =>
              img.startsWith("http") ? convertToPublicUrl(img) : img,
            )
          : [convertToPublicUrl(post.images)],
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
    setModalAction("");
  };

  const handleSavePost = (productData) => {
    if (modalAction === "add") {
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
    dispatch(
      fetch_products({
        platform: location.pathname.split("/").pop(),
        status: filters.status,
        page: currentPage,
        limit: pageSize,
      }),
    );
  }, [dispatch, location.pathname, filters, currentPage, pageSize]);

  const getCurrentPlatform = useCallback(() => {
    const platform = location.pathname.split("/").pop();
    return validCategories.includes(platform) ? platform : "all";
  }, [location, validCategories]);

  const applyFilters = useCallback(
    (data) => {
      if (!data) return [];

      return data.filter((item) => {
        const searchLower = searchQuery?.toLowerCase() || "";
        const itemUsername = item?.username?.toLowerCase() || "";
        const itemContent = item?.about?.toLowerCase() || "";

        const matchesSearch =
          itemUsername.includes(searchLower) ||
          itemContent.includes(searchLower);

        const matchesStatus =
          !filters.status ||
          (item?.status?.toLowerCase() || "") === filters.status.toLowerCase();

        const matchesType =
          !filters.type ||
          (item?.type?.toLowerCase() || "") === filters.type.toLowerCase();

        const matchesDate =
          !filters.date ||
          (item?.date && new Date(item.date) >= new Date(filters.date));

        return matchesSearch && matchesStatus && matchesType && matchesDate;
      });
    },
    [searchQuery, filters],
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
    updateFilters({ search: value });
  };

  const handleFilter = (type, value) => {
    updateFilters({ [type]: value });
  };

  const handleExport = () => {
    if (filteredData.length === 0) return;

    const currentTab = ["instagram", "facebook", "twitter", "whatsapp"][
      tabIndex
    ];
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `${currentTab}-export-${timestamp}`;

    const dataToExport = filteredData.map((item) => ({
      Username: item.Username,
      Images: item.about,
      Type: item.type,
      Engagement: item.status,
      Followers: item.follower,
      Age: item.age,
      Status: item.status,
      About: item.about,
      Price: item.price,
      images: item.images.join(", "),
      Region: item.region,
    }));

    exportToCSV(dataToExport, filename);
  };

  const FloatingActionButton = () =>
    isAdmin && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{
          position: "fixed",
          top: "5rem",
          right: "0.2rem",
          zIndex: 10,
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
            <MenuItem onClick={() => handleModalOpen("add")}>
              New Product
            </MenuItem>
            <MenuItem onClick={handleExport}>Export Data</MenuItem>
            <MenuItem
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              Toggle View
            </MenuItem>
          </MenuList>
        </Menu>
      </motion.div>
    );

  const CategoryChips = () => {
    return (
      <Box py={2}>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="blue"
            variant="outline"
            w={{ base: "full", md: "auto" }}
            fontWeight="medium"
            size={{ base: "sm", md: "md" }}
            borderRadius="md"
            _hover={{ bg: "blue.50" }}
          >
            {selectedCategory === "all" ? "Select Category" : 
              categories.find(cat => cat.id === selectedCategory)?.label || "Select Category"}
          </MenuButton>
          <MenuList 
            maxH="300px" 
            overflowY="auto"
            boxShadow="lg"
            p={2}
            borderRadius="md"
            bg={colors.bgColor}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <MenuItem
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  icon={<Icon size={18} />}
                  borderRadius="md"
                  mb={1}
                  bg={isSelected ? "blue.50" : "transparent"}
                  color={isSelected ? "blue.600" : colors.textColor}
                  _hover={{ bg: "blue.50", color: "blue.600" }}
                  transition="all 0.2s"
                >
                  <Flex justify="space-between" align="center" w="full">
                    <Text>{category.label}</Text>
                    {isSelected && <CheckIcon color="blue.500" boxSize={4} />}
                  </Flex>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Box>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxW="container.xl" p={0}>
       {/* Header Section */}
      <Box
        position="sticky"
        top={0}
        bg={colors.bgColor}
        zIndex={10}
        px={{ base: 2, md: 4 }}
        py={2}
        borderBottom="1px"
        borderColor={colors.borderColor}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "start", md: "center" }}
          mb={{ base: 3, md: 4 }}
          gap={{ base: 2, md: 4 }}
        >
          <Box>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
              Product
            </Text>
            <Breadcrumb fontSize="sm" color="gray.500">
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Products</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>

          {isAdmin && (
            <Button
              colorScheme="blue"
              leftIcon={<AddIcon />}
              onClick={() => handleModalOpen("add")}
              w={{ base: "full", md: "auto" }}
              size={{ base: "sm", md: "md" }}
            >
              New Product
            </Button>
          )}
        </Flex>

        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          mb={3}
          spacing={{ base: 2, md: 4 }}
        >
          <InputGroup maxW={{ base: "full", md: "400px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              bg={colors.bgColor}
              color={colors.textColor}
              size={{ base: "sm", md: "md" }}
            />
          </InputGroup>

          <Stack
            direction={{ base: "row", md: "row" }}
            spacing={2}
            w={{ base: "full", md: "auto" }}
            justify={{ base: "space-between", md: "flex-end" }}
          >
            <Menu>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />}
                size={{ base: "sm", md: "md" }}
                variant="outline"
              >
                Filter
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleFilter("status", "sold")}>
                  Sold
                </MenuItem>
                <MenuItem onClick={() => handleFilter("status", "available")}>
                  Available
                </MenuItem>
                <MenuItem>
                  <Input
                    type="date"
                    onChange={(e) => handleFilter("date", e.target.value)}
                    bg={colors.bgColor}
                    color={colors.textColor}
                    size="sm"
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    updateFilters({
                      status: null,
                      date: null,
                      type: null,
                    });
                    setSearchQuery("");
                  }}
                >
                  Clear All Filters
                </MenuItem>
              </MenuList>
            </Menu>

            <Button 
              onClick={handleExport} 
              size={{ base: "sm", md: "md" }}
              variant="outline"
            >
              Export
            </Button>
          </Stack>
        </Stack>

        <Divider my={2} />
        <CategoryChips />
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
              onViewPost={(post) => handleModalOpen("view", post)}
              onEditPost={(post) => handleModalOpen("edit", post)}
              onDeletePost={(post) => handleModalOpen("delete", post)}
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
