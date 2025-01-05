import {
  Box,
  Flex,
  Text,
  Badge,
  Progress,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';

const CustomerSegmentCard = ({ segment, onSegmentClick }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const getSegmentColor = (name) => {
    const colors = {
      platinum: 'purple',
      gold: 'yellow',
      silver: 'gray',
      bronze: 'orange'
    };
    return colors[name.toLowerCase()] || 'blue';
  };

  const handleClick = () => {
    if (onSegmentClick) {
      onSegmentClick(segment.name.toLowerCase());
    }
  };

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
      cursor="pointer"
      onClick={handleClick}
    >
      <Flex justify="space-between" mb={4}>
        <Text fontWeight="medium">{segment.name}</Text>
        <Badge colorScheme={getSegmentColor(segment.name)}>
          {segment.count} customers
        </Badge>
      </Flex>
      <Stack spacing={4}>
        <Box>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">Average Spend</Text>
            <Text fontWeight="medium">${segment.averageSpend}</Text>
          </Flex>
          <Progress
            value={(segment.averageSpend / 2000) * 100}
            size="sm"
            colorScheme={getSegmentColor(segment.name)}
          />
        </Box>
        <Box>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">Retention Rate</Text>
            <Text fontWeight="medium">{segment.retentionRate}%</Text>
          </Flex>
          <Progress
            value={segment.retentionRate}
            size="sm"
            colorScheme="green"
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomerSegmentCard;
