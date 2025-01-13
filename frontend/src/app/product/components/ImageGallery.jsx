import PropTypes from 'prop-types';
import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa';
import { convertToPublicUrl } from '../../../utils/supabase';

const ImageGallery = ({ images, onImageClick }) => {
  const processedImages = images?.map(img => convertToPublicUrl(img)) || [];

  if (!images || images.length === 0) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <FaImage size={50} color="gray.300" />
        <Text mt={3} fontSize="lg" color="gray.500">
          No images available
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
      {processedImages.map((image, index) => (
        <Box
          key={index}
          borderRadius="md"
          overflow="hidden"
          cursor="pointer"
          onClick={() => onImageClick(image)}
        >
          <Image
            src={image}
            alt={`Product Image ${index + 1}`}
            objectFit="cover"
            width="100%"
            height="100px"
            fallback={<Box bg="gray.100" height="100px" />}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onImageClick: PropTypes.func.isRequired
};

export default ImageGallery;
