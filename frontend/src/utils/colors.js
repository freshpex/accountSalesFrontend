import { useColorModeValue } from "@chakra-ui/react";

export const useColors = () => ({
    // Base colors
    bgColor: useColorModeValue("gray.50", "gray.900"),
    cardBg: useColorModeValue("white", "gray.800"),
    textColor: useColorModeValue("gray.800", "gray.100"),
    
    // Component specific
    tableBg: useColorModeValue("white", "gray.800"),
    tableHeaderBg: useColorModeValue("gray.50", "gray.700"),
    tableHoverBg: useColorModeValue("gray.50", "gray.700"),
    tableStripedBg: useColorModeValue("gray.50", "gray.750"),
    
    // Interactive elements
    buttonPrimaryBg: useColorModeValue("blue.500", "blue.400"),
    buttonPrimaryHover: useColorModeValue("blue.600", "blue.500"),
    buttonSecondaryBg: useColorModeValue("gray.200", "gray.600"),
    buttonSecondaryHover: useColorModeValue("gray.300", "gray.500"),
    
    // Accents
    accentLight: useColorModeValue("blue.50", "blue.900"),
    accentMedium: useColorModeValue("blue.100", "blue.800"),
    accentBorder: useColorModeValue("blue.200", "blue.700"),
    
    // Borders
    borderColor: useColorModeValue("gray.200", "gray.600"),
    borderHover: useColorModeValue("gray.300", "gray.500"),
    dividerColor: useColorModeValue("gray.200", "gray.700"),
    
    // Status colors
    successBg: useColorModeValue("green.50", "green.900"),
    warningBg: useColorModeValue("orange.50", "orange.900"),
    errorBg: useColorModeValue("red.50", "red.900"),
    infoBg: useColorModeValue("blue.50", "blue.900"),
    
    // Shadows
    shadowLight: useColorModeValue("lg", "dark-lg"),
    shadowMedium: "0 4px 12px rgba(0, 0, 0, 0.1)",
    glassShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    
    // Glass effects
    glassBg: useColorModeValue(
        "rgba(255, 255, 255, 0.8)",
        "rgba(26, 32, 44, 0.8)"
    ),
    glassHover: useColorModeValue(
        "rgba(255, 255, 255, 0.9)",
        "rgba(26, 32, 44, 0.9)"
    ),
    
    // Scrollbar
    scrollTrack: useColorModeValue("gray.100", "gray.700"),
    scrollThumb: useColorModeValue("gray.300", "gray.600"),
    scrollThumbHover: useColorModeValue("gray.400", "gray.500"),
    
    // Image related
    imageCardBg: useColorModeValue('gray.50', 'gray.700'),
    imageHoverOverlay: useColorModeValue(
        'rgba(255, 255, 255, 0.9)',
        'rgba(26, 32, 44, 0.9)'
    ),
    imageBorder: useColorModeValue('gray.200', 'gray.600'),
    
    // Card effects
    cardShadow: useColorModeValue(
        '0 4px 6px rgba(160, 174, 192, 0.1)',
        '0 4px 6px rgba(0, 0, 0, 0.4)'
    ),
    cardHoverShadow: useColorModeValue(
        '0 10px 15px rgba(160, 174, 192, 0.2)',
        '0 10px 15px rgba(0, 0, 0, 0.5)'
    ),
    
    // Table enhancements
    tableRowHoverBg: useColorModeValue('gray.50', 'gray.700'),
    tableAccentBg: useColorModeValue('blue.50', 'blue.900'),
    tableSelectedBg: useColorModeValue('blue.50', 'blue.800'),

    // Product Detail specific
    productCardBg: useColorModeValue('white', 'gray.800'),
    productImageBg: useColorModeValue('gray.50', 'gray.700'),
    productStatsBg: useColorModeValue('gray.50', 'gray.700'),
    productTabBg: useColorModeValue('white', 'gray.800'),
    productTabSelected: useColorModeValue('blue.50', 'blue.900'),
    productTabHover: useColorModeValue('gray.50', 'gray.700'),
    
    // Escrow specific
    escrowCardBg: useColorModeValue('white', 'gray.800'),
    escrowStepBg: useColorModeValue('gray.50', 'gray.700'),
    escrowStepActive: useColorModeValue('blue.50', 'blue.900'),
    escrowStepComplete: useColorModeValue('green.50', 'green.900'),
    escrowProgressBg: useColorModeValue('gray.100', 'gray.600'),
    escrowProgressFill: useColorModeValue('blue.500', 'blue.400'),
    
    // Shared components
    statCardBg: useColorModeValue('white', 'gray.800'),
    statCardHover: useColorModeValue('gray.50', 'gray.700'),
    infoCardBg: useColorModeValue('blue.50', 'blue.900'),
    warningCardBg: useColorModeValue('orange.50', 'orange.900'),
    successCardBg: useColorModeValue('green.50', 'green.900'),
});