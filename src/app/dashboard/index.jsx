import React from 'react';
import {
  Box,
  Flex,
  Text,
  Progress,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import { dashboardData } from './data';

const Dashboard = () => {
  const { salesTarget, revenue, customers, transactions, products, sales, customerGrowth, productPopular } = dashboardData;

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Text fontSize="2xl" fontWeight="bold">Dashboard</Text>
      <Text fontSize="sm" color="gray.500">Dashboard</Text>

      <Grid templateColumns="repeat(12, 1fr)" gap={6} mt={4}>
        <GridItem colSpan={[12, 12, 6]}>
          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Text fontWeight="medium">Sales Target</Text>
            <Flex align="center" justify="space-between">
              <Text fontSize="lg">In Progress</Text>
              <Text fontSize="lg" fontWeight="bold">${salesTarget.target.toLocaleString()}</Text>
            </Flex>
            <Progress value={(salesTarget.current / salesTarget.target) * 100} mt={4} borderRadius="md" />
          </Box>
        </GridItem>
        
        <GridItem colSpan={[12, 6, 3]}>
          <Box bg="blue.50" p={4} borderRadius="md" shadow="sm">
            <Stat>
              <StatLabel>Total Revenue</StatLabel>
              <StatNumber>${revenue.toLocaleString()}</StatNumber>
              <StatHelpText>10.4% From last week</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        
        <GridItem colSpan={[12, 6, 3]}>
          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Stat>
              <StatLabel>Total Customer</StatLabel>
              <StatNumber>{customers.toLocaleString()}</StatNumber>
              <StatHelpText>1.5% From last week</StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem colSpan={[12, 6, 3]}>
          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Stat>
              <StatLabel>Total Transactions</StatLabel>
              <StatNumber>{transactions.toLocaleString()}</StatNumber>
              <StatHelpText>3.6% From last week</StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem colSpan={[12, 6, 3]}>
          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Stat>
              <StatLabel>Total Products</StatLabel>
              <StatNumber>{products.toLocaleString()}</StatNumber>
              <StatHelpText>-1.5% From last week</StatHelpText>
            </Stat>
          </Box>
        </GridItem>

        <GridItem colSpan={[12, 12, 6]}>
          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Text fontWeight="medium">Your Sales This Year</Text>
            {/* Chart placeholder */}
            <Text>Average Sale Value: ${sales.averageSaleValue.toLocaleString()}</Text>
            <Text>Average Year Value: ${sales.averageYearValue.toLocaleString()}</Text>
          </Box>
        </GridItem>

        <GridItem colSpan={[12, 12, 6]}>
          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Text fontWeight="medium">Customer Growth 3 Province</Text>
            <Flex mt={4} direction="column">
              {customerGrowth.map((growth, index) => (
                <Text key={index}>{growth.region}: {growth.percentage}%</Text>
              ))}
            </Flex>
          </Box>
        </GridItem>

        <GridItem colSpan={[12, 12, 6]}>
          <Box bg="white" p={4} borderRadius="md" shadow="sm">
            <Text fontWeight="medium">Product Popular</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Price</Th>
                  <Th>Sales</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productPopular.map((product) => (
                  <Tr key={product.id}>
                    <Td>{product.name}</Td>
                    <Td>${product.price}</Td>
                    <Td>{product.sales}</Td>
                    <Td>{product.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
