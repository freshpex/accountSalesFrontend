import { Container, Box, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const EmailInfo = () => {
  return (
    <Container maxW="container.xl">
      <Box h="100vh" display={"grid"} placeItems={"center"}>
        <Box>
          <Text textAlign={"center"} textStyle={"heading"} color="teal.500">
            Password Reset Link Sent!
          </Text>
          <Text
            fontSize={"16px"}
            fontWeight={400}
            color="gray.600"
            mt="16px"
            textAlign={"center"}
          >
            We have sent a passowrd reset link with instructions to your <br />{" "}
            email address. Please click on the link to reset your password.{" "}
          </Text>

          <Center>
            <Button
              mt="32px"
              _hover={{ opacity: 0.8 }}
              w={{ base: "full", md: "352px" }}
            >
              <Link to="/login">Go Back To Sign In</Link>
            </Button>
          </Center>
        </Box>
      </Box>
    </Container>
  );
};

export default EmailInfo;
