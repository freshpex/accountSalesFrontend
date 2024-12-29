import React, { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  Tab,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Instagram from './tabs/instagram';
import Facebook from './tabs/facebook';
import Twitter from './tabs/twitter';
import Whatsapp from './tabs/whatsapp';
import { tabCounts } from './data';

const Product = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const components = [Instagram, Facebook, Twitter, Whatsapp];
  const ActiveComponent = components[tabIndex];

  const handleExport = () => {
    // Export functionality to be implemented
    console.log('Export clicked');
  };

  const handleFilter = (filter) => {
    // Filter functionality to be implemented
    console.log('Filter applied:', filter);
  };

  return (
    <Box p={4}>
      <Box mb={4}>
        <HStack spacing={4} mb={6}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search for id, name, content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleFilter('status')}>By Status</MenuItem>
              <MenuItem onClick={() => handleFilter('date')}>By Date</MenuItem>
              <MenuItem onClick={() => handleFilter('type')}>By Type</MenuItem>
            </MenuList>
          </Menu>

          <Button onClick={handleExport} leftIcon={<ChevronDownIcon />}>
            Export
          </Button>

          <Button colorScheme="blue">
            New Post +
          </Button>
        </HStack>

        <Tabs index={tabIndex} onChange={setTabIndex} variant="soft-rounded">
          <TabList>
            <Tab>Instagram ({tabCounts.instagram})</Tab>
            <Tab>Facebook ({tabCounts.facebook})</Tab>
            <Tab>Twitter ({tabCounts.twitter})</Tab>
            <Tab>Whatsapp ({tabCounts.whatsapp})</Tab>
          </TabList>
        </Tabs>
      </Box>

      <ActiveComponent searchQuery={searchQuery} />
    </Box>
  );
};

export default Product;