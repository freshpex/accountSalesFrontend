import { Box, Text, Center, Button, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

const EmptyStatePage = ({
  title,
  sub,
  btnText,
  link,
  icon,
  isLink,
  handleClick,
}) => {
  const renderButton = () => {
    if (!btnText) return null;

    const buttonContent = (
      <Button
        mt="16px"
        _hover={{ opacity: 0.8 }}
        textTransform="capitalize"
        onClick={handleClick}
        _active={{
          opacity: 0.8,
        }}
      >
        <Icon as={IoAddCircleOutline} mr={2} />
        {btnText}
      </Button>
    );

    return (
      <Center>
        {isLink ? <Link to={link}>{buttonContent}</Link> : buttonContent}
      </Center>
    );
  };

  return (
    <Box display="grid" placeItems="center" h="70vh">
      <Box>
        {icon && (
          <Center>
            <Box>{icon}</Box>
          </Center>
        )}

        <Text
          textStyle="xlx"
          color="gray.600"
          textAlign="center"
          textTransform="capitalize"
        >
          {title}
        </Text>
        <Center>
          <Text
            textStyle="lgg"
            color="gray.400"
            mt="16px"
            textAlign="center"
            w={{ base: "full", md: "293px" }}
          >
            {sub}
          </Text>
        </Center>

        {renderButton()}
      </Box>
    </Box>
  );
};

export default EmptyStatePage;
