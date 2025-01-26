import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getUser } from './redux/selector';
import { useColors } from '../../../utils/colors';
import { convertToPublicUrl } from '../../../utils/supabase';

const Profile = () => {
  const user = useSelector(getUser);
  const toast = useToast();
  const colors = useColors();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axios.post('/api/v1/user/profile/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast({
        title: 'Upload successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error.response?.data?.error || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload} mt={2}>
          Upload
        </Button>
      </FormControl>
      {user.profilePicture && (
        <Image 
          src={convertToPublicUrl(user.profilePicture)} 
          alt="Profile Picture" 
          boxSize="150px" 
          mt={4} 
        />
      )}
    </Box>
  );
};

export default Profile;
