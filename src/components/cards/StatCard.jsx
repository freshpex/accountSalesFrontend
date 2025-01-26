import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const StatCard = ({ title, value, growth, icon }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const isPositive = growth > 0;

  return (
    <Box
      bg={bgColor}
      p={6}
      rounded="xl"
      shadow="lg"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.100", "gray.700")}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text color={textColor} fontSize="sm" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </Text>
        </Box>
        <Box p={3} bg={useColorModeValue("blue.50", "blue.900")} rounded="full">
          <Icon as={icon} boxSize={6} color="blue.500" />
        </Box>
      </Flex>
      <Flex align="center" mt={4}>
        <Icon
          as={isPositive ? FiTrendingUp : FiTrendingDown}
          color={isPositive ? "green.500" : "red.500"}
          boxSize={4}
          mr={1}
        />
        <Text
          fontSize="sm"
          color={isPositive ? "green.500" : "red.500"}
          fontWeight="medium"
        >
          {Math.abs(growth)}% from last week
        </Text>
      </Flex>
    </Box>
  );
};

export default StatCard;
