import { Box, Text, Progress, Flex, Badge } from "@chakra-ui/react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const RegionCard = ({ region, percentage }) => {
  const isGrowthPositive = region.growth > 0;

  return (
    <Box p={4} borderRadius="lg" borderWidth="1px">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="medium" textTransform="capitalize">
          {region.region}
        </Text>
        <Badge 
          colorScheme={isGrowthPositive ? "green" : "red"}
          display="flex"
          alignItems="center"
          gap={1}
        >
          {isGrowthPositive ? <FiTrendingUp /> : <FiTrendingDown />}
          {Math.abs(region.growth)}%
        </Badge>
      </Flex>

      <Text fontSize="sm" color="gray.500" mb={2}>
        Revenue: ₦{region.revenue.toLocaleString()}
      </Text>

      <Progress 
        value={percentage} 
        size="sm" 
        colorScheme={isGrowthPositive ? "green" : "orange"}
        mb={2}
      />

      <Flex justify="space-between" fontSize="xs" color="gray.500">
        <Text>Orders: {region.orders}</Text>
        <Text>Products: {region.productCount}</Text>
      </Flex>
    </Box>
  );
};

export default RegionCard;
