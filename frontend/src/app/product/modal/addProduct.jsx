import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  HStack,
  VStack,
  Image,
  Text,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormErrorMessage,
  Heading
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { getLoading } from '../redux/selector';
import { useColors } from '../../../utils/colors';
import toast from "react-hot-toast";
import { useProductActions } from '../hooks/useProductActions';
import { validateImage, validateProductData } from '../redux/actions';
import { convertToPublicUrl } from '../../../utils/supabase';

const AddProduct = ({ isOpen, onClose, data, action, onSave, onDelete }) => {
  const loading = useSelector(getLoading);
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [follower, setFollower] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [about, setAbout] = useState("");
  const [engagement, setEngagement] = useState("");
  const [images, setImages] = useState(["", "", "", ""]);
  const [imagesPreviews, setImagesPreviews] = useState(['', '', '', '']);
  const [averageLikes, setAverageLikes] = useState("");
  const [averageComments, setAverageComments] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [originalEmailAvailable, setOriginalEmailAvailable] = useState(false);

  const isReadOnly = action === 'view';
  const colors = useColors();

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const [formErrors, setFormErrors] = useState({});

  const renderImage = (image, preview) => {
    if (typeof image === 'string' && image.startsWith('http')) {
      // Convert Supabase URL to public URL
      return convertToPublicUrl(image);
    }
    if (preview) {
      return preview;
    }
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return null;
  };

  useEffect(() => {
    if (data) {
      let formattedImages = [];
      if (data.images) {
        if (Array.isArray(data.images)) {
          formattedImages = data.images;
        } else if (typeof data.images === 'string') {
          formattedImages = [data.images];
        }
        formattedImages = formattedImages.concat(Array(4 - formattedImages.length).fill(''));
      } else {
        formattedImages = ['', '', '', ''];
      }

      setUsername(data.username || '');
      setType(data.type || '');
      setAge(data.age || '');
      setFollower(data.followers || '');
      setStatus(data.status || '');
      setPrice(data.price || '');
      setRegion(data.region || '');
      setAbout(data.about || '');
      setEngagement(data.engagement || '');
      setImages(formattedImages);
      setImagesPreviews(formattedImages);
      setAverageLikes(data.stats?.averageLikes || '');
      setAverageComments(data.stats?.averageComments || '');
      setTwoFactorEnabled(data.security?.twoFactorEnabled || false);
      setOriginalEmailAvailable(data.security?.originalEmailAvailable || false);
    } else {
      setUsername('');
      setType('');
      setAge('');
      setFollower('');
      setStatus('');
      setPrice('');
      setRegion('');
      setAbout('');
      setEngagement('');
      setImages(['', '', '', '']);
      setImagesPreviews(['', '', '', '']);
      setAverageLikes('');
      setAverageComments('');
      setTwoFactorEnabled(false);
      setOriginalEmailAvailable(false);
    }
  }, [data]);

  const { handleAddProduct, handleUpdateProduct, handleDeleteProduct } = useProductActions();

  const handleSave = async () => {
    const productData = {
      username,
      type,
      age: Number(age),
      followers: Number(follower),
      status: status || 'available',
      price: Number(price),
      region,
      about,
      engagement: Number(engagement) || 0
    };

    if (action === 'edit') {
      const existingImages = images.filter(img => typeof img === 'string');
      const newImages = images.filter(img => img instanceof File);
      
      productData.existingImages = existingImages;
      productData.newImages = newImages;
    } else {
      productData.images = images.filter(img => img instanceof File);
    }

    let success;
    if (action === 'add') {
      success = await handleAddProduct(productData);
    } else if (action === 'edit') {
      success = await handleUpdateProduct(data.id, productData);
    }

    if (success) {
      onClose();
      toast.success(`Product ${action === 'add' ? 'added' : 'updated'} successfully`);
    }
  };

  const handleImageChange = (index, file) => {
    try {
      if (!file) {
        const newImages = [...images];
        const newPreviews = [...imagesPreviews];
        newImages[index] = "";
        newPreviews[index] = "";
        setImages(newImages);
        setImagesPreviews(newPreviews);
        return;
      }

      const { isValid, error } = validateImage(file);
      if (!isValid) {
        toast.error(error);
        return;
      }

      const newImages = [...images];
      const newPreviews = [...imagesPreviews];

      newImages[index] = file;
      newPreviews[index] = URL.createObjectURL(file);

      setImages(newImages);
      setImagesPreviews(newPreviews);
    } catch (error) {
      console.error('Image handling error:', error);
      toast.error('Failed to process image');
    }
  };

  useEffect(() => {
    return () => {
      imagesPreviews.forEach(preview => {
        if (preview && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [imagesPreviews]);

  const handleDeleteConfirm = () => {
    onDelete(data.id);
    onDeleteClose();
  };

  const renderActionButtons = () => {
    if (action === 'view') {
      return (
        <Button colorScheme="blue" onClick={onClose}>
          Close
        </Button>
      );
    }

    return (
      <>
        <Button variant="outline" onClick={onClose} mr={3}>
          Cancel
        </Button>
        {action === 'delete' ? (
          <Button colorScheme="red" onClick={onDeleteOpen}>
            Delete
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={loading}
          >
            {action === 'add' ? 'Create Product' : 'Save Changes'}
          </Button>
        )}
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent maxW="1200px" maxH="90vh" overflowY="auto" bg={colors.bgColor} color={colors.textColor}>
          <ModalHeader>
            {action === "add" && "Add"}
            {action === "view" && "View"}
            {action === "edit" && "Edit"}
            {" Product"}
          </ModalHeader>
          <ModalBody>
            <Box display="flex" flexDirection={["column", "column", "row"]} gap={8}>
              {/* Left Section */}
              <VStack spacing={4} align="stretch" flex={1}>
                <FormControl isInvalid={!!formErrors.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="Input the Account Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                  <FormErrorMessage>{formErrors.username}</FormErrorMessage>
                </FormControl>
            
                <FormControl isInvalid={!!formErrors.type}>
                  <FormLabel>Product type </FormLabel>
                  <Input
                    placeholder="Input product name (Instagram/Twitter/Facebook/Whatsapp"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                  <Select
                    placeholder="Select product category"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    isDisabled={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="foreignnumber">Foreign Number</option>
                    <option value="whatsappnumber">WhatsApp Number</option>
                  </Select>
                  <FormErrorMessage>{formErrors.type}</FormErrorMessage>
                </FormControl>
            
                <HStack spacing={4}>
                  <FormControl flex={1} isInvalid={!!formErrors.age}>
                    <FormLabel>Age</FormLabel>
                    <Input
                      placeholder="Input How old the account is"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      isReadOnly={isReadOnly}
                      bg={isReadOnly ? "gray.100" : colors.bgColor}
                    />
                    <FormErrorMessage>{formErrors.age}</FormErrorMessage>
                  </FormControl>
                  <FormControl flex={1} isInvalid={!!formErrors.follower}>
                    <FormLabel>Follower</FormLabel>
                    <Input
                      placeholder="Input The number of followers"
                      value={follower}
                      onChange={(e) => setFollower(e.target.value)}
                      isReadOnly={isReadOnly}
                      bg={isReadOnly ? "gray.100" : colors.bgColor}
                    />
                    <FormErrorMessage>{formErrors.follower}</FormErrorMessage>
                  </FormControl>
                </HStack>
            
                <HStack spacing={4}>
                  <FormControl flex={1}>
                    <FormLabel>Status</FormLabel>
                    <Select
                      placeholder="Select product category"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      isDisabled={isReadOnly}
                      bg={isReadOnly ? "gray.100" : colors.bgColor}
                    >
                      <option value="sold">Sold</option>
                      <option value="available">Available</option>
                    </Select>
                  </FormControl>
                  <FormControl flex={1} isInvalid={!!formErrors.price}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      placeholder="Input price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      isReadOnly={isReadOnly}
                      bg={isReadOnly ? "gray.100" : colors.bgColor}
                    />
                    <FormErrorMessage>{formErrors.price}</FormErrorMessage>
                  </FormControl>
                </HStack>
            
                <FormControl isInvalid={!!formErrors.region}>
                  <FormLabel>Region</FormLabel>
                  <Input
                    placeholder="Input the account location"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                  <FormErrorMessage>{formErrors.region}</FormErrorMessage>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Engagement Rate (%)</FormLabel>
                  <Input
                    placeholder="Input engagement rate percentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={engagement}
                    onChange={(e) => setEngagement(e.target.value)}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                </FormControl>

                <FormControl isInvalid={!!formErrors.about}>
                  <FormLabel>About </FormLabel>
                  <Input
                    placeholder="Input any additional or new thing about the account"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : colors.bgColor}
                  />
                  <FormErrorMessage>{formErrors.about}</FormErrorMessage>
                </FormControl>

                {/* Add Statistics Section */}
                <Box>
                  <Heading size="sm" mb={4}>Account Statistics (Optional)</Heading>
                  <SimpleGrid columns={2} spacing={4}>
                    <FormControl>
                      <FormLabel>Average Likes</FormLabel>
                      <Input
                        type="number"
                        placeholder="Enter average likes"
                        value={averageLikes}
                        onChange={(e) => setAverageLikes(e.target.value)}
                        isReadOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Average Comments</FormLabel>
                      <Input
                        type="number"
                        placeholder="Enter average comments"
                        value={averageComments}
                        onChange={(e) => setAverageComments(e.target.value)}
                        isReadOnly={isReadOnly}
                      />
                    </FormControl>
                  </SimpleGrid>
                </Box>

                {/* Add Security Section */}
                <Box>
                  <Heading size="sm" mb={4}>Security Features</Heading>
                  <SimpleGrid columns={2} spacing={4}>
                    <FormControl>
                      <FormLabel>2FA Status</FormLabel>
                      <Select
                        value={twoFactorEnabled ? 'true' : 'false'}
                        onChange={(e) => setTwoFactorEnabled(e.target.value === 'true')}
                        isDisabled={isReadOnly}
                      >
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Original Email</FormLabel>
                      <Select
                        value={originalEmailAvailable ? 'true' : 'false'}
                        onChange={(e) => setOriginalEmailAvailable(e.target.value === 'true')}
                        isDisabled={isReadOnly}
                      >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                </Box>
              </VStack>

              {/* Right Section: Image Upload */}
              <Box flex={1}>
                <Text fontWeight="bold" mb={2}>
                  Image Product
                </Text>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  Note: Format photos SVG, PNG, or JPG (Max size 4MB)
                </Text>
            
                {/* Image Grid */}
                <SimpleGrid columns={4} spacing={4} mb={6}>
                  {images.map((image, index) => (
                    <Box
                      key={index}
                      border="2px dashed #007bff"
                      borderRadius="md"
                      bg="gray.50"
                      p={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      height="100px"
                      textAlign="center"
                      position="relative"
                      onClick={isReadOnly ? undefined : () => document.getElementById(`fileInput-${index}`).click()}
                      cursor={isReadOnly ? "default" : "pointer"}
                    >
                      {(imagesPreviews[index] || image) ? (
                        <>
                          <Image
                            src={renderImage(image, imagesPreviews[index])}
                            alt={`Image ${index + 1}`}
                            objectFit="contain"
                            boxSize="60px"
                            height="100px"
                            fallback={<Box>
                              <FaImage color="#007bff" size={24} />
                              <Text fontSize="xs" color="gray.600" fontWeight="bold" mt={2}>
                                Error loading image
                              </Text>
                            </Box>}
                            onError={(e) => {
                              console.error('Image load error:', {
                                src: e.target.src,
                                originalImage: image,
                                preview: imagesPreviews[index]
                              });
                            }}
                          />
                          {!isReadOnly && (
                            <Button
                              size="xs"
                              colorScheme="red"
                              position="absolute"
                              top="2"
                              right="2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImageChange(index, null);
                              }}
                            >
                              X
                            </Button>
                          )}
                        </>
                      ) : (
                        <Box>
                          <FaImage color="#007bff" size={24} />
                          <Text fontSize="xs" color="gray.600" fontWeight="bold" mt={2}>
                            Photo {index + 1}
                          </Text>
                        </Box>
                      )}
                      {!isReadOnly && (
                        <Input
                          id={`fileInput-${index}`}
                          type="file"
                          accept="image/*"
                          display="none"
                          onChange={(e) => handleImageChange(index, e.target.files[0])}
                        />
                      )}
                    </Box>
                  ))}
                </SimpleGrid>
                <HStack spacing={4} justifyContent="flex-end" mt={4}>
                  {renderActionButtons()}
                </HStack>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Product</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AddProduct;
