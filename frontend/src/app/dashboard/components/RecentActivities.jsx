import {
  Box, Flex, Text, Stack, IconButton, Circle, Badge, useColorModeValue
} from '@chakra-ui/react';
import { FiFilter, FiActivity } from 'react-icons/fi';
import DashboardCard from '../../../components/cards/DashboardCard';
import EmptyStatePage from '../../../components/emptyState';

const RecentActivities = ({ activities }) => {
  if (!activities || !activities.length) {
    return (
      <DashboardCard>
        <EmptyStatePage
          title="No Recent Activities"
          sub="Activities will appear here as they occur"
          icon={<FiActivity size={40} />}
        />
      </DashboardCard>
    );
  }

  return (
    <DashboardCard>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap">
        <Text fontSize="lg" fontWeight="medium">Recent Activities</Text>
        <IconButton
          icon={<FiFilter />}
          variant="ghost"
          size="sm"
          aria-label="Filter activities"
        />
      </Flex>
      
      <Stack spacing={4}>
        {activities.map((activity) => (
          <ActivityItem key={activity._id} activity={activity} />
        ))}
      </Stack>
    </DashboardCard>
  );
};

const ActivityItem = ({ activity }) => {
  const getActivityColor = (type) => {
    const colors = {
      order: 'green',
      inventory: 'orange',
      customer: 'blue'
    };
    return colors[type] || 'gray';
  };

  const color = getActivityColor(activity.type);

  return (
    <Flex 
      direction={{ base: 'column', sm: 'row' }}
      align={{ base: 'flex-start', sm: 'center' }}
      justify="space-between"
      gap={3}
      p={3}
      borderRadius="md"
      _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
    >
      <Flex align="center">
        <Circle
          size={{ base: "32px", sm: "40px" }}
          bg={`${color}.100`}
          color={`${color}.500`}
          mr={3}
        >
          <FiActivity />
        </Circle>
        <Box>
          <Text fontSize="sm" fontWeight="medium">{activity.message}</Text>
          <Text fontSize="xs" color="gray.500">
            {new Date(activity.createdAt).toLocaleString()}
          </Text>
        </Box>
      </Flex>
      {activity.amount && (
        <Badge 
          colorScheme={color}
          fontSize={{ base: 'xs', sm: 'sm' }}
          mt={{ base: 2, sm: 0 }}
        >
          ₦{activity.amount.toLocaleString()}
        </Badge>
      )}
    </Flex>
  );
};

export default RecentActivities;
