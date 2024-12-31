import { Box, Text, Center, Button } from "@chakra-ui/react";
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
  return (
    <Box display={"grid"} placeItems="center" h="70vh">
      <Box>
        {icon && (
          <Center>
            <Box>{icon}</Box>
          </Center>
        )}

        <Text
          textStyle="xlx"
          color={"gray.600"}
          textAlign={"center"}
          textTransform={"capitalize"}
        >
          {title}
        </Text>
        <Center>
          <Text
            textStyle="lgg"
            color={"gray.400"}
            mt="16px"
            textAlign={"center"}
            w={{ base: "full", md: "293px" }}
          >
            {sub}
          </Text>
        </Center>

        {btnText && (
          <Center>
            {!isLink ? (
              <Button
                mt="16px"
                _hover={{ opacity: 0.8 }}
                textTransform={"capitalize"}
                leftIcon={<IoAddCircleOutline />}
                onClick={handleClick}
                _active={{
                  opacity: 0.8,
                }}
              >
                {btnText}
              </Button>
            ) : (
              <Button
                mt="16px"
                _hover={{ opacity: 0.8 }}
                textTransform={"capitalize"}
                leftIcon={<IoAddCircleOutline />}
              >
                <Link to={link}>{btnText}</Link>
              </Button>
            )}
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default EmptyStatePage;
