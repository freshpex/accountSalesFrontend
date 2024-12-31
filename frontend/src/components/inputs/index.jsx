import { useState } from "react";
import {
  Input,
  InputGroup,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export const TextInput = ({
  type,
  name,
  handleChange,
  value,
  placeholder,
  borderRadius,
  disabled,
  handleBlur,
  transform,
}) => {
  return (
    <Input
      type={type}
      name={name}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      fontSize={"14px"}
      focusBorderColor={"gray.600"}
      onBlur={handleBlur}
      isDisabled={disabled}
      fontWeight={"400"}
      border="1px solid #D9D8DA"
      w="100%"
      textTransform={transform ? "capitalize" : null}
      borderRadius={borderRadius || "6px"}
      _placeholder={{
        color: "#BFBEC2",
      }}
    />
  );
};

export const PasswordInput = ({
  name,
  handleChange,
  value,
  placeholder,
  onBlur,
  borderRadius,
}) => {
  const [hide, setHide] = useState(true);

  return (
    <div>
      <InputGroup>
        <Input
          type={hide ? "password" : "text"}
          name={name}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          borderRadius={borderRadius || "6px"}
          fontSize={"14px"}
          focusBorderColor={"gray.600"}
          onBlur={onBlur}
          fontWeight={"400"}
          border="1px solid #D9D8DA"
          _placeholder={{
            color: "#BFBEC2",
          }}
        />
        <InputRightElement>
          <IconButton
            onClick={() => setHide(!hide)}
            icon={
              hide ? (
                <FaRegEye color={"#D9D8DA"} size={18} />
              ) : (
                <FaRegEyeSlash color={"#D9D8DA"} size={18} />
              )
            }
            bg="transparent"
            _hover={{
              bg: "transparent",
            }}
          />
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
