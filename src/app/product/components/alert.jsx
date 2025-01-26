import { Box, VStack, HStack, Text, Icon } from "@chakra-ui/react";
import { FiShield, FiAlertTriangle } from "react-icons/fi";

const Alert = ({ status, title, description }) => (
  <Box
    p={4}
    borderRadius="md"
    bg={status === "info" ? "blue.50" : "red.50"}
    color={status === "info" ? "blue.700" : "red.700"}
  >
    <HStack spacing={3}>
      <Icon as={status === "info" ? FiShield : FiAlertTriangle} boxSize={5} />
      <VStack align="start" spacing={1}>
        <Text fontWeight="bold">{title}</Text>
        <Text fontSize="sm">{description}</Text>
      </VStack>
    </HStack>
  </Box>
);

export default Alert;
