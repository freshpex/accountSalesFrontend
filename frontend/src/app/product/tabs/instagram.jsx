import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { FiInstagram } from 'react-icons/fi';
import DataTable from '../components/table';
import EmptyStatePage from '../../../components/emptyState';
import { getInstagramProducts, getLoading } from '../redux/selector';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useColors } from '../../../utils/colors';

const Instagram = ({ searchQuery, filters, onDataFiltered, applyFilters, onViewPost, onEditPost, onDeletePost }) => {
  const rawInstagramProducts = useSelector(getInstagramProducts);
  const loading = useSelector(getLoading);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const itemsPerPage = 10;
  const colors = useColors();

  const instagramProducts = useMemo(() => rawInstagramProducts || [], [rawInstagramProducts]);

  useEffect(() => {
    console.log('Instagram products in effect:', instagramProducts); // Debug log
    const filteredData = applyFilters(instagramProducts);
    console.log('Filtered data:', filteredData); // Debug log
    onDataFiltered(filteredData);
    setFilteredPosts(filteredData);
    setCurrentPage(1);
  }, [searchQuery, filters, applyFilters, onDataFiltered, instagramProducts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!instagramProducts || instagramProducts.length === 0) {
    return (
      <EmptyStatePage
        title="No Instagram Products"
        sub="Start by adding your first Instagram product"
        icon={<FiInstagram size={50} color="#E1306C" />}
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
    { key: 'about', label: 'About' },
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

export default Instagram;