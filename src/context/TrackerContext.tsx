import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import locationsData from '../data/locations.json';
import type { LocationsData } from '../types';
import { TrackerContext } from './TrackerContextTypes';

type ConnectionsMap = Record<string, string>;

export const TrackerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [connections, setConnections] = useLocalStorage<ConnectionsMap>('oot-tracker-connections', {});
  const { areas } = locationsData as LocationsData;
  
  // Initialize areaOrder with default order from locations.json
  const defaultOrder = areas.map(area => area.id);
  const [areaOrder, setAreaOrder] = useLocalStorage<string[]>('oot-tracker-area-order', defaultOrder);

  const updateConnection = (entranceId: string, destinationId: string) => {
    setConnections(prev => ({
      ...prev,
      [entranceId]: destinationId
    }));
  };

  const resetTracker = () => {
    setConnections({});
  };
  
  const updateAreaOrder = (newOrder: string[]) => {
    setAreaOrder(newOrder);
  };

  const importData = (data: { connections?: ConnectionsMap; areaOrder?: string[] }) => {
    if (data.connections) {
      setConnections(data.connections);
    }
    if (data.areaOrder) {
      setAreaOrder(data.areaOrder);
    }
  };

  return (
    <TrackerContext.Provider value={{ 
      connections, 
      updateConnection,
      resetTracker,
      areaOrder,
      updateAreaOrder,
      importData
    }}>
      {children}
    </TrackerContext.Provider>
  );
};

