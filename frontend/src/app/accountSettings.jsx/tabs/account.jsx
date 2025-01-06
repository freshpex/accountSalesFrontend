import { useState, useEffect } from 'react';
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
import LoadingSpinner from '../../../components/LoadingSpinner';
import { convertToPublicUrl } from '../../../utils/supabase';

const Account = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const loading = useSelector(getLoading);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    dispatch(fetch_profile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsEditing(true);
  };

  const handleProfileUpdate = () => {
    dispatch(update_profile(formData));
    setIsEditing(false);
    toast({
      title: "Profile updated successfully",
      status: "success",
      duration: 3000,
    });
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(upload_profile_picture(file));
      toast({
        title: "Profile picture uploading",
        status: "info",
        duration: 2000,
      });
    }
  };

  const handleCancel = () => {
    dispatch(fetch_profile());
    setIsEditing(false);
    toast({
      title: "Changes cancelled",
      status: "info",
      duration: 2000,
    });
  };

  if (loading) {
    return <LoadingSpinner />;
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
              src={profile.profilePicture ? convertToPublicUrl(profile.profilePicture) : '/logo.svg'}
              alt="Profile"
              boxSize="100px"
              borderRadius="full"
              objectFit="cover"
            />
            <Input
              type="file"
              accept="image/*"
              display="none"
              id="profile-picture"
              onChange={handlePictureUpload}
            />
            <IconButton
              as="label"
              htmlFor="profile-picture"
              icon={<EditIcon />}
              size="sm"
              position="absolute"
              bottom={0}
              right={0}
              colorScheme="blue"
              rounded="full"
              cursor="pointer"
              aria-label="Change picture"
            />
          </Box>
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              value={formData?.firstName || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              value={formData?.lastName || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Input
              name="gender"
              value={formData?.gender || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Date Birthday</FormLabel>
            <Input
              name="birthDate"
              type="date"
              value={formData?.birthDate || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>
        </Grid>

        <Flex mt={6} gap={4}>
          {!isEditing ? (
            <Button
              leftIcon={<EditIcon />}
              colorScheme="blue"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                colorScheme="blue"
                onClick={handleProfileUpdate}
              >
                Save Changes
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </Flex>
      </Box>

      {/* Contact Details Section */}
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Contact Details
          </Text>
          <Button
            leftIcon={<EditIcon />}
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(prev => !prev)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phoneNumber"
              value={formData?.phoneNumber || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input
              name="country"
              value={formData?.country || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData?.address || ''}
              onChange={handleInputChange}
              isDisabled={!isEditing}
            />
          </FormControl>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Account;