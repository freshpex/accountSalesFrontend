import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Text,
  Image,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { userData } from '../data';

const Account = () => {
  const [profileData, setProfileData] = useState(userData.profileInfo);
  const [contactData, setContactData] = useState(userData.contactDetails);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const handleProfileUpdate = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      status: "success",
      duration: 3000,
    });
  };

  return (
    <Stack spacing={8}>
      {/* Profile Information Section */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Profile Information
        </Text>
        <Flex mb={6} alignItems="center">
          <Box position="relative">
            <Image
              src={profileData.profilePicture}
              alt="Profile"
              boxSize="100px"
              borderRadius="full"
              objectFit="cover"
            />
            <IconButton
              icon={<EditIcon />}
              size="sm"
              position="absolute"
              bottom={0}
              right={0}
              colorScheme="blue"
              rounded="full"
              aria-label="Change picture"
            />
          </Box>
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={profileData.lastName}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Input
              value={profileData.gender}
              onChange={(e) =>
                setProfileData({ ...profileData, gender: e.target.value })
              }
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Date Birthday</FormLabel>
            <Input
              value={profileData.birthDate}
              onChange={(e) =>
                setProfileData({ ...profileData, birthDate: e.target.value })
              }
              isDisabled={!isEditing}
            />
          </FormControl>
        </Grid>

        <Flex mt={6} gap={4}>
          <Button
            colorScheme="blue"
            onClick={handleProfileUpdate}
            isDisabled={!isEditing}
          >
            Update
          </Button>
          <Button
            variant="ghost"
            onClick={() => setIsEditing(false)}
            isDisabled={!isEditing}
          >
            Cancel
          </Button>
        </Flex>
      </Box>

      {/* Contact Details Section */}
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Contact Detail
          </Text>
          <IconButton
            icon={<EditIcon />}
            variant="ghost"
            onClick={() => setIsEditing(true)}
            aria-label="Edit contact details"
          />
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              value={contactData.phoneNumber}
              isReadOnly
              bg="gray.100"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input
              value={contactData.country}
              isReadOnly
              bg="gray.100"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              value={contactData.address}
              isReadOnly
              bg="gray.100"
            />
          </FormControl>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Account;