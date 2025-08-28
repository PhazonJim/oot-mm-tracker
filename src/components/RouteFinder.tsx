import React, { useState } from 'react';
import FilterableSelect from './FilterableSelect';
import { useTrackerContext } from '../context/TrackerContext';
import locationsData from '../data/locations.json';
import type { LocationsData } from '../types';

// Simple route types for this component
interface RouteStep {
  fromEntrance: string;
  toDestination: string;
  areaName: string;
}

interface Route {
  steps: RouteStep[];
  totalSteps: number;
  isComplete: boolean;
}

interface RouteFinderProps {
  isDarkMode: boolean;
}

const RouteFinder: React.FC<RouteFinderProps> = ({ }) => {
  const { connections } = useTrackerContext();
  const [startEntrance, setStartEntrance] = useState('');
  const [endEntrance, setEndEntrance] = useState('');
  const [route, setRoute] = useState<Route | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Simple route finding: check if there's a direct connection
  const findSimpleRoute = (start: string, end: string): { found: boolean, steps: string[] } => {
    if (!start || !end || start === end) {
      return { found: false, steps: [] };
    }
    
    console.log('Looking for route from', start, 'to', end);
    console.log('Available connections:', connections);
    
    const areas = (locationsData as LocationsData).areas;
    const steps: string[] = [];
    
    // Find entrances that lead to the start location (where user currently is)
    // Then see if any of those entrances have connections that lead to the end location
    for (const [entranceId, destination] of Object.entries(connections)) {
      if (destination === start) {
        console.log(`Found entrance ${entranceId} that leads to start location ${start}`);
        
        // Now look for any entrance in the same area that leads to the end location
        const entranceArea = areas.find(area => 
          area.entrances.some(e => e.id === entranceId)
        );
        
        if (entranceArea) {
          for (const otherEntrance of entranceArea.entrances) {
            const otherDestination = connections[otherEntrance.id];
            if (otherDestination === end) {
              steps.push(`From ${entranceArea.name}, go to ${end}`);
              return { found: true, steps };
            }
          }
        }
      }
      
      if (destination === end) {
        console.log(`Found direct connection: ${entranceId} leads to ${end}`);
        // Find which area this entrance is in
        const entranceArea = areas.find(area => 
          area.entrances.some(e => e.id === entranceId)
        );
        if (entranceArea) {
          steps.push(`Go to ${entranceArea.name} and use exit to ${end}`);
          return { found: true, steps };
        }
      }
    }
    
    return { found: false, steps: [] };
  };

  const handleFindRoute = () => {
    console.log('Finding route from:', startEntrance, 'to:', endEntrance);
    
    const result = findSimpleRoute(startEntrance, endEntrance);
    console.log('Route result:', result);
    
    if (result.found) {
      // Convert simple steps to Route format
      const routeSteps = result.steps.map(step => ({
        fromEntrance: 'Current Location',
        toDestination: step,
        areaName: 'Various'
      }));
      
      setRoute({
        steps: routeSteps,
        totalSteps: routeSteps.length,
        isComplete: true
      });
    } else {
      setRoute({
        steps: [],
        totalSteps: 0,
        isComplete: false
      });
    }
    
    setHasCalculated(true);
  };

  const handleReset = () => {
    setStartEntrance('');
    setEndEntrance('');
    setRoute(null);
    setHasCalculated(false);
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f44336'
  };

  return (
    <div className="route-finder">
      <div className="route-finder-controls">
        <div className="entrance-selectors">
          <div className="selector-group">
            <label htmlFor="start-entrance">Starting Location:</label>
            <FilterableSelect
              value={startEntrance}
              onChange={setStartEntrance}
              ariaLabel="Select starting location for route"
            />
          </div>

          <div className="selector-group">
            <label htmlFor="end-entrance">Destination:</label>
            <FilterableSelect
              value={endEntrance}
              onChange={setEndEntrance}
              ariaLabel="Select destination for route"
            />
          </div>
        </div>

        <div className="route-buttons">
          <button
            onClick={handleFindRoute}
            disabled={!startEntrance || !endEntrance}
            style={buttonStyle}
          >
            Find Route
          </button>
          <button
            onClick={handleReset}
            style={resetButtonStyle}
          >
            Reset
          </button>
        </div>
      </div>

      {hasCalculated && (
        <div className="route-results">
          {route && route.isComplete ? (
            <div className="route-success">
              <h3>Route Found!</h3>
              <p><strong>Total Steps:</strong> {route.totalSteps}</p>
              
              {route.steps.length > 0 && (
                <div className="route-steps">
                  <h4>Route Steps:</h4>
                  <ol>
                    {route.steps.map((step, index) => (
                      <li key={index} className="route-step">
                        <strong>From:</strong> {step.fromEntrance}<br/>
                        <strong>To:</strong> {step.toDestination}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ) : (
            <div className="route-error">
              <h3>⚠️ No Route Found</h3>
              <p>
                No available route could be found between the selected locations.
                This could be because:
              </p>
              <ul>
                <li>The locations are not connected through your current entrance mappings</li>
                <li>Some required entrances haven't been configured in the main tracker</li>
                <li>There's a gap in the connection chain</li>
              </ul>
              <p>
                <strong>Tip:</strong> Make sure you've configured the entrance connections 
                in the main tracker tab for the areas you want to travel through.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteFinder;