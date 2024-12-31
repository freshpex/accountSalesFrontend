import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Flex, FormControl, FormLabel, Grid, Input,
  Stack, Text, Image, IconButton, useToast
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import EmptyStatePage from '../../../components/emptyState';
import {
  getProfile,
  getLoading
} from '../redux/selector';
import {
  fetch_profile,
  update_profile,
  upload_profile_picture
} from '../redux/reducer';

const Account = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(fetch_profile());
  }, [dispatch]);

  if (loading) {
    return <Box p={8}>Loading...</Box>;
  }

  if (!profile) {
    return (
      <EmptyStatePage
        title="No Profile Data"
        sub="Your profile information will appear here"
        icon={<FiUser size={50} />}
      />
    );
  }

  const toast = useToast();

  const handleProfileUpdate = () => {
    dispatch(update_profile(profile));
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
              src={profile.profilePicture}
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
              onClick={() => dispatch(upload_profile_picture())}
            />
          </Box>
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              value={profile.firstName}
              onChange={(e) =>
                dispatch(update_profile({ ...profile, firstName: e.target.value }))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={profile.lastName}
              onChange={(e) =>
                dispatch(update_profile({ ...profile, lastName: e.target.value }))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Input
              value={profile.gender}
              onChange={(e) =>
                dispatch(update_profile({ ...profile, gender: e.target.value }))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Date Birthday</FormLabel>
            <Input
              value={profile.birthDate}
              onChange={(e) =>
                dispatch(update_profile({ ...profile, birthDate: e.target.value }))
              }
            />
          </FormControl>
        </Grid>

        <Flex mt={6} gap={4}>
          <Button
            colorScheme="blue"
            onClick={handleProfileUpdate}
          >
            Update
          </Button>
          <Button
            variant="ghost"
            onClick={() => dispatch(fetch_profile())}
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
            onClick={() => dispatch(fetch_profile())}
            aria-label="Edit contact details"
          />
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              value={profile.phoneNumber}
              isReadOnly
              bg="gray.100"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input
              value={profile.country}
              isReadOnly
              bg="gray.100"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              value={profile.address}
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