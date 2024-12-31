import {
  Box,
  Flex,
  Text,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';

const StatCard = ({ title, value, trend, icon: Icon, subtitle }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const iconBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
    >
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text color="gray.500" fontSize="sm">{title}</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
            {value}
          </Text>
          {subtitle && (
            <Text fontSize="sm" color="gray.500" mt={1}>
              {subtitle}
            </Text>
          )}
        </Box>
        <Box p={3} bg={iconBg} borderRadius="full" color="blue.500">
          <Icon size={20} />
        </Box>
      </Flex>
    </Box>
  );
};

export default StatCard;
