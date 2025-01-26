import { StatLabel, StatNumber, StatHelpText, Stat } from "@chakra-ui/react";

const StatisticCard = ({ title, value, change }) => (
  <Stat px={4} py={2} bg="gray.50" borderRadius="md">
    <StatLabel fontSize="sm" color="gray.500">
      {title}
    </StatLabel>
    <StatNumber fontSize="lg" fontWeight="bold">
      {value.toLocaleString()}
    </StatNumber>
    <StatHelpText color={change?.startsWith("+") ? "green.500" : "red.500"}>
      {change} from last month
    </StatHelpText>
  </Stat>
);

export default StatisticCard;
