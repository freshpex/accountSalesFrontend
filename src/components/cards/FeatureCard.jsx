import {
  Heading,
  Text,
  Icon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <VStack
      p={8}
      bg={useColorModeValue("white", "gray.700")}
      border="1px"
      borderColor={useColorModeValue("gray.100", "gray.600")}
      borderRadius="xl"
      shadow="md"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      spacing={4}
    >
      <Icon as={icon} w={10} h={10} color="blue.400" />
      <Heading size="md">{title}</Heading>
      <Text
        color={useColorModeValue("gray.600", "gray.300")}
        textAlign="center"
      >
        {description}
      </Text>
    </VStack>
  );
};

export default FeatureCard;
