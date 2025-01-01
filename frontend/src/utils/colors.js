import { useColorModeValue } from "@chakra-ui/react";

export const getColors = () => {
    return {
        bgColor: useColorModeValue("white", "gray.900"),
        textColor: useColorModeValue("gray.600", "gray.200"),
        activeColor: useColorModeValue("blue.50", "blue.800"),
        borderColor: useColorModeValue("gray.100", "gray.700"),
    };
};