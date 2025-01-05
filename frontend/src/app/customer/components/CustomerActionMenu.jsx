import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { FiMoreVertical, FiUser, FiEdit2, FiMail, FiPhone } from 'react-icons/fi';

const CustomerActionMenu = ({ customer, onView, onUpdateSegment }) => {
  const handleSegmentUpdate = (newSegment) => {
    onUpdateSegment(customer._id, customer.segment, newSegment);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FiMoreVertical />}
        variant="ghost"
        size="sm"
        onClick={(e) => e.stopPropagation()}
      />
      <MenuList onClick={(e) => e.stopPropagation()}>
        <MenuItem icon={<FiUser />} onClick={() => onView(customer._id)}>
          View Profile
        </MenuItem>
        <MenuItem icon={<FiEdit2 />}>
          Update Segment
          <Menu placement="right-start">
            <MenuList>
              <MenuItem onClick={() => handleSegmentUpdate('bronze')}>
                Bronze
              </MenuItem>
              <MenuItem onClick={() => handleSegmentUpdate('silver')}>
                Silver
              </MenuItem>
              <MenuItem onClick={() => handleSegmentUpdate('gold')}>
                Gold
              </MenuItem>
              <MenuItem onClick={() => handleSegmentUpdate('platinum')}>
                Platinum
              </MenuItem>
            </MenuList>
          </Menu>
        </MenuItem>
        <MenuItem icon={<FiMail />}>Send Email</MenuItem>
        <MenuItem icon={<FiPhone />}>Call</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CustomerActionMenu;
