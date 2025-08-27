import React from 'react';
import { GAME_TITLE, VERSION } from '../data/constants';
import { useTrackerContext } from '../context/TrackerContext';

interface TrackerHeaderProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const TrackerHeader: React.FC<TrackerHeaderProps> = ({ onToggleTheme, isDarkMode }) => {
  const { resetTracker } = useTrackerContext();
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all entrance connections?')) {
      resetTracker();
    }
  };
  
  return (
    <header className="tracker-header">
      <div className="tracker-title">
        <h1>{GAME_TITLE}</h1>
        <span className="version">v{VERSION}</span>
      </div>
      
      <div className="tracker-controls">
        <button 
          className="theme-toggle" 
          onClick={onToggleTheme} 
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
        
        <button 
          className="reset-button" 
          onClick={handleReset}
          title="Reset all entrance connections"
        >
          Reset
        </button>
      </div>
    </header>
  );
};

export default TrackerHeader;