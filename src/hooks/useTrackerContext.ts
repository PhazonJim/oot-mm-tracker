import { useContext } from 'react';
import { TrackerContext } from '../context/TrackerContextTypes';

export const useTrackerContext = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTrackerContext must be used within a TrackerProvider');
  }
  return context;
};