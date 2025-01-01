import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import DataTable from '../components/table';
import EmptyStatePage from '../../../components/emptyState';
import { getWhatsappProducts, getLoading } from '../redux/selector';

const Whatsapp = ({ searchQuery, filters, onDataFiltered, applyFilters, onViewPost, onEditPost, onDeletePost }) => {
  const WhatsappProducts = useSelector(getWhatsappProducts);
  const loading = useSelector(getLoading);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const filteredData = applyFilters(WhatsappProducts);
    onDataFiltered(filteredData);
    setFilteredPosts(filteredData);
    setCurrentPage(1);
  }, [searchQuery, filters, applyFilters, onDataFiltered, WhatsappProducts]);

  if (loading) {
    return <Box p={8}>Loading...</Box>;
  }

  if (!WhatsappProducts.length) {
    return (
      <EmptyStatePage
        title="No Whatsapp Products"
        sub="Start by adding your first Whatsapp product"
        icon={<FaWhatsapp size={50} color="#25D366" />}
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

export default Whatsapp;