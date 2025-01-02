import { Box, Container, Heading, Text, Button, Stack, Image, Icon, useColorModeValue, VStack, HStack, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiShield } from 'react-icons/fi';
import FeatureCard from '../../components/cards/FeatureCard';

const MotionBox = motion(Box);

export default function LandingPage() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    return (
        <Box bg={bgColor}>
            {/* Hero Section */}
            <Container maxW="7xl" pt={{ base: 20, md: 28 }} pb={{ base: 16, md: 24 }}>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={8} align="center">
                    <VStack flex={1} spacing={6} alignItems={{ base: 'center', md: 'flex-start' }}>
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Heading
                                as="h1"
                                size="2xl"
                                fontWeight="bold"
                                lineHeight="shorter"
                                mb={4}
                                bgGradient="linear(to-r, blue.400, purple.500)"
                                bgClip="text"
                            >
                                Transform Your Business Analytics Today
                            </Heading>
                        </MotionBox>
                        <Text fontSize="xl" color={textColor} maxW="600px">
                            Revolutionize your account management and sales tracking with our cutting-edge platform.
                        </Text>
                        <HStack spacing={4}>
                            <Button
                                size="lg"
                                colorScheme="blue"
                                rightIcon={<FiArrowRight />}
                                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                            >
                                Get Started
                            </Button>
                            <Button size="lg" variant="outline">
                                Learn More
                            </Button>
                        </HStack>
                    </VStack>
                    <Box flex={1}>
                        {/* Replace with your hero image */}
                        <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVxCvrKYx1k8gUbHXbdj0L8gyEenqEOqlxw&s"
                            alt="Analytics Dashboard"
                            borderRadius="2xl"
                            shadow="2xl"
                            // Comment: Add a modern dashboard visualization image here
                        />
                    </Box>
                </Stack>
            </Container>

            {/* Features Section */}
            <Box py={20} bg={useColorModeValue('white', 'gray.800')}>
                <Container maxW="7xl">
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        <FeatureCard
                            icon={FiTrendingUp}
                            title="Advanced Analytics"
                            description="Get deep insights into your business performance with real-time analytics"
                        />
                        <FeatureCard
                            icon={FiCheckCircle}
                            title="Smart Automation"
                            description="Automate repetitive tasks and focus on what matters most"
                        />
                        <FeatureCard
                            icon={FiShield}
                            title="Secure Platform"
                            description="Enterprise-grade security to protect your sensitive data"
                        />
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Showcase Section */}
            <Box py={20}>
                <Container maxW="7xl">
                    <Stack direction={{ base: 'column', lg: 'row' }} spacing={12} align="center">
                        <Box flex={1}>
                            {/* Replace with your showcase image */}
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfaQhZPWtOZiF8vtlR6vizlitKzCKNhu_3A&s"
                                alt="Platform Overview"
                                borderRadius="lg"
                                shadow="xl"
                                // Comment: Add a product screenshot or feature highlight image
                            />
                        </Box>
                        <VStack flex={1} spacing={6} alignItems={{ base: 'center', lg: 'flex-start' }}>
                            <Heading size="xl">Experience the Next Generation Platform</Heading>
                            <Text fontSize="lg" color={textColor}>
                                Our platform combines powerful features with an intuitive interface to deliver the best possible experience for your business needs.
                            </Text>
                            <SimpleGrid columns={2} spacing={4} w="full">
                                {['Real-time Updates', 'Custom Reports', 'Team Collaboration', 'Mobile Access'].map((feature) => (
                                    <HStack key={feature}>
                                        <Icon as={FiCheckCircle} color="green.500" />
                                        <Text>{feature}</Text>
                                    </HStack>
                                ))}
                            </SimpleGrid>
                        </VStack>
                    </Stack>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box py={20} bg={useColorModeValue('blue.50', 'blue.900')}>
                <Container maxW="3xl" textAlign="center">
                    <VStack spacing={8}>
                        <Heading size="xl">Ready to Transform Your Business?</Heading>
                        <Text fontSize="lg" color={textColor}>
                            Join thousands of businesses that trust our platform for their analytics needs.
                        </Text>
                        <Button
                            size="lg"
                            colorScheme="blue"
                            rightIcon={<FiArrowRight />}
                            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                        >
                            Start Free Trial
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
}