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
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { getLoading } from '../redux/selector';
import { useColors } from '../../../utils/colors';
import toast from "react-hot-toast";
import { useProductActions } from '../hooks/useProductActions';
import { validateImage, validateProductData } from '../redux/actions';

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

  const isReadOnly = action === 'view';
  const colors = useColors();

  // Add delete confirmation dialog
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  // Form validation state
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = 'Username is required';
    if (!type) errors.type = 'Product type is required';
    if (!age) errors.age = 'Account age is required';
    if (!follower) errors.follower = 'Follower count is required';
    if (!price) errors.price = 'Price is required';
    if (!region) errors.region = 'Region is required';
    if (!about) errors.about = 'Description is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (data) {
      setUsername(data.username || '');
      setType(data.type || '');
      setAge(data.age || '');
      setFollower(data.followers || '');
      setStatus(data.status || '');
      setPrice(data.price || '');
      setRegion(data.region || '');
      setAbout(data.about || '');
      setEngagement(data.engagement || '');
      setImages(data.images || ['', '', '', '']);
    } else {
      // Reset form
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
      // For edit, separate existing images and new files
      const existingImages = images.filter(img => typeof img === 'string');
      const newImages = images.filter(img => img instanceof File);
      
      productData.existingImages = existingImages;
      productData.newImages = newImages;
    } else {
      // For add, just include the files
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
        newImages[index] = "";
        setImages(newImages);
        return;
      }

      const { isValid, error } = validateImage(file);
      if (!isValid) {
        toast.error(error);
        return;
      }

      const newImages = [...images];
      if (action === 'edit') {
        // For edit mode, keep track of new files vs existing URLs
        if (typeof images[index] === 'string') {
          // If replacing an existing image URL
          newImages[index] = file;
        } else {
          // If adding a new image
          newImages[index] = file;
        }
      } else {
        // For add mode, simply store the file
        newImages[index] = file;
      }
      setImages(newImages);
    } catch (error) {
      console.error('Image handling error:', error);
      toast.error('Failed to process image');
    }
  };

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
                    <option value="whatsapp">Whatsapp</option>
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
                      {image ? (
                        <>
                          <Image
                            src={image}
                            alt={`Image ${index + 1}`}
                            objectFit="contain"
                            boxSize="60px"
                            height="100px"
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
