import {
  Box,
  Flex,
  Text,
  Badge,
  Progress,
  Circle,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import DashboardCard from "../../../components/cards/DashboardCard";

const RegionCard = ({ region }) => {
  const statusColor = useColorModeValue("blue.500", "blue.200");
  const iconBg = useColorModeValue("blue.50", "blue.900");

  return (
    <DashboardCard>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="medium">
          {region.region}
        </Text>
        <Badge colorScheme="blue">{region.percentage}% Growth</Badge>
      </Flex>

      <Box>
        <Flex justify="space-between" mb={2}>
          <Text fontSize="sm" color="gray.500">
            Total Customers
          </Text>
          <Text fontWeight="medium">{region.total.toLocaleString()}</Text>
        </Flex>
        <Progress
          value={region.percentage}
          size="sm"
          colorScheme="blue"
          mb={4}
        />
      </Box>

      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color="gray.500">
            New Customers
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            +{region.new.toLocaleString()}
          </Text>
        </Box>
        <Circle size="40px" bg={iconBg}>
          <FiUsers color={statusColor} />
        </Circle>
      </Flex>
    </DashboardCard>
  );
};

export default RegionCard;
