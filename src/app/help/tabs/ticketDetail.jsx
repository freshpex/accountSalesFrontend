import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Textarea,
  Divider,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ticketStatusColors, ticketPriorityColors } from "../data";
import { useColors } from "../../../utils/colors";

const TicketDetail = ({
  isOpen,
  onClose,
  ticket,
  onStatusUpdate,
  onAddResponse,
  onDelete,
}) => {
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState(ticket?.status);
  const colors = useColors();
  const currentUser = useSelector(
    (state) => state.accountSettings.data.profile,
  );
  const isAdmin = currentUser?.role === "admin";

  const customerName = ticket?.customerDetails?.name || "Anonymous User";
  const customerEmail = ticket?.customerDetails?.email;
  const customerAvatar = ticket?.customerDetails?.profilePicture;

  const handleReply = () => {
    onAddResponse(ticket._id, {
      message: reply,
      timestamp: new Date().toISOString(),
      sender: isAdmin ? "admin" : "customer",
      senderDetails: {
        id: currentUser._id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        role: currentUser.role,
      },
    });
    setReply("");
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusUpdate(ticket._id, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      onDelete(ticket._id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={colors.bgColor} color={colors.textColor}>
        <ModalHeader>
          <HStack justify="space-between">
            <Text>Ticket Details</Text>
            <HStack>
              {isAdmin ? (
                <Select
                  width="150px"
                  value={status}
                  onChange={handleStatusChange}
                  size="sm"
                >
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </Select>
              ) : (
                <Badge {...ticketStatusColors[ticket?.status]}>
                  {ticket?.status}
                </Badge>
              )}
              <Button colorScheme="red" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </HStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Avatar size="lg" name={customerName} src={customerAvatar} />
              <Box>
                <HStack spacing={2}>
                  <Text fontSize="xl" fontWeight="bold">
                    {ticket?.subject}
                  </Text>
                  <Badge {...ticketStatusColors[ticket?.status]}>
                    {ticket?.status}
                  </Badge>
                  <Badge {...ticketPriorityColors[ticket?.priority]}>
                    {ticket?.priority}
                  </Badge>
                </HStack>
                <Text color="gray.600">
                  {customerName} ({customerEmail}) -{" "}
                  {new Date(ticket?.createdAt).toLocaleString()}
                </Text>
              </Box>
            </HStack>

            <Box bg={colors.activeColor} p={4} borderRadius="md">
              <Text>{ticket?.message}</Text>
            </Box>

            <Divider />

            {ticket?.responses?.map((response) => (
              <Box
                key={response._id || response.timestamp}
                p={4}
                bg={response.sender === "admin" ? "blue.50" : "gray.50"}
                borderRadius="md"
              >
                <HStack spacing={4} mb={2}>
                  <Avatar
                    size="sm"
                    name={
                      response.senderDetails?.name ||
                      (response.sender === "admin"
                        ? "Support Team"
                        : customerName)
                    }
                  />
                  <Text fontWeight="bold">
                    {response.senderDetails?.name ||
                      (response.sender === "admin"
                        ? "Support Team"
                        : customerName)}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {new Date(
                      response.timestamp || response.createdAt,
                    ).toLocaleString()}
                  </Text>
                </HStack>
                <Text ml={12}>{response.message}</Text>
              </Box>
            ))}

            <Box mt={4}>
              <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply..."
                rows={4}
                mb={4}
              />
              <HStack justify="flex-end">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  isDisabled={!reply.trim()}
                  onClick={handleReply}
                >
                  Send Reply
                </Button>
              </HStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TicketDetail;
