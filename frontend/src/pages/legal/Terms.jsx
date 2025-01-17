import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  VStack,
  useColorModeValue,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const termsItems = [
    {
      title: "Account Terms",
      content: "Users must maintain accurate account information and are responsible for all activities under their accounts. Accounts must be registered by adults over 18 years old."
    },
    {
      title: "Service Usage",
      content: "Our services must be used in accordance with applicable laws and regulations. Users agree not to misuse or attempt to gain unauthorized access to our services."
    },
    {
      title: "Payment Terms",
      content: "Users agree to pay all fees associated with the services. Payments are non-refundable unless otherwise specified. We reserve the right to modify pricing with notice."
    },
    {
      title: "Content Policy",
      content: "Users are responsible for their content and must have rights to share any content uploaded to our platform. We reserve the right to remove inappropriate content."
    },
    {