import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColors } from "../../../utils/colors";

const NewTicketModal = ({ isOpen, onClose, onSubmit }) => {
  const [ticket, setTicket] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });

  const colors = useColors();

  const handleSubmit = () => {
    onSubmit(ticket);
    setTicket({ subject: "", message: "", priority: "medium" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={colors.bgColor} color={colors.textColor}>
        <ModalHeader>Create New Support Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                value={ticket.subject}
                onChange={(e) =>
                  setTicket((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="Brief description of your issue"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Priority</FormLabel>
              <Select
                value={ticket.priority}
                onChange={(e) =>
                  setTicket((prev) => ({ ...prev, priority: e.target.value }))
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                value={ticket.message}
                onChange={(e) =>
                  setTicket((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Describe your issue in detail"
                rows={5}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={!ticket.subject || !ticket.message}
          >
            Submit Ticket
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTicketModal;
