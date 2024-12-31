import {
  Box,
  Flex,
  Text,
  Stack,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { FiFilter, FiDollarSign, FiUserCheck, FiUser } from 'react-icons/fi';
import EmptyStatePage from '../../../components/emptyState';

const RecentActivityList = ({ activities }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  if (!activities?.length) {
    return (
      <Box
        bg={bgColor}
        p={6}
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
        shadow="sm"
      >
        <EmptyStatePage
          title="No Recent Activity"
          sub="Customer activities will appear here"
          icon={<FiUser size={40} />}
        />
      </Box>
    );
  }

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="medium">Recent Activity</Text>
        <IconButton
          icon={<FiFilter />}
          variant="ghost"
          size="sm"
          aria-label="Filter activities"
        />
      </Flex>
      <Stack spacing={4}>
        {activities.map((activity) => (
          <Flex key={activity.id} align="center" justify="space-between">
            <Flex align="center">
              <Box
                p={2}
                bg={
                  activity.type === 'purchase' ? 'green.100' :
                  activity.type === 'support' ? 'orange.100' : 'blue.100'
                }
                color={
                  activity.type === 'purchase' ? 'green.500' :
                  activity.type === 'support' ? 'orange.500' : 'blue.500'
                }
                borderRadius="full"
                mr={3}
              >
                {activity.type === 'purchase' ? <FiDollarSign /> :
                 activity.type === 'support' ? <FiUserCheck /> : <FiUser />}
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  {activity.details}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {new Date(activity.date).toLocaleString()}
                </Text>
              </Box>
            </Flex>
            {activity.amount && (
              <Text fontWeight="medium">${activity.amount}</Text>
            )}
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default RecentActivityList;
