import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
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
  ModalCloseButton,
} from "@chakra-ui/react";

const AddProduct = ({ isOpen, onClose, data, action, onSave, onDelete }) => {
  const [postId, setPostId] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Active");
  const [date, setDate] = useState("");
  const [engagement, setEngagement] = useState("");
  const [images, setImages] = useState(["", "", "", ""]);

  useEffect(() => {
    if (data) {
      setPostId(data.postId || "");
      setContent(data.content || "");
      setStatus(data.status || "Active");
      setDate(data.date || "");
      setEngagement(data.engagement || "");
      setImages(data.images || ["", "", "", ""]);
    } else {
      setPostId("");
      setContent("");
      setStatus("Active");
      setDate("");
      setEngagement("");
      setImages(["", "", "", ""]);
    }
  }, [data]);

  const handleSave = () => {
    const updatedPost = {
      postId,
      content,
      status,
      date,
      engagement,
      images,
    };
    onSave(updatedPost);
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalCloseButton />
        <Box p={6}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {action === "add" && "Add Post"}
            {action === "view" && "View Post"}
            {action === "edit" && "Edit Post"}
          </Text>

          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Post ID</FormLabel>
              <Input
                value={postId}
                isReadOnly={action === "view"}
                onChange={(e) => setPostId(e.target.value)}
                placeholder="Enter Post ID"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={content}
                isReadOnly={action === "view"}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter Post Content"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                value={status}
                isReadOnly={action === "view"}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="datetime-local"
                value={date}
                isReadOnly={action === "view"}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Engagement</FormLabel>
              <Input
                value={engagement}
                isReadOnly={action === "view"}
                onChange={(e) => setEngagement(e.target.value)}
                placeholder="Enter Engagement"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Images</FormLabel>
              <SimpleGrid columns={4} spacing={2}>
                {images.map((image, index) => (
                  <Box
                    key={index}
                    border="1px dashed gray"
                    rounded="md"
                    p={2}
                    textAlign="center"
                  >
                    {image ? (
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        objectFit="cover"
                        boxSize="80px"
                      />
                    ) : (
                      <Text fontSize="sm" color="gray.500">
                        Photo {index + 1}
                      </Text>
                    )}
                    {action !== "view" && (
                      <Input
                        type="file"
                        mt={2}
                        onChange={(e) =>
                          handleImageChange(index, URL.createObjectURL(e.target.files[0]))
                        }
                      />
                    )}
                  </Box>
                ))}
              </SimpleGrid>
            </FormControl>

            {action !== "view" && (
              <HStack spacing={4} justifyContent="flex-end">
                <Button colorScheme="gray" onClick={() => onDelete(postId)}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleSave}>
                  Save Post
                </Button>
              </HStack>
            )}
          </VStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AddProduct;
