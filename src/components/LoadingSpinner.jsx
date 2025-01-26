import { Spinner, Box } from "@chakra-ui/react";
import { useColors } from "../utils/colors";

const LoadingSpinner = () => {
  const colors = useColors();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={colors.bgColor}
      color={colors.textColor}
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default LoadingSpinner;
