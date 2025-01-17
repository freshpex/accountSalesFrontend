import { useColorModeValue } from "@chakra-ui/react";

export const useColors = () => ({
    bgColor: useColorModeValue("white", "gray.900"),
    textColor: useColorModeValue("gray.600", "gray.200"),
    activeColor: useColorModeValue("blue.50", "blue.800"),
    borderColor: useColorModeValue("gray.100", "gray.700"),
    modalFooterBg: useColorModeValue('gray.50', 'gray.900'),
    cardBg: useColorModeValue('white', 'gray.800'),
    scrollTrack: useColorModeValue('gray.100', 'gray.700'),
    scrollThumb: useColorModeValue('gray.300', 'gray.600'),
    glassBg: useColorModeValue('whiteAlpha.800', 'blackAlpha.800'),
});