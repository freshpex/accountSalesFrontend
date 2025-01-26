import {
  Box, Flex, Text, Button, Table, Thead, Tbody, Tr, Th, Td,
  Image, Badge, Progress, Grid, useColorModeValue
} from '@chakra-ui/react';
import { FiDownload, FiPackage } from 'react-icons/fi';
import DashboardCard from '../../../components/cards/DashboardCard';
import EmptyStatePage from '../../../components/emptyState';

const PopularProducts = ({ products }) => {
  if (!products || !products.length) {
    return (
      <DashboardCard>
        <EmptyStatePage
          title="No Products Found"
          sub="Popular products will appear here once sales begin"
          icon={<FiPackage size={40} />}
        />
      </DashboardCard>
    );
  }

  const handleExport = () => {
    console.log('Exporting products data...');
  };

  return (
    <DashboardCard>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Text fontSize="lg" fontWeight="medium">Popular Products</Text>
        <Button
          leftIcon={<FiDownload />}
          size="sm"
          variant="outline"
          onClick={handleExport}
        >
          Export
        </Button>
      </Flex>

      <Box>
        {/* Desktop View */}
        <Box display={{ base: 'none', lg: 'block' }}>
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Price</Th>
                  <Th>Sales</Th>
                  <Th>Inventory</Th>
                  <Th>Rating</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <ProductRow key={product._id} product={product} />
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        {/* Mobile View */}
        <Box display={{ base: 'block', lg: 'none' }}>
          {products.map((product) => (
            <ProductMobileCard key={product._id} product={product} />
          ))}
        </Box>
      </Box>
    </DashboardCard>
  );
};

const ProductRow = ({ product }) => (
  <Tr>
    <Td>
      <Flex align="center">
        <Image
          src={product.image}
          alt={product.name}
          fallbackSrc="https://via.placeholder.com/40"
          boxSize="40px"
          objectFit="cover"
          borderRadius="md"
          mr={3}
        />
        <Box>
          <Text fontWeight="medium">{product.name}</Text>
          <Text fontSize="sm" color="gray.500">#{product._id}</Text>
        </Box>
      </Flex>
    </Td>
    <Td>₦{product.price.toFixed(2)}</Td>
    <Td>
      <Text fontWeight="medium">{product.sales?.toLocaleString()}</Text>
    </Td>
    <Td>
      <Flex align="center">
        <Progress
          value={(product.inventory / 2000) * 100}
          size="sm"
          w="70px"
          colorScheme={product.inventory < 1000 ? "orange" : "green"}
          mr={2}
        />
        <Text fontSize="sm">{product.inventory}</Text>
      </Flex>
    </Td>
    <Td>
      <Flex align="center">
        <Box as="span" color="yellow.400" mr={1}>★</Box>
        <Text>{product.rating}</Text>
      </Flex>
    </Td>
    <Td>
      <Badge
        colorScheme={product.status === 'available' ? 'green' : 'red'}
        borderRadius="full"
        px={3}
        py={1}
      >
        {product.status}
      </Badge>
    </Td>
  </Tr>
);

const ProductMobileCard = ({ product }) => (
  <Box 
    p={4} 
    borderWidth="1px" 
    borderRadius="lg" 
    mb={4}
    bg={useColorModeValue('white', 'gray.800')}
  >
    <Flex align="center" mb={3}>
      <Image
        src={product.image}
        alt={product.name}
        fallbackSrc="https://via.placeholder.com/40"
        boxSize="50px"
        objectFit="cover"
        borderRadius="md"
        mr={3}
      />
      <Box flex="1">
        <Text fontWeight="medium">{product.name}</Text>
        <Text fontSize="sm" color="gray.500">#{product._id}</Text>
      </Box>
      <Badge
        colorScheme={product.status === 'available' ? 'green' : 'red'}
        borderRadius="full"
        px={3}
        py={1}
      >
        {product.status}
      </Badge>
    </Flex>

    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <Box>
        <Text fontSize="sm" color="gray.500">Price</Text>
        <Text fontWeight="medium">₦{product.price.toFixed(2)}</Text>
      </Box>
      <Box>
        <Text fontSize="sm" color="gray.500">Sales</Text>
        <Text fontWeight="medium">{product.sales?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text fontSize="sm" color="gray.500">Inventory</Text>
        <Flex align="center">
          <Progress
            value={(product.inventory / 2000) * 100}
            size="sm"
            w="70px"
            colorScheme={product.inventory < 1000 ? "orange" : "green"}
            mr={2}
          />
          <Text fontSize="sm">{product.inventory}</Text>
        </Flex>
      </Box>
      <Box>
        <Text fontSize="sm" color="gray.500">Rating</Text>
        <Flex align="center">
          <Box as="span" color="yellow.400" mr={1}>★</Box>
          <Text>{product.rating}</Text>
        </Flex>
      </Box>
    </Grid>
  </Box>
);

export default PopularProducts;
