import { Grid, Text, Box } from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import EmptyStatePage from "../../../components/emptyState";
import RegionCard from "./RegionCard";

const RegionalGrowth = ({ regions }) => {
  if (!regions || !regions.length) {
    return (
      <EmptyStatePage
        title="No Regional Data"
        sub="Regional growth data is not available"
        icon={<FiUsers size={40} />}
      />
    );
  }

  return (
    <Box mt={8}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Regional Growth
      </Text>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {regions.map((region) => (
          <RegionCard key={region.region} region={region} />
        ))}
      </Grid>
    </Box>
  );
};
export default RegionalGrowth;
