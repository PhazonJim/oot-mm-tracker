import React from 'react';
import { GAME_TITLE, VERSION } from '../data/constants';
import { useTrackerContext } from '../context/TrackerContext';

interface TrackerHeaderProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const TrackerHeader: React.FC<TrackerHeaderProps> = ({ onToggleTheme, isDarkMode }) => {
  const { resetTracker, connections, areaOrder, importData } = useTrackerContext();
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all entrance connections?')) {
      resetTracker();
    }
  };

  const handleExport = () => {
    const exportData = {
      connections,
      areaOrder,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `oot-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          
          if (window.confirm('This will overwrite your current tracker data. Continue?')) {
            importData(importedData);
            alert('Import successful!');
          }
        } catch (error) {
          alert('Invalid file format. Please select a valid tracker export file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };
  
  return (
    <header className="tracker-header">
      <div className="tracker-title">
        <h1>{GAME_TITLE}</h1>
        <span className="version">v{VERSION}</span>
      </div>
      
      <div className="tracker-controls">
        <button 
          className="control-button" 
          onClick={handleExport}
          title="Export tracker data to file"
        >
          Export
        </button>
        
        <button 
          className="control-button" 
          onClick={handleImport}
          title="Import tracker data from file"
        >
          Import
        </button>
        
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