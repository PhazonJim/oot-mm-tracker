import React from 'react';
import FilterableSelect from './FilterableSelect';

interface EntranceSelectProps {
  entranceId: string;
  entranceName: string;
  selectedDestination: string;
  onChange: (destinationId: string) => void;
  isDarkBackground?: boolean; // Keep for compatibility but ignore
}

const EntranceSelect: React.FC<EntranceSelectProps> = ({ 
  entranceName,
  selectedDestination,
  onChange
}) => {
  return (
    <FilterableSelect
      value={selectedDestination}
      onChange={onChange}
      ariaLabel={`Select destination for ${entranceName}`}
    />
  );
};

export default EntranceSelect;