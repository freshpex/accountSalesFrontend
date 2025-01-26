import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Badge } from '@chakra-ui/react';
import { FaWhatsapp, FaYoutube, FaTiktok, FaPhone } from 'react-icons/fa';
import { FiInstagram, FiTwitter, FiFacebook, FiPackage } from 'react-icons/fi';
import DataTable from './table';
import EmptyStatePage from '../../../components/emptyState';
import LoadingSpinner from '../../../components/LoadingSpinner';

const platformConfig = {
  all: {
    icon: FiPackage,
    color: '#718096',
    title: 'All Products',
    subtitle: 'View all your products in one place'
  },
  instagram: {
    icon: FiInstagram,
    color: '#E1306C',
    title: 'Instagram Products',
    subtitle: 'Start by adding your first Instagram product'
  },
  facebook: {
    icon: FiFacebook,
    color: '#1877F2',
    title: 'Facebook Products',
    subtitle: 'Start by adding your first Facebook product'
  },
  twitter: {
    icon: FiTwitter,
    color: '#1DA1F2',
    title: 'Twitter Products',
    subtitle: 'Start by adding your first Twitter product'
  },
  whatsapp: {
    icon: FaWhatsapp,
    color: '#25D366',
    title: 'WhatsApp Products',
    subtitle: 'Start by adding your first WhatsApp product'
  },
  youtube: {
    icon: FaYoutube,
    color: '#FF0000',
    title: 'YouTube Products',
    subtitle: 'Start by adding your first YouTube product'
  },
  tiktok: {
    icon: FaTiktok,
    color: '#000000',
    title: 'TikTok Products',
    subtitle: 'Start by adding your first TikTok product'
  },
  foreignnumber: {
    icon: FaPhone,
    color: '#4A5568',
    title: 'Foreign Numbers',
    subtitle: 'Start by adding your first foreign number'
  },
  whatsappnumber: {
    icon: FaWhatsapp,
    color: '#25D366',
    title: 'WhatsApp Numbers',
    subtitle: 'Start by adding your first WhatsApp number'
  }
};

const SocialMediaTab = ({ 
  platform,
  searchQuery, 
  filters, 
  onDataFiltered, 
  applyFilters, 
  onViewPost, 
  onEditPost, 
  onDeletePost,
  getProducts,
  getLoading 
}) => {
  const platformKey = platform?.toLowerCase() || 'all';
  const config = platformConfig[platformKey] || platformConfig.all;
  const products = useSelector(getProducts) || [];
  const loading = useSelector(getLoading);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    if (products) {
      const filteredData = applyFilters(products);
      onDataFiltered(filteredData);
      setFilteredPosts(filteredData);
      setCurrentPage(1);
    }
  }, [searchQuery, filters, applyFilters, onDataFiltered, products]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!products || products.length === 0) {
    const Icon = config.icon;
    return (
      <EmptyStatePage
        title={config.title}
        sub={config.subtitle}
        icon={Icon && <Icon size={50} color={config.color} />}
      />
    );
  }

  const columns = [
    { key: 'username', label: 'Username' },
    { key: 'images', label: 'Images' },
    { key: 'type', label: 'Type' },
    { key: 'engagement', label: 'Engagement' },
    { key: 'followers', label: 'Followers' },
    { key: 'age', label: 'Age' },
    { key: 'price', label: 'Price' },
    { key: 'region', label: 'Region' },
    { key: 'status', label: 'Status' },
    { key: 'about', label: 'About' }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(paginatedData.map(post => post.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'green';
      case 'sold':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const pageCount = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedData = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const ProductCard = ({ product }) => {
    return (
      <Box>
        {/* ...existing product display code... */}
        
        {/* Add Credentials Status Indicator */}
        {product.hasCredentials && (
          <Badge 
            colorScheme="green" 
            position="absolute" 
            top={2} 
            right={2}
            fontSize="xs"
          >
            Has Credentials
          </Badge>
        )}
      </Box>
    );
  };

  const productsList = products.map(product => ({
    ...product,
    hasCredentials: Boolean(product.accountCredentials?.email)
  }));

  return (
    <Box>
      <DataTable
        data={paginatedData}
        columns={columns}
        selectedItems={selectedItems}
        onSelectAll={handleSelectAll}
        onSelectItem={handleSelectItem}
        currentPage={currentPage}
        totalPages={pageCount}
        pageSize={itemsPerPage}
        totalItems={filteredPosts.length}
        onPageChange={setCurrentPage}
        onView={onViewPost}
        onEdit={onEditPost}
        onDelete={onDeletePost}
        getStatusColor={getStatusColor}
      />
    </Box>
  );
};

export default SocialMediaTab;
