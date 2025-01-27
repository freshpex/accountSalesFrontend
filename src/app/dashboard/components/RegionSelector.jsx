import { Select, FormControl, FormLabel } from '@chakra-ui/react';

const RegionSelector = ({ value, onChange }) => {
  const regions = ['All', 'North', 'South', 'East', 'West'];

  return (
    <FormControl>
      <FormLabel>Region</FormLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {regions.map(region => (
          <option key={region} value={region.toLowerCase()}>
            {region}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default RegionSelector;
