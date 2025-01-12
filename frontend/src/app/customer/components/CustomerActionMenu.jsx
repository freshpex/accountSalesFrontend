import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure } from '@chakra-ui/react';
import { FiMoreVertical, FiUser, FiEdit2, FiMail, FiPhone } from 'react-icons/fi';
import UpdateSegmentModal from './UpdateSegmentModal';
import ViewProfileModal from './ViewProfileModal';

const CustomerActionMenu = ({ customer, onUpdateSegment }) => {
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose
  } = useDisclosure();

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose
  } = useDisclosure();

  const handleEmailClick = (e) => {
    e.stopPropagation();
    if (customer.email) {
      window.location.href = `mailto:${customer.email}`;
    }
  };

  const handlePhoneClick = (e) => {
    e.stopPropagation();
    if (customer.phoneNumber) {
      window.location.href = `tel:${customer.phoneNumber}`;
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiMoreVertical />}
          variant="ghost"
          size="sm"
          onClick={(e) => e.stopPropagation()}
        />
        <MenuList onClick={(e) => e.stopPropagation()}>
        <MenuItem icon={<FiUser />} onClick={onViewOpen}>
            View Profile
          </MenuItem>
          <MenuItem icon={<FiEdit2 />} onClick={onUpdateOpen}>
            Update Segment
          </MenuItem>
          <MenuItem 
            icon={<FiMail />} 
            onClick={handleEmailClick}
            isDisabled={!customer.email}
          >
            Send Email
          </MenuItem>
          <MenuItem 
            icon={<FiPhone />} 
            onClick={handlePhoneClick}
            isDisabled={!customer.phoneNumber}
          >
            Call
          </MenuItem>
        </MenuList>
      </Menu>

      <UpdateSegmentModal
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        customer={{
          _id: customer.id,
          segment: customer.segment,
        }}
        onUpdate={onUpdateSegment}
      />

      <ViewProfileModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        customer={customer}
      />
    </>
  );
};

export default CustomerActionMenu;
