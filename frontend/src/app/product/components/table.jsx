import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  HStack,
  Box,
  Text,
  Select,
  Button,
  Stack,
  useBreakpointValue,
  Flex,
  useColorModeValue,
  Tooltip,
  Tag,
  TagLabel,
  TagLeftIcon,
  Wrap,
  WrapItem,
  SimpleGrid,
  VStack,
  AspectRatio,
  Heading
} from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon, TimeIcon, CheckIcon, WarningIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { FiPackage } from 'react-icons/fi';
import EmptyStatePage from '../../../components/emptyState';
import SupabaseImage from '../../../components/SupabaseImage';
import Masonry from 'react-masonry-css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useInView } from 'react-intersection-observer';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../../app/accountSettings.jsx/redux/selector';

const MotionBox = motion(Box);

const isValidImageUrl = (str) => {
  try {
    return str.match(/\.(jpeg|jpg|gif|png)$/) != null;
  } catch (err) {
    return false;
  }
};

const StatusBadge = ({ status }) => (
  <Tag
    size="md"
    variant="subtle"
    colorScheme={
      status?.toLowerCase() === 'available' ? 'green' :
      status?.toLowerCase() === 'sold' ? 'gray' :
      'yellow'
    }
  >
    <TagLeftIcon 
      boxSize="12px" 
      as={
        status?.toLowerCase() === 'available' ? CheckIcon :
        status?.toLowerCase() === 'sold' ? TimeIcon :
        WarningIcon
      } 
    />
    <TagLabel>{status}</TagLabel>
  </Tag>
);

const Stat = ({ label, value }) => (
  <VStack align="start" spacing={1}>
    <Text fontSize="sm" color="gray.500">{label}</Text>
    <Text fontWeight="medium">{value}</Text>
  </VStack>
);

const ImageGallery = ({ images }) => {
  if (!images?.length) return null;

  return (
    <SimpleGrid columns={4} spacing={2}>
      {images.slice(0, 4).map((image, index) => (
        <AspectRatio key={index} ratio={1}>
          <LazyLoadImage
            src={image}
            effect="blur"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: '8px'
            }}
          />
        </AspectRatio>
      ))}
    </SimpleGrid>
  );
};

// Component prop types
StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

Stat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};

// Update the ImageRenderer component
const ImageRenderer = ({ images, size = { base: "100px", md: "50px" } }) => {
  if (!images) return null;
  
  const imageArray = Array.isArray(images) ? images : [images];
  
  return (
    <Wrap spacing={2}>
      {imageArray.map((imageUrl, index) => (
        imageUrl && (
          <WrapItem key={index}>
            <SupabaseImage
              src={imageUrl}
              alt={`Product ${index + 1}`}
              boxSize={size}
              objectFit="cover"
              borderRadius="md"
            />
          </WrapItem>
        )
      ))}
    </Wrap>
  );
};

