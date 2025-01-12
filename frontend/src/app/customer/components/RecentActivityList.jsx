import {
  Box,
  Flex,
  Text,
  Stack,
  IconButton,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiFilter, FiDollarSign, FiUserCheck, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import EmptyStatePage from '../../../components/emptyState';

const RecentActivityList = ({ activities, maxH, overflowY }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const displayActivities = isExpanded ? activities : activities?.slice(0, 5);

  return (
    <Box
      bg={bgColor}
      p={{ base: 3, md: 6 }}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
      maxH={{ base: "500px", xl: maxH }}
      overflowY={{ base: "auto", xl: overflowY }}
      w="100%"
    >
      <Flex 
        justify="space-between" 
        align="center" 
        mb={4}
        position="sticky"
        top={0}
        bg={bgColor}
        zIndex={1}
        py={2}
      >
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium">Recent Activity</Text>
        <IconButton
          icon={<FiFilter />}
          variant="ghost"
          size="sm"
          aria-label="Filter activities"
        />
      </Flex>

      {!activities?.length ? (
        <EmptyStatePage
          title="No Recent Activity"
          sub="Customer activities will appear here"
          icon={<FiUser size={30} />}
        />
      ) : (
        <>
          <Stack spacing={3}>
            {displayActivities.map((activity) => (
              <Flex 
                key={activity.id} 
                align="center" 
                justify="space-between"
                p={{ base: 2, md: 3 }}
                _hover={{ bg: 'gray.50' }}
                borderRadius="md"
                transition="all 0.2s"
                flexWrap={{ base: 'wrap', md: 'nowrap' }}
                gap={2}
              >
                <Flex align="center" flex={{ base: '1 1 100%', md: 1 }}>
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
                  <Box flex={1}>
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
                      {activity.details}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(activity.date).toLocaleString()}
                    </Text>
                  </Box>
                </Flex>
                {activity.amount && (
                  <Text 
                    fontWeight="medium"
                    fontSize={{ base: "xs", md: "sm" }}
                    ml={{ base: 9, md: 0 }}
                  >
                    ${activity.amount}
                  </Text>
                )}
              </Flex>
            ))}
          </Stack>

          {activities.length > 5 && (
            <Button
              width="100%"
              mt={4}
              variant="ghost"
              size={{ base: "sm", md: "md" }}
              onClick={() => setIsExpanded(!isExpanded)}
              rightIcon={isExpanded ? <FiChevronUp /> : <FiChevronDown />}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default RecentActivityList;
