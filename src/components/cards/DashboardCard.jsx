import { Box, useColorModeValue } from "@chakra-ui/react";

const DashboardCard = ({ children, ...props }) => (
  <Box
    bg={useColorModeValue("white", "gray.800")}
    p={6}
    borderRadius="xl"
    shadow="sm"
    border="1px solid"
    borderColor={useColorModeValue("gray.100", "gray.700")}
    transition="all 0.2s"
    _hover={{ shadow: "md" }}
    {...props}
  >
    {children}
  </Box>
);

export default DashboardCard;
