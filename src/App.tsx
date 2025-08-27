import React, { useState, useEffect } from 'react';
import './App.css';
import Area from './components/Area';
import TrackerHeader from './components/TrackerHeader';
import { TrackerProvider } from './context/TrackerContext';
import locationsData from './data/locations.json';
import type { LocationsData } from './types';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('oot-tracker-theme');
    return savedMode ? savedMode === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  useEffect(() => {
    localStorage.setItem('oot-tracker-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  // Cast the imported JSON to our TypeScript type
  const { areas } = locationsData as LocationsData;
  
  return (
    <TrackerProvider>
      <div className="app">
        <TrackerHeader onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        
        <main className="tracker-container">
          {areas.map(area => (
            <Area key={area.id} area={area} />
          ))}
        </main>
        
        <footer className="tracker-footer">
          <p>This tracker is for educational purposes only. Ocarina of Time is property of Nintendo.</p>
        </footer>
      </div>
    </TrackerProvider>
  );
};

export default App;