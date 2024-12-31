import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react';
import Account from './tabs/account';
import Security from './tabs/security';
import Notification from './tabs/notification';

const AccountSettings = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={4}>Account & Settings</Heading>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box bg="white" borderRadius="lg" shadow="sm">
        <Tabs>
          <TabList px={4} borderBottom="1px solid" borderColor="gray.200">
            <Tab 
              _selected={{ color: 'blue.500', borderBottom: '2px solid' }}
              _focus={{ boxShadow: 'none' }}
            >
              Account
            </Tab>
            <Tab
              _selected={{ color: 'blue.500', borderBottom: '2px solid' }}
              _focus={{ boxShadow: 'none' }}
            >
              Security
            </Tab>
            <Tab
              _selected={{ color: 'blue.500', borderBottom: '2px solid' }}
              _focus={{ boxShadow: 'none' }}
            >
              Notification
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Account />
            </TabPanel>
            <TabPanel>
              <Security />
            </TabPanel>
            <TabPanel>
              <Notification />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AccountSettings;