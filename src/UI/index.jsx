import { Container, Image, Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import logo from "/logo.svg";
import { useColors } from "../utils/colors";

const MotionBox = motion(Box);

const SuspenseLoadingUI = () => {
  const colors = useColors();

  return (
    <Container
      maxW="container.xl"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={colors.bgColor}
      color={colors.textColor}
    >
      <VStack spacing={6}>
        <MotionBox
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
        >
          <Image src={logo} alt="logo_png" h="70px" objectFit="contain" />
        </MotionBox>
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        <Text fontSize="lg" color={colors.textColor}>
          Loading, please wait...
        </Text>
      </VStack>
    </Container>
  );
};

export default SuspenseLoadingUI;
