import { Grid, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import EmptyStatePage from "../../../components/emptyState";
import RegionCard from "./RegionCard";
import DashboardCard from "../../../components/cards/DashboardCard";

const RegionalGrowth = ({ regions = [] }) => {
  if (!Array.isArray(regions) || regions.length === 0) {
    return (
      <DashboardCard>
        <EmptyStatePage
          title="No Regional Data"
          sub="Regional growth data is not available"
          icon={<FiUsers size={40} />}
        />
      </DashboardCard>
    );
  }

  const totalRevenue = regions.reduce((sum, region) => sum + (Number(region.revenue) || 0), 0);

  return (
    <DashboardCard>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Regional Growth
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {regions.map((region) => (
          <RegionCard 
            key={region.region} 
            region={region}
            percentage={totalRevenue ? (region.revenue / totalRevenue) * 100 : 0}
          />
        ))}
      </SimpleGrid>
    </DashboardCard>
  );
};

export default RegionalGrowth;
