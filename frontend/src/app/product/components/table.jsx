import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  HStack,
  Box,
  Text,
  Select,
  Button,
  Stack,
  useBreakpointValue,
  Flex,
  Grid,
  useColorModeValue,
  Circle,
  Tooltip,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Divider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Icon,
} from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, TimeIcon, CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { FiPackage } from 'react-icons/fi';
import EmptyStatePage from '../../../components/emptyState';

const MotionBox = motion(Box);

const DataTable = ({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  getStatusColor,
  currentPage,
  pageSize,
  onPageChange
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgCard = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const theadBgColor = useColorModeValue('white', 'gray.800');

  if (!data?.length) {
    return (
      <EmptyStatePage
        title="No Data Available"
        sub="There are no items to display"
        icon={<FiPackage size={50} />}
      />
    );
  }

  const handleSelectAll = (e) => {
    setSelectedItems(
      e.target.checked ? data.map(item => item.id) : []
    );
  };

  const handleSelectItem = (id) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter(item => item !== id)
        : [...selectedItems, id]
    );
  };

  const renderMobileCard = (item) => (
    <MotionBox
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      bg={bgCard}
      p={4}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: 'md',
        borderColor: 'blue.400',
      }}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <Flex direction="column" gap={2}>
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
            {columns[0].label}
          </Text>
          <Text fontWeight="semibold">{item[columns[0].key]}</Text>
        </Flex>

        <Flex direction="column" gap={2} align="flex-end">
          <Circle size="8" bg={getStatusColor(item.status)?.bg || 'gray.100'}>
            {item.status && (
              <Icon 
                as={
                  item.status.toLowerCase() === 'completed' ? CheckIcon :
                  item.status.toLowerCase() === 'pending' ? TimeIcon :
                  WarningIcon
                } 
                color={getStatusColor(item.status)?.color || 'gray.800'}
              />
            )}
          </Circle>
        </Flex>

        {columns.slice(1).map((column) => (
          <Flex key={column.key} direction="column" gap={1}>
            <Text fontSize="sm" color="gray.500">
              {column.label}
            </Text>
            {column.key === 'status' ? (
              <Tag
                size="md"
                variant="subtle"
                colorScheme={
                  (item[column.key]?.toLowerCase() === 'available' ? 'green' :
                  item[column.key]?.toLowerCase() === 'sold' ? 'gray' :
                  'yellow')
                }
              >
                <TagLeftIcon boxSize="12px" as={
                  item[column.key]?.toLowerCase() === 'available' ? CheckIcon :
                  item[column.key]?.toLowerCase() === 'sold' ? TimeIcon :
                  WarningIcon
                } />
                <TagLabel>{item[column.key]}</TagLabel>
              </Tag>
            ) : (
              <Text fontWeight="medium">{item[column.key] || '-'}</Text>
            )}
          </Flex>
        ))}
      </Grid>

      <Divider my={4} />

      <Flex justify="space-between" align="center">
        <HStack>
          <Checkbox
            isChecked={selectedItems.includes(item.id)}
            onChange={() => handleSelectItem(item.id)}
            colorScheme="blue"
          />
          <Text fontSize="sm" color="gray.500">
            Select
          </Text>
        </HStack>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<ChevronDownIcon />}
            variant="ghost"
            size="sm"
          />
          <MenuList>
            <MenuItem icon={<ViewIcon />} onClick={() => onView(item)}>
              View Details
            </MenuItem>
            <MenuItem icon={<EditIcon />} onClick={() => onEdit(item)}>
              Edit
            </MenuItem>
            <MenuItem icon={<DeleteIcon />} onClick={() => onDelete(item)} color="red.400">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </MotionBox>
  );

  const renderDesktopTable = () => (
    <Box
      position="relative" 
      overflowX="auto"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
    >
      <Table variant="simple" sx={{
        'th, td': {
          whiteSpace: 'nowrap',
        },
        'thead': {
          position: 'sticky',
          top: 0,
          backgroundColor: theadBgColor,
        }
      }}>
        <Thead bg={bgCard}>
          <Tr>
            <Th w="40px">
              <Checkbox
                isChecked={selectedItems.length === data.length}
                isIndeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                onChange={handleSelectAll}
                colorScheme="blue"
              />
            </Th>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr
              key={item.id}
              as="tr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              _hover={{ bg: hoverBg }}
            >
              <Td>
                <Checkbox
                  isChecked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  colorScheme="blue"
                />
              </Td>
              {columns.map((column) => (
                <Td key={column.key}>
                  {column.key === 'status' ? (
                    <Tag
                      size="md"
                      variant="subtle"
                      colorScheme={
                        item[column.key].toLowerCase() === 'available' ? 'green' :
                        item[column.key].toLowerCase() === 'sold' ? 'gray' :
                        'yellow'
                      }
                    >
                      <TagLeftIcon boxSize="12px" as={
                        item[column.key].toLowerCase() === 'available' ? CheckIcon :
                        item[column.key].toLowerCase() === 'sold' ? TimeIcon :
                        WarningIcon
                      } />
                      <TagLabel>{item[column.key]}</TagLabel>
                    </Tag>
                  ) : (
                    <Text>{item[column.key]}</Text>
                  )}
                </Td>
              ))}
              <Td>
                <HStack spacing={2}>
                  <Tooltip label="View Details">
                    <IconButton
                      icon={<ViewIcon />}
                      variant="ghost"
                      colorScheme="blue"
                      size="sm"
                      onClick={() => onView(item)}
                    />
                  </Tooltip>
                  <Tooltip label="Edit">
                    <IconButton
                      icon={<EditIcon />}
                      variant="ghost"
                      colorScheme="green"
                      size="sm"
                      onClick={() => onEdit(item)}
                    />
                  </Tooltip>
                  <Tooltip label="Delete">
                    <IconButton
                      icon={<DeleteIcon />}
                      variant="ghost"
                      colorScheme="red"
                      size="sm"
                      onClick={() => onDelete(item)}
                    />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  return (
    <Box>
      <Stack spacing={6}>
        {isMobile ? (
          <Stack spacing={4}>
            {data?.map(renderMobileCard)}
          </Stack>
        ) : (
          renderDesktopTable()
        )}

        <Flex
          justify="space-between"
          align="center"
          p={4}
          bg={bgCard}
          borderRadius="lg"
          shadow="sm"
        >
          <Text color="gray.600" fontSize="sm">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, data.length)} of {data.length} entries
          </Text>
          <HStack spacing={2}>
            <Button
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              leftIcon={<ChevronLeftIcon />}
              variant="outline"
              colorScheme="blue"
            >
              Previous
            </Button>
            <Select
              size="sm"
              value={currentPage}
              onChange={(e) => onPageChange(Number(e.target.value))}
              w="70px"
              borderRadius="md"
            >
              {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </Select>
            <Button
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              isDisabled={currentPage === Math.ceil(data.length / pageSize)}
              rightIcon={<ChevronRightIcon />}
              variant="outline"
              colorScheme="blue"
            >
              Next
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default DataTable;
