import {
  Box,
  Flex,
  Text,
  Badge,
  Progress,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const getSegmentColor = (segment) => {
  if (!segment) return "gray";
  switch (segment.toLowerCase()) {
    case "platinum":
      return "purple";
    case "gold":
      return "yellow";
    case "silver":
      return "gray";
    case "bronze":
      return "orange";
    default:
      return "gray";
  }
};

const CustomerSegmentCard = ({ segment, onSegmentClick }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const handleClick = () => {
    if (onSegmentClick) {
      onSegmentClick(segment ? segment.name.toLowerCase() : "unknown");
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
        <Text fontWeight="medium">
          {segment ? segment.name : "Unknown"} Segment
        </Text>
        <Badge
          colorScheme={getSegmentColor(segment ? segment.name : "unknown")}
        >
          {segment ? segment.count : "Unknown"} customers
        </Badge>
      </Flex>
      <Stack spacing={4}>
        <Box>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">
              Average Spend
            </Text>
            <Text fontWeight="medium">
              ${segment ? segment.averageSpend : "Unknown"}
            </Text>
          </Flex>
          <Progress
            value={segment ? (segment.averageSpend / 2000) * 100 : 0}
            size="sm"
            colorScheme={getSegmentColor(segment ? segment.name : "unknown")}
          />
        </Box>
        <Box>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">
              Retention Rate
            </Text>
            <Text fontWeight="medium">
              {segment ? segment.retentionRate : "Unknown"}%
            </Text>
          </Flex>
          <Progress
            value={segment ? segment.retentionRate : 0}
            size="sm"
            colorScheme="green"
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomerSegmentCard;
