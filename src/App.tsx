import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import Area from './components/Area';
import TrackerHeader from './components/TrackerHeader';
import SearchFilter from './components/SearchFilter';
import RouteFinder from './components/RouteFinder';
import ItemTracker from './components/ItemTracker';
import ErrorBoundary from './components/ErrorBoundary';
import { TrackerProvider } from './context/TrackerContext';
import { useTrackerContext } from './hooks/useTrackerContext';
import locationsData from './data/locations.json';
import { AREA_TYPES } from './data/constants';
import type { LocationsData } from './types';

const TrackerContent: React.FC = () => {
  const { areaOrder, updateAreaOrder, connections } = useTrackerContext();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'overworld' | 'town' | 'dungeon' | 'special'>('all');
  const [gameFilter, setGameFilter] = useState<'all' | 'OOT' | 'MM'>('all');
  const [activeTab, setActiveTab] = useState<'tracker' | 'route-finder' | 'items'>('tracker');
  
  // Cast the imported JSON to our TypeScript type
  const { areas } = locationsData as LocationsData;
  
  // Filter and search areas based on user input
  const filteredAreas = useMemo(() => {
    let filtered = areas;
    
    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(area => {
        const areaType = AREA_TYPES[area.id];
        return areaType?.toLowerCase() === filterType;
      });
    }
    
    // Apply game filter
    if (gameFilter !== 'all') {
      filtered = filtered.filter(area => {
        return area.game === gameFilter;
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(area => {
        // Search in area name
        if (area.name.toLowerCase().includes(lowerSearchTerm)) {
          return true;
        }
        // Search in entrance names
        const matchesEntranceName = area.entrances.some(entrance => 
          entrance.name.toLowerCase().includes(lowerSearchTerm)
        );
        if (matchesEntranceName) {
          return true;
        }
        // Search in selected destinations (connections)
        const matchesSelectedDestination = area.entrances.some(entrance => {
          const selectedDestination = connections[entrance.id];
          return selectedDestination && selectedDestination.toLowerCase().includes(lowerSearchTerm);
        });
        
        return matchesSelectedDestination;
      });
    }
    
    // Order filtered areas based on the saved order
    return [...filtered].sort((a, b) => {
      const aIndex = areaOrder.indexOf(a.id);
      const bIndex = areaOrder.indexOf(b.id);
      return aIndex - bIndex;
    });
  }, [areas, searchTerm, filterType, gameFilter, areaOrder, connections]);
  
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    // Make the drag image transparent
    setTimeout(() => {
      (e.target as HTMLElement).classList.add('dragging');
    }, 0);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === dropIndex) return;
    
    // Work only with the currently visible (filtered) areas
    const draggedArea = filteredAreas[draggedItem];
    const targetArea = filteredAreas[dropIndex];
    
    if (!draggedArea || !targetArea) return;
    
    // Create new order for the filtered areas only
    const reorderedFiltered = [...filteredAreas];
    reorderedFiltered.splice(draggedItem, 1); // Remove dragged item
    reorderedFiltered.splice(dropIndex, 0, draggedArea); // Insert at new position
    
    // Update the full areaOrder to maintain the new filtered order
    // while preserving the positions of non-filtered areas
    const newOrder = [...areaOrder];
    const filteredIds = new Set(filteredAreas.map(area => area.id));
    
    // Remove all currently filtered areas from the full order
    const withoutFiltered = newOrder.filter(id => !filteredIds.has(id));
    
    // Find insertion point - where the first filtered area was originally
    const originalFirstFilteredIndex = areaOrder.findIndex(id => filteredIds.has(id));
    const insertPoint = originalFirstFilteredIndex >= 0 ? originalFirstFilteredIndex : areaOrder.length;
    
    // Build new complete order
    const finalOrder = [
      ...withoutFiltered.slice(0, insertPoint),
      ...reorderedFiltered.map(area => area.id),
      ...withoutFiltered.slice(insertPoint)
    ];
    
    updateAreaOrder(finalOrder);
    setDraggedItem(null);
    
    // Remove the dragging class
    document.querySelectorAll('.dragging').forEach(el => {
      el.classList.remove('dragging');
    });
  }, [draggedItem, filteredAreas, areaOrder, updateAreaOrder]);
  
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
  
  return (
    <div className="app">
      <TrackerHeader onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <div className="app-tabs">
        <button 
          className={`tab-button ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
          aria-pressed={activeTab === 'tracker'}
        >
          Entrance Tracker
        </button>
        <button 
          className={`tab-button ${activeTab === 'route-finder' ? 'active' : ''}`}
          onClick={() => setActiveTab('route-finder')}
          aria-pressed={activeTab === 'route-finder'}
        >
          Route Finder
        </button>
        <button 
          className={`tab-button ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
          aria-pressed={activeTab === 'items'}
        >
          Items
        </button>
      </div>
      
      {activeTab === 'tracker' && (
        <>
          <SearchFilter 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
            gameFilter={gameFilter}
            onGameFilterChange={setGameFilter}
            isDarkMode={isDarkMode}
          />
          
          <main 
            className="tracker-container"
            role="main"
            aria-label="Entrance randomizer tracker"
          >
            {filteredAreas.map((area, index) => (
              <Area 
                key={area.id} 
                area={area}
                index={index}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))}
          </main>
        </>
      )}
      
      {activeTab === 'route-finder' && (
        <main 
          className="route-finder-container"
          role="main"
          aria-label="Route finder"
        >
          <RouteFinder isDarkMode={isDarkMode} />
        </main>
      )}

      {activeTab === 'items' && (
        <main 
          className="items-container"
          role="main"
          aria-label="Item tracker"
        >
          <ItemTracker isDarkMode={isDarkMode} />
        </main>
      )}
      
      <footer className="tracker-footer">
        <p>This tracker is for educational purposes only. Zelda is property of Nintendo.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <TrackerProvider>
        <ErrorBoundary>
          <TrackerContent />
        </ErrorBoundary>
      </TrackerProvider>
    </ErrorBoundary>
  );
};

export default App;