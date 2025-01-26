import { Container, Grid, GridItem, VStack, Skeleton } from "@chakra-ui/react";

const LoadingSkeleton = () => (
  <Container maxW="container.xl" py={8}>
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
      <GridItem>
        <VStack align="stretch" spacing={6}>
          <Skeleton height="400px" borderRadius="lg" />
          <Skeleton height="200px" borderRadius="lg" />
        </VStack>
      </GridItem>
      <GridItem>
        <Skeleton height="500px" borderRadius="lg" />
      </GridItem>
    </Grid>
  </Container>
);

export default LoadingSkeleton;
