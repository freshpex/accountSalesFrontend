import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Stack,
  Text,
  Flex,
  Badge
} from '@chakra-ui/react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const RevenueTargets = ({ salesTarget, performanceMetrics }) => {
  const {
    current = 0,
    target = 0,
    percentage = 0,
    timeLeft = ''
  } = salesTarget || {};

  const {
    trend = 'stable',
    comparison = 'average',
    percentageFromAverage = 0
  } = performanceMetrics?.revenue || {};

  return (
    <Box p={6} bg="white" borderRadius="lg" shadow="sm">
      <Stack spacing={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="medium">Revenue Target</Text>
          <Badge colorScheme={comparison === 'above_average' ? 'green' : 'orange'}>
            {comparison.replace('_', ' ')}
          </Badge>
        </Flex>

        <Flex justify="space-between" align="center">
          <CircularProgress
            value={percentage}
            size="120px"
            thickness="8px"
            color={percentage >= 100 ? 'green.400' : 'blue.400'}
          >
            <CircularProgressLabel>
              {Math.round(percentage)}%
            </CircularProgressLabel>
          </CircularProgress>

          <Stack spacing={2}>
            <Flex align="center" gap={2}>
              {trend === 'increasing' ? 
                <FiTrendingUp color="green" /> : 
                <FiTrendingDown color="red" />
              }
              <Text fontSize="sm" color="gray.600">
                {percentageFromAverage.toFixed(1)}% from average
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.600">
              ₦{current.toLocaleString()} of ₦{target.toLocaleString()}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {timeLeft} remaining
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default RevenueTargets;
