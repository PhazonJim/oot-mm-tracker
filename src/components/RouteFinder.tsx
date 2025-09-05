import React, { useState } from 'react';
import FilterableSelect from './FilterableSelect';
import { useTrackerContext } from '../hooks/useTrackerContext';
import type { Route } from '../utils/RouteCalculator';
import locationsData from '../data/locations.json';
import type { LocationsData } from '../types';


interface RouteFinderProps {
  isDarkMode: boolean;
}

const RouteFinder: React.FC<RouteFinderProps> = () => {
  const { connections } = useTrackerContext();
  const [startEntrance, setStartEntrance] = useState('');
  const [endEntrance, setEndEntrance] = useState('');
  const [route, setRoute] = useState<Route | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Build a simple location-to-location routing map
  const findRouteDirectly = (startLocation: string, endLocation: string): Route => {
    if (!startLocation || !endLocation || startLocation === endLocation) {
      return {
        steps: [],
        totalSteps: startLocation === endLocation ? 0 : -1,
        isComplete: startLocation === endLocation
      };
    }
    
    const areas = (locationsData as LocationsData).areas;
    const visited = new Set<string>();
    const queue: Array<{location: string, path: Array<{from: string, to: string, entrance: string}>}> = [];
    
    // Start BFS from the start location
    queue.push({location: startLocation, path: []});
    visited.add(startLocation);
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.location === endLocation) {
        // Found the destination, convert path to route steps
        const steps = current.path.map(step => ({
          fromEntrance: step.entrance,
          toDestination: step.to,
          areaName: step.from
        }));
        
        return {
          steps,
          totalSteps: steps.length,
          isComplete: true
        };
      }
      
      // Find all possible next locations from current location
      // Look for areas with the current location name
      const currentArea = areas.find(area => area.name === current.location);
      if (currentArea) {
        // Check each entrance in this area
        for (const entrance of currentArea.entrances) {
          const destination = connections[entrance.id];
          if (destination && destination.trim() !== '' && !visited.has(destination)) {
            visited.add(destination);
            const newPath = [...current.path, {
              from: current.location,
              to: destination,
              entrance: `${currentArea.name} - ${entrance.name}`
            }];
            queue.push({location: destination, path: newPath});
          }
        }
      }
    }
    
    // No route found
    return {
      steps: [],
      totalSteps: 0,
      isComplete: false
    };
  };

  const handleFindRoute = () => {
    if (!startEntrance || !endEntrance) {
      setRoute({
        steps: [],
        totalSteps: 0,
        isComplete: false
      });
      setHasCalculated(true);
      return;
    }
    
    // Use direct location-based routing
    const calculatedRoute = findRouteDirectly(startEntrance, endEntrance);
    setRoute(calculatedRoute);
    
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