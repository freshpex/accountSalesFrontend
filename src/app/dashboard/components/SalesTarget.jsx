import {
  Box,
  Flex,
  Text,
  Progress,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import DashboardCard from "../../../components/cards/DashboardCard";

const SalesTarget = ({ salesTarget }) => {
  const textColor = useColorModeValue("gray.600", "gray.300");

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "green";
    if (percentage >= 50) return "blue";
    if (percentage >= 25) return "orange";
    return "red";
  };

  return (
    <DashboardCard>
      <Flex justify="space-between" align="center" mb={4} flexWrap="wrap">
        <Text fontSize="lg" fontWeight="medium">
          Sales Target
        </Text>
        <Badge colorScheme={getProgressColor(salesTarget?.percentage)}>
          {salesTarget?.timeLeft} remaining
        </Badge>
      </Flex>

      <Box mb={4}>
        <Flex justify="space-between" mb={2} flexWrap="wrap">
          <Text fontSize="sm" color={textColor}>
            Current: ${salesTarget?.current.toLocaleString()}
          </Text>
          <Text fontSize="sm" color={textColor}>
            Target: ${salesTarget?.target.toLocaleString()}
          </Text>
        </Flex>
        <Progress
          value={salesTarget?.percentage}
          size="lg"
          colorScheme={getProgressColor(salesTarget?.percentage)}
          borderRadius="full"
        />
      </Box>

      <Flex justify="center">
        <Text fontSize="sm" color={textColor}>
          {salesTarget?.percentage}% of target achieved
        </Text>
      </Flex>
    </DashboardCard>
  );
};

export default SalesTarget;
