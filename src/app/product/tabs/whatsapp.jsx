import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Badge,
  IconButton,
  HStack,
  Box,
  Text,
  Select,
  Button,
} from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { socialData } from '../data';

const Whatsapp = ({ searchQuery, filters, onDataFiltered, applyFilters, onViewPost, onEditPost, onDeletePost }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const filtered = applyFilters(socialData.whatsapp);
    setFilteredPosts(filtered);
    onDataFiltered(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, applyFilters, onDataFiltered]);

  const pageCount = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedData = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      case 'active':
        return 'green';
      case 'scheduled':
        return 'blue';
      case 'inactive':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w="40px">
              <Checkbox
                isChecked={selectedItems.length === paginatedData.length}
                isIndeterminate={selectedItems.length > 0 && selectedItems.length < paginatedData.length}
                onChange={handleSelectAll}
              />
            </Th>
            <Th>Post ID</Th>
            <Th>Content</Th>
            <Th>Engagement</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((post) => (
            <Tr key={post.id}>
              <Td>
                <Checkbox
                  isChecked={selectedItems.includes(post.id)}
                  onChange={() => handleSelectItem(post.id)}
                />
              </Td>
              <Td>{post.postId}</Td>
              <Td maxW="300px" isTruncated>{post.content}</Td>
              <Td>{post.engagement}</Td>
              <Td>{formatDate(post.date)}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
              </Td>
              <Td>
              <HStack spacing={2}>
                <IconButton
                  aria-label="View post"
                  icon={<ViewIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => onViewPost(post)}
                />
                <IconButton
                  aria-label="Edit post"
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => onEditPost(post)}
                />
                <IconButton
                  aria-label="Delete post"
                  icon={<DeleteIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeletePost(post)}
                />
              </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      <HStack mt={4} justify="space-between">
        <Text>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} entries
        </Text>
        <HStack spacing={2}>
          <Button
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            leftIcon={<ChevronLeftIcon />}
          >
            Previous
          </Button>
          <Select
            size="sm"
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            w="70px"
          >
            {Array.from({ length: pageCount }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Button
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
            disabled={currentPage === pageCount}
            rightIcon={<ChevronRightIcon />}
          >
            Next
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Whatsapp;