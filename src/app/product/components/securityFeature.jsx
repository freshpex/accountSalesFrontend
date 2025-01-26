import { ListItem, ListIcon } from "@chakra-ui/react";
import { FiCheck, FiAlertTriangle } from "react-icons/fi";

const SecurityFeature = ({ text, isAvailable }) => (
  <ListItem>
    <ListIcon
      as={isAvailable ? FiCheck : FiAlertTriangle}
      color={isAvailable ? "green.500" : "orange.500"}
    />
    {text}
  </ListItem>
);

export default SecurityFeature;
