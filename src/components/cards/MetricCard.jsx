import {
  Flex,
  Box,
  Text,
  Stat,
  StatArrow,
  Circle,
  useColorModeValue,
} from '@chakra-ui/react';
import DashboardCard from './DashboardCard';

const MetricCard = ({ title, value, growth, icon: Icon, secondaryValue, secondaryLabel }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <DashboardCard>
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text color={textColor} fontSize="sm">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </Text>
          <Stat>
            <Flex align="center" mt={2}>
              <StatArrow type={growth >= 0 ? 'increase' : 'decrease'} />
              <Text fontSize="sm" color={growth >= 0 ? 'green.500' : 'red.500'}>
                {Math.abs(growth)}%
              </Text>
            </Flex>
          </Stat>
        </Box>
        <Circle size="40px" bg={iconBg}>
          <Icon size={20} color={useColorModeValue('blue.500', 'blue.200')} />
        </Circle>
      </Flex>
        {/* Secondary Info */}
        {secondaryValue && (
        <Flex mt={4} justify="space-between" align="center">
          <Text fontSize="sm" color={textColor}>
            {secondaryLabel}
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {secondaryValue}
          </Text>
        </Flex>
      )}
    </DashboardCard>
  );
};

export default MetricCard;
