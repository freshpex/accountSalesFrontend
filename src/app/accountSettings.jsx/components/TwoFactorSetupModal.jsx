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
  Text,
  PinInput,
  PinInputField,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

const TwoFactorSetupModal = ({ isOpen, onClose, qrCode, onVerify }) => {
  const [pin, setPin] = useState("");

  const handleVerify = () => {
    onVerify(pin);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Set Up Two-Factor Authentication</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6}>
            <Text>Scan this QR code with your authenticator app:</Text>
            <Image src={qrCode} alt="2FA QR Code" boxSize="200px" />
            <Text>Enter the verification code:</Text>
            <HStack>
              <PinInput value={pin} onChange={setPin}>
                {[...Array(6)].map((_, i) => (
                  <PinInputField key={i} />
                ))}
              </PinInput>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleVerify}
            isDisabled={pin.length !== 6}
          >
            Verify
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TwoFactorSetupModal;
