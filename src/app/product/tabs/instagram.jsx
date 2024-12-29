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
} from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { socialData } from '../data';

const Instagram = ({ searchQuery }) => {
  const data = socialData.instagram;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Scheduled':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w="40px">
              <Checkbox />
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
          {data.map((post) => (
            <Tr key={post.id}>
              <Td>
                <Checkbox />
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
                  />
                  <IconButton
                    aria-label="Edit post"
                    icon={<EditIcon />}
                    size="sm"
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="Delete post"
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
        <Text>1-10 of 50 Pages</Text>
        <HStack spacing={2}>
          <Text>The page on</Text>
          <select style={{ border: '1px solid #E2E8F0', padding: '0 8px' }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </HStack>
      </Box>
    </Box>
  );
};

export default Instagram;