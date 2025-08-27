import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ConnectionsMap = Record<string, string>;

interface TrackerContextType {
  connections: ConnectionsMap;
  updateConnection: (entranceId: string, destinationId: string) => void;
  resetTracker: () => void;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export const TrackerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [connections, setConnections] = useLocalStorage<ConnectionsMap>('oot-tracker-connections', {});

  const updateConnection = (entranceId: string, destinationId: string) => {
    setConnections(prev => ({
      ...prev,
      [entranceId]: destinationId
    }));
  };

  const resetTracker = () => {
    setConnections({});
  };

  return (
    <TrackerContext.Provider value={{ connections, updateConnection, resetTracker }}>
      {children}
    </TrackerContext.Provider>
  );
};

export const useTrackerContext = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTrackerContext must be used within a TrackerProvider');
  }
  return context;
};