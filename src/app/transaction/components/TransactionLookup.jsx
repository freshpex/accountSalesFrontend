import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  ScaleFade,
  SlideFade,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiSearch, FiArrowRight } from "react-icons/fi";

const MotionBox = motion(Box);

const TransactionLookup = () => {
  const [transactionId, setTransactionId] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleCheck = () => {
    if (!transactionId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a transaction ID",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    navigate(`/purchased-account/${transactionId}`);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxW="600px"
      mx="auto"
      px={6}
      py={8}
    >
      <Box
        position="relative"
        borderRadius="xl"
        overflow="hidden"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        boxShadow="xl"
        border="1px solid rgba(255, 255, 255, 0.2)"
        p={8}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          zIndex: -1,
        }}
      >
        <VStack spacing={6}>
          <SlideFade in={true} offsetY="20px">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              textAlign="center"
              mb={2}
            >
              Check Your Recent Purchases
            </Text>
          </SlideFade>

          <ScaleFade in={true}>
            <Text
              fontSize="md"
              color="gray.500"
              textAlign="center"
              maxW="400px"
              mb={6}
            >
              Enter your transaction ID to view your account credentials
            </Text>
          </ScaleFade>

          <InputGroup size="lg">
            <Input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter Transaction ID"
              bg="white"
              border="2px solid"
              borderColor="transparent"
              _hover={{ borderColor: "blue.400" }}
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              transition="all 0.3s"
              pr="4.5rem"
            />
            <InputRightElement width="4.5rem">
              <FiSearch color="gray.300" />
            </InputRightElement>
          </InputGroup>

          <Button
            rightIcon={
              <FiArrowRight
                style={{
                  transform: isHovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.2s",
                }}
              />
            }
            bgGradient="linear(to-r, blue.400, purple.500)"
            color="white"
            size="lg"
            w="full"
            h="54px"
            _hover={{
              bgGradient: "linear(to-r, blue.500, purple.600)",
              transform: "translateY(-2px)",
            }}
            _active={{
              bgGradient: "linear(to-r, blue.600, purple.700)",
              transform: "translateY(0)",
            }}
            transition="all 0.2s"
            onClick={handleCheck}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Text
              mr={2}
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.2s",
              }}
            >
              {isHovered ? "Check Now" : "View Credentials"}
            </Text>
          </Button>

          <Text fontSize="sm" color="gray.500" mt={4} textAlign="center">
            Your credentials will be displayed securely
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default TransactionLookup;
