import React from "react";
import { Center, Container, Image, Box } from "@chakra-ui/react";
import logo from "src/assets/logo.png";

const SuspenseLoadingUI = () => {
  return (
    <Container maxW="container.xl">
      <Box display="grid" placeItems="center" h="100vh">
        <Center>
          <Image src={logo} alt="logo_png" h="70px" objectFit={"contain"} />
        </Center>
      </Box>
    </Container>
  );
};

export default SuspenseLoadingUI;
