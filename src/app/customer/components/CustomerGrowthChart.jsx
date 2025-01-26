import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";

const CustomerGrowthChart = ({ data }) => {
  const [timeframe, setTimeframe] = useState("6months");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      bg={bgColor}
      p={{ base: 3, md: 6 }}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
      w="100%"
    >
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        flexDirection={{ base: "column", sm: "row" }}
        gap={3}
      >
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium">
          Customer Growth
        </Text>
        <Select
          width={{ base: "100%", sm: "150px" }}
          size="sm"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="6months">Last 6 months</option>
          <option value="12months">Last 12 months</option>
          <option value="ytd">Year to date</option>
        </Select>
      </Flex>

      {data && data.length > 0 ? (
        <Box
          h={{ base: "200px", sm: "250px", md: "300px" }}
          mx={{ base: -3, md: 0 }}
          overflow="hidden"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={50}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 10 }} width={30} />
              <Tooltip
                contentStyle={{ fontSize: "12px" }}
                labelStyle={{ fontSize: "12px" }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: "11px" }}
                align="center"
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#3182CE"
                strokeWidth={2}
                name="Active Customers"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="new"
                stroke="#48BB78"
                strokeWidth={2}
                name="New Customers"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="churned"
                stroke="#E53E3E"
                strokeWidth={2}
                name="Churned Customers"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Text textAlign="center" py={10} color="gray.500">
          No data available
        </Text>
      )}
    </Box>
  );
};

export default CustomerGrowthChart;