const DataTable = ({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  currentPage,
  pageSize,
  onPageChange,
  viewMode
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgCard = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const isAdmin = profile?.role === 'admin';

  if (!data?.length) {
    return (
      <EmptyStatePage
        title="No Data Available"
        sub="There are no items to display"
        icon={<FiPackage size={50} />}
      />
    );
  }

  const handleSelectAll = (e) => {
    setSelectedItems(
      e.target.checked ? data.map(item => item.id) : []
    );
  };

  const handleSelectItem = (id) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter(item => item !== id)
        : [...selectedItems, id]
    );
  };

  const renderCellContent = (item, column) => {
    const value = item[column.key];

    if (column.key === 'images') {
      return <ImageRenderer images={value} />;
    }

    if (column.key === 'status') {
      return (
        <Tag
          size="md"
          variant="subtle"
          colorScheme={
            value?.toLowerCase() === 'available' ? 'green' :
            value?.toLowerCase() === 'sold' ? 'gray' :
            'yellow'
          }
        >
          <TagLeftIcon boxSize="12px" as={
            value?.toLowerCase() === 'available' ? CheckIcon :
            value?.toLowerCase() === 'sold' ? TimeIcon :
            WarningIcon
          } />
          <TagLabel>{value}</TagLabel>
        </Tag>
      );
    }

    if (value && (typeof value === 'string' || Array.isArray(value))) {
      const hasImages = Array.isArray(value) 
        ? value.some(url => isValidImageUrl(url))
        : isValidImageUrl(value);

      if (hasImages) {
        return <ImageRenderer images={value} />;
      }
    }

    if (column.key === 'engagement') {
      return <Text>{value ? `${value}%` : '0%'}</Text>;
    }

    return <Text>{value}</Text>;
  };

  const renderMobileCard = (item) => (
    <MotionBox
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      bg={bgCard}
      p={4}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
      cursor="pointer"
      onClick={(e) => {
        if (!e.defaultPrevented) {
          navigate(`/product/${item.type}/${item.id}`);
        }
      }}
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'md',
        borderColor: 'blue.400',
      }}
    >
      {/* Header section */}
      <Flex justify="space-between" align="center" mb={4} onClick={e => e.stopPropagation()}>
        <HStack spacing={3}>
          <Checkbox
            isChecked={selectedItems.includes(item.id)}
            onChange={() => handleSelectItem(item.id)}
            colorScheme="blue"
          />
          <Box>
            <Text fontWeight="bold">{item.username}</Text>
            <Text fontSize="sm" color="gray.500">{item.type}</Text>
          </Box>
        </HStack>
        <Tag
          size="md"
          variant="subtle"
          colorScheme={
            item.status?.toLowerCase() === 'available' ? 'green' :
            item.status?.toLowerCase() === 'sold' ? 'gray' :
            'yellow'
          }
        >
          <TagLabel>{item.status}</TagLabel>
        </Tag>
      </Flex>

      {/* Images section */}
      {item.images && (
        <Box mb={4}>
          <ImageRenderer images={item.images} size={{ base: "80px", sm: "100px" }} />
        </Box>
      )}

      {/* Details grid */}
      <SimpleGrid columns={2} spacing={4} mb={4}>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.500">Followers</Text>
          <Text fontWeight="medium">{item.followers}</Text>
        </VStack>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.500">Price</Text>
          <Text fontWeight="medium">{item.price}</Text>
        </VStack>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.500">Age</Text>
          <Text>{item.age}</Text>
        </VStack>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.500">Engagement</Text>
          <Text>{item.engagement}%</Text>
        </VStack>
      </SimpleGrid>

      {/* About section */}
      <Box mb={4}>
        <Text fontSize="sm" color="gray.500">About</Text>
        <Text noOfLines={2}>{item.about}</Text>
      </Box>

      {/* Action buttons */}
      <Flex justify="space-between" align="center" mt={2} onClick={e => e.stopPropagation()}>
        <HStack spacing={2}>
          <IconButton
            icon={<ViewIcon />}
            variant="ghost"
            colorScheme="blue"
            size="sm"
            onClick={() => onView(item)}
          />
          {isAdmin && (
            <>
              <IconButton
                icon={<EditIcon />}
                variant="ghost"
                colorScheme="green"
                size="sm"
                onClick={() => onEdit(item)}
              />
              <IconButton
                icon={<DeleteIcon />}
                variant="ghost"
                colorScheme="red"
                size="sm"
                onClick={() => onDelete(item)}
              />
            </>
          )}
        </HStack>
      </Flex>
    </MotionBox>
  );

  const ProductCard = ({ item }) => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });

    const swipeHandlers = useSwipeable({
      onSwipedLeft: () => onDelete(item),
      onSwipedRight: () => onEdit(item),
      preventDefaultTouchmoveEvent: true
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        whileHover={{ scale: 1.02 }}
        layoutId={item.id}
        {...swipeHandlers}
      >
        <Box
          bg={bgCard}
          borderRadius="2xl"
          overflow="hidden"
          position="relative"
        >
          {/* Hero Image */}
          <AspectRatio ratio={16/9}>
            <LazyLoadImage
              src={item.images?.[0]}
              effect="blur"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </AspectRatio>

          {/* Quick Action Overlay */}
          <HStack
            position="absolute"
            top={4}
            right={4}
            spacing={2}
          >
            <IconButton
              icon={<ViewIcon />}
              rounded="full"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(item);
              }}
            />
          </HStack>

          {/* Content */}
          <VStack p={4} align="stretch" spacing={3}>
            <Flex justify="space-between" align="center">
              <Heading size="md">{item.username}</Heading>
              <StatusBadge status={item.status} />
            </Flex>

            <SimpleGrid columns={2} spacing={4}>
              <Stat label="Followers" value={item.followers} />
              <Stat label="Engagement" value={`${item.engagement}%`} />
            </SimpleGrid>

            {/* Images Gallery */}
            <ImageGallery images={item.images} />

            {/* Footer */}
            <HStack justify="space-between" pt={2}>
              <Text fontWeight="bold" fontSize="xl">
                ₦${item.price}
              </Text>
              <Button
                variant="ghost"
                rightIcon={<ArrowForwardIcon />}
                onClick={() => onView(item)}
              >
                View Details
              </Button>
            </HStack>
          </VStack>
        </Box>
      </motion.div>
    );
  };

  // Masonry layout for grid view
  const renderMasonryGrid = () => (
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      }}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {data.map(item => (
        <ProductCard key={item.id} item={item} />
      ))}
    </Masonry>
  );

  // Render desktop table view
  const renderDesktopTable = () => (
    <Box
      position="relative" 
      overflowX="auto"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
    >
      <Table variant="simple">
        <Thead bg={bgCard}>
          <Tr>
            <Th w="40px">
              <Checkbox
                isChecked={selectedItems.length === data.length}
                isIndeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                onChange={handleSelectAll}
                colorScheme="blue"
              />
            </Th>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr
              key={item.id}
              cursor="pointer"
              _hover={{ bg: hoverBg }}
              onClick={(e) => {
                if (!e.defaultPrevented) {
                  navigate(`/product/${item.type}/${item.id}`);
                }
              }}
            >
              <Td onClick={e => e.preventDefault()}>
                <Checkbox
                  isChecked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  colorScheme="blue"
                />
              </Td>
              {columns.map((column) => (
                <Td key={column.key}>
                  {renderCellContent(item, column)}
                </Td>
              ))}
              <Td onClick={e => e.preventDefault()}>
                <HStack spacing={2}>
                  <Tooltip label="View Details">
                    <IconButton
                      icon={<ViewIcon />}
                      variant="ghost"
                      colorScheme="blue"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        onView(item);
                      }}
                    />
                  </Tooltip>
                  {isAdmin && (
                    <>
                      <Tooltip label="Edit">
                        <IconButton
                          icon={<EditIcon />}
                          variant="ghost"
                          colorScheme="green"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            onEdit(item);
                          }}
                        />
                      </Tooltip>
                      <Tooltip label="Delete">
                        <IconButton
                          icon={<DeleteIcon />}
                          variant="ghost"
                          colorScheme="red"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            onDelete(item);
                          }}
                        />
                      </Tooltip>
                    </>
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  // Update the pagination section
  const renderPagination = () => (
    <Stack
      direction={{ base: "column", sm: "row" }}
      spacing={4}
      align={{ base: "stretch", sm: "center" }}
      justify="space-between"
      p={4}
      bg={bgCard}
      borderRadius="lg"
      shadow="sm"
    >
      <Text color="gray.600" fontSize="sm" textAlign={{ base: "center", sm: "left" }}>
        Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, data.length)} of {data.length} entries
      </Text>
      <HStack spacing={2} justify={{ base: "center", sm: "flex-end" }}>
        <Button
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          leftIcon={<ChevronLeftIcon />}
          variant="outline"
          colorScheme="blue"
          w={{ base: "full", sm: "auto" }}
        >
          Previous
        </Button>
        <Select
          size="sm"
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          w={{ base: "full", sm: "70px" }}
          borderRadius="md"
        >
          {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </Select>
        <Button
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === Math.ceil(data.length / pageSize)}
          rightIcon={<ChevronRightIcon />}
          variant="outline"
          colorScheme="blue"
          w={{ base: "full", sm: "auto" }}
        >
          Next
        </Button>
      </HStack>
    </Stack>
  );

  // Main render
  return (
    <Box>
      {viewMode === 'grid' ? renderMasonryGrid() : (
        <Stack spacing={6}>
          {isMobile ? (
            <Stack spacing={4}>
              {data?.map(renderMobileCard)}
            </Stack>
          ) : (
            renderDesktopTable()
          )}

          {renderPagination()}
        </Stack>
      )}
    </Box>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string,
    [PropTypes.string]: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  })).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  getStatusColor: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired
};

export default DataTable;