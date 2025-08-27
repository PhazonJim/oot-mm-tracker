import React from 'react';
import EntranceSelect from './EntranceSelect';
import { useTrackerContext } from '../context/TrackerContext';
import type { Area as AreaType } from '../types';

interface AreaProps {
  area: AreaType;
}

const Area: React.FC<AreaProps> = ({ area }) => {
  const { connections, updateConnection } = useTrackerContext();
  
  return (
    <div className="area-card">
      <h3>{area.name}</h3>
      <ul className="entrance-list">
        {area.entrances.map(entrance => (
          <li key={entrance.id} className="entrance-item">
            <span>{entrance.name}</span>
            <EntranceSelect 
              entranceId={entrance.id}
              selectedDestination={connections[entrance.id] || entrance.defaultDestination}
              onChange={(destination) => updateConnection(entrance.id, destination)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Area;