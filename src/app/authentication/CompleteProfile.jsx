import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import api from '../../../services/DataService';

const CompleteProfile = () => {
  const location = useLocation();
  const toast = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    phoneNumber: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      const response = await api.post('/api/v1/user/complete-profile', {
        ...formData,
        token
      });

      if (response.data.success) {
        toast.success('Profile completed successfully');
        window.location.href = '/login';
      }
    } catch (error) {
      toast.error(error.message || 'Failed to complete profile');
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Box w="full" p={8} borderRadius="lg" boxShadow="sm">
        <Stack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">Complete Your Profile</Text>
          
          <FormControl isRequired>
            <FormLabel>Business Name</FormLabel>
            <Input
              name="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                businessName: e.target.value
              }))}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Business Type</FormLabel>
            <Select
              name="businessType"
              value={formData.businessType}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                businessType: e.target.value
              }))}
            >
              <option value="retail">Retail Store</option>
              <option value="wholesale">Wholesale</option>
              <option value="service">Service Provider</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                phoneNumber: e.target.value
              }))}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            onClick={handleSubmit}
          >
            Complete Registration
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CompleteProfile;
