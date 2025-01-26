import {
    VStack,
    HStack,
    Text,
    Icon,
  } from '@chakra-ui/react';

const StatBox = ({ icon, label, value }) => (
    <HStack p={4} bg="gray.50" borderRadius="md">
      <Icon as={icon} boxSize={5} color="blue.500" />
      <VStack align="start" spacing={0}>
        <Text fontSize="sm" color="gray.500">{label}</Text>
        <Text fontWeight="bold">{value}</Text>
      </VStack>
    </HStack>
  );

export default StatBox;