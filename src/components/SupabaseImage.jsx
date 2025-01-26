import { Image, Skeleton, Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { convertToPublicUrl } from '../utils/supabase';

const SupabaseImage = ({ src, alt, boxSize = '50px', objectFit = 'cover', ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Convert private URL to public URL
  const publicUrl = convertToPublicUrl(src);

  if (!publicUrl) {
    return (
      <Box
        width={boxSize}
        height={boxSize}
        bg="gray.100"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="xs" color="gray.500">No image</Text>
      </Box>
    );
  }

  return (
    <Box position="relative" width={boxSize} height={boxSize}>
      {isLoading && (
        <Skeleton
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          borderRadius="md"
        />
      )}
      <Image
        src={publicUrl}
        alt={alt}
        width="100%"
        height="100%"
        objectFit={objectFit}
        borderRadius="md"
        opacity={isLoading ? 0 : 1}
        transition="opacity 0.2s"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
      {error && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="gray.100"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xs" color="gray.500">Error</Text>
        </Box>
      )}
    </Box>
  );
};

export default SupabaseImage;
