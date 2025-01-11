import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import DataTable from './table';
import EmptyStatePage from '../../../components/emptyState';
import LoadingSpinner from '../../../components/LoadingSpinner';

const platformConfig = {
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
  const products = useSelector(getProducts) || [];
  const loading = useSelector(getLoading);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const itemsPerPage = 10;

  const config = platformConfig[platform.toLowerCase()];

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
        icon={<Icon size={50} color={config.color} />}
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
