import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { getLoading } from '../redux/selector';

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

  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setType(data.type);
      setAge(data.age);
      setFollower(data.follower);
      setStatus(data.status);
      setPrice(data.price);
      setRegion(data.region);
      setAbout(data.about);
      setEngagement(data.engagement);
      setImages(data.images);
    } else {
      setUsername("");
      setType("");
      setAge("");
      setFollower("");
      setStatus("");
      setPrice("");
      setRegion("");
      setAbout("");
      setEngagement("");
      setImages(["", "", "", ""]);
    }
  }, [data]);

  const handleSave = () => {
    const formData = new FormData();
    const productData = {
      username,
      type,
      age,
      follower,
      status,
      price,
      region,
      about,
      engagement,
      images
    };

    // Handle file uploads
    if (images) {
      images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append('images', image);
        }
      });
    }

    // Add rest of the data
    Object.keys(productData).forEach(key => {
      if (key !== 'images') {
        formData.append(key, productData[key]);
      }
    });

    onSave(formData);
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file ? URL.createObjectURL(file) : "";
    setImages(newImages);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent maxW="1200px" maxH="90vh" overflowY="auto">
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
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Input the Account Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isReadOnly={isReadOnly}
                  bg={isReadOnly ? "gray.100" : "white"}
                />
              </FormControl>
          
              <FormControl>
                <FormLabel>Product type </FormLabel>
                <Input
                  placeholder="Input product name (Instagram/Twitter/Facebook/Whatsapp"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  isReadOnly={isReadOnly}
                  bg={isReadOnly ? "gray.100" : "white"}
                />
                <Select
                  placeholder="Select product category"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  isDisabled={isReadOnly}
                  bg={isReadOnly ? "gray.100" : "white"}
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="whatsapp">Whatsapp</option>
                </Select>
              </FormControl>
          
              <HStack spacing={4}>
                <FormControl flex={1}>
                  <FormLabel>Age</FormLabel>
                  <Input
                    placeholder="Input How old the account is"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : "white"}
                  />
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel>Follower</FormLabel>
                  <Input
                    placeholder="Input The number of followers"
                    value={follower}
                    onChange={(e) => setFollower(e.target.value)}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : "white"}
                  />
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
                    bg={isReadOnly ? "gray.100" : "white"}
                  >
                    <option value="sold">Sold</option>
                    <option value="available">Available</option>
                  </Select>
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    placeholder="Input price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    isReadOnly={isReadOnly}
                    bg={isReadOnly ? "gray.100" : "white"}
                  />
                </FormControl>
              </HStack>
          
              <FormControl>
                <FormLabel>Region</FormLabel>
                <Input
                  placeholder="Input the account location"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  isReadOnly={isReadOnly}
                  bg={isReadOnly ? "gray.100" : "white"}
                />
              </FormControl>

              <FormControl>
                <FormLabel>About </FormLabel>
                <Input
                  placeholder="Input any additional or new thing about the account"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  isReadOnly={isReadOnly}
                  bg={isReadOnly ? "gray.100" : "white"}
                />
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
              <HStack spacing={4} justifyContent="space-between" mt={4}>
                {action === 'view' ? (
                  <Button
                    colorScheme="blue"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                ) : (
                  <>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      onClick={onClose}
                      mr={3}
                    >
                      Discard Changes
                    </Button>
                    {action === 'delete' ? (
                      <Button
                        colorScheme="red"
                        onClick={() => onDelete && onDelete(data)}
                        mr={3}
                      >
                        Delete
                      </Button>
                    ) :
                    <Button
                      colorScheme="blue"
                      onClick={handleSave}
                    >
                      {action === 'add' ? 'Create' : 'Save Changes'}
                    </Button>
                    }
                  </>
                )}
              </HStack>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProduct;
