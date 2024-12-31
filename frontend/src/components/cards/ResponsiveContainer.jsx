import { Box } from '@chakra-ui/react';
import {
  ResponsiveContainer as RechartsResponsiveContainer
} from 'recharts';

const ResponsiveContainer = ({ children, height = "300px" }) => (
  <Box h={height}>
    <RechartsResponsiveContainer width="100%" height="100%">
      {children}
    </RechartsResponsiveContainer>
  </Box>
);

export default ResponsiveContainer;
