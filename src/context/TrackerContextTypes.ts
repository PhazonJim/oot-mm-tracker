import { createContext } from 'react';

type ConnectionsMap = Record<string, string>;

export interface TrackerContextType {
  connections: ConnectionsMap;
  updateConnection: (entranceId: string, destinationId: string) => void;
  resetTracker: () => void;
  areaOrder: string[];
  updateAreaOrder: (newOrder: string[]) => void;
  importData: (data: { connections?: ConnectionsMap; areaOrder?: string[] }) => void;
}

export const TrackerContext = createContext<TrackerContextType | undefined>(undefined);