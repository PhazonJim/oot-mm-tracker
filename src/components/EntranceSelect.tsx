import React from 'react';
import locationsData from '../data/locations.json';
import type { Area } from '../types';

interface EntranceSelectProps {
  entranceId: string;
  selectedDestination: string;
  onChange: (destinationId: string) => void;
}

const EntranceSelect: React.FC<EntranceSelectProps> = ({ 
  entranceId, 
  selectedDestination,
  onChange
}) => {
  // Create a flat list of all possible destinations
  const allAreas = (locationsData as { areas: Area[] }).areas;
  
  return (
    <select 
      value={selectedDestination}
      onChange={(e) => onChange(e.target.value)}
      className="entrance-select"
    >
      <option value="">-- Unknown --</option>
      {allAreas.map(area => (
        <option key={area.id} value={area.id}>
          {area.name}
        </option>
      ))}
    </select>
  );
};

export default EntranceSelect;