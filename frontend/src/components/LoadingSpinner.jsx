import { Spinner, Box } from '@chakra-ui/react';

const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Spinner size="xl" />
  </Box>
);

export default LoadingSpinner;