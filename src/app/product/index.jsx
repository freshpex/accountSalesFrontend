import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { useFilters } from '../../context/FilterContext';
import { exportToCSV } from '../../utils/export';

const Product = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { filters, updateFilters } = useFilters();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Set active tab based on URL
    const path = location.pathname.split('/').pop();
    switch(path) {
      case 'instagram':
        setTabIndex(0);
        break;
      case 'facebook':
        setTabIndex(1);
        break;
      case 'twitter':
        setTabIndex(2);
        break;
      case 'whatsapp':
        setTabIndex(3);
        break;
      default:
        setTabIndex(0);
    }
  }, [location]);

  const components = [Instagram, Facebook, Twitter, Whatsapp];
  const ActiveComponent = components[tabIndex];

  const handleSearch = (value) => {
    setSearchQuery(value);
    updateFilters({ search: value });
  };

  const handleFilter = (type, value) => {
    updateFilters({ [type]: value });
  };

  const handleExport = () => {
    const currentTab = ['instagram', 'facebook', 'twitter', 'whatsapp'][tabIndex];
    exportToCSV(filteredData, `${currentTab}-export-${new Date().toISOString()}`);
  };

  const applyFilters = (data) => {
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          item.content.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesType = !filters.type || item.type === filters.type;
      const matchesDate = !filters.date || new Date(item.date) >= new Date(filters.date);
      
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
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
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
          
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Menu placement="right-start">
                  <MenuButton w="full">Status</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleFilter('status', 'active')}>Active</MenuItem>
                    <MenuItem onClick={() => handleFilter('status', 'inactive')}>Inactive</MenuItem>
                    <MenuItem onClick={() => handleFilter('status', null)}>Clear</MenuItem>
                  </MenuList>
                </Menu>
              </MenuItem>
              <MenuItem>
                <Input
                  type="date"
                  onChange={(e) => handleFilter('date', e.target.value)}
                />
              </MenuItem>
              <MenuItem onClick={() => handleFilter('type', null)}>Clear All</MenuItem>
            </MenuList>
          </Menu>

          <Button 
            onClick={handleExport} 
            leftIcon={<ChevronDownIcon />}
          >
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

      <ActiveComponent 
        searchQuery={searchQuery} 
        filters={filters}
        onDataFiltered={setFilteredData}
        applyFilters={applyFilters}
      />
    </Box>
  );
};

export default Product;