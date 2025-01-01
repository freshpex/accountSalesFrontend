import { Container, Box, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColors } from '../../../utils/colors';


const EmailInfo = () => {
  const colors = useColors();
  return (
    <Container maxW="container.xl" bg={colors.bgColor} color={colors.textColor}>
      <Box h="100vh" display={"grid"} placeItems={"center"}>
        <Box>
          <Text textAlign={"center"} textStyle={"heading"} color={colors.textColor}>
            Password Reset Link Sent!
          </Text>
          <Text
            fontSize={"16px"}
            fontWeight={400}
            color={colors.textColor}
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
