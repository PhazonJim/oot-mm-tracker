import { createContext } from 'react';
import type { ItemState } from '../types';

type ConnectionsMap = Record<string, string>;

export interface TrackerContextType {
  connections: ConnectionsMap;
  updateConnection: (entranceId: string, destinationId: string) => void;
  resetTracker: () => void;
  areaOrder: string[];
  updateAreaOrder: (newOrder: string[]) => void;
  items: ItemState;
  updateItem: (itemId: string, value: boolean | number) => void;
  resetItems: () => void;
  importData: (data: { connections?: ConnectionsMap; areaOrder?: string[]; items?: ItemState }) => void;
}

export const TrackerContext = createContext<TrackerContextType | undefined>(undefined);