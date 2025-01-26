import {
    ListItem,
    ListIcon,
  } from '@chakra-ui/react';
  import {
    FiCheck,
  } from 'react-icons/fi';
  
  const IncludedItem = ({ text }) => (
    <ListItem>
      <ListIcon as={FiCheck} color="green.500" />
      {text}
    </ListItem>
  );

export default IncludedItem