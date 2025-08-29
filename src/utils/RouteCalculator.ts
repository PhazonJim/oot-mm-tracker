import type { Area, LocationsData } from '../types';

export interface RouteStep {
  fromEntrance: string;
  toDestination: string;
  areaName: string;
}

export interface Route {
  steps: RouteStep[];
  totalSteps: number;
  isComplete: boolean;
}

export class RouteCalculator {
  private areas: Area[];
  private connections: Record<string, string>;

  constructor(locationsData: LocationsData, connections: Record<string, string>) {
    this.areas = locationsData.areas;
    this.connections = connections;
  }

  // Build a location-based graph where nodes are location names
  private buildLocationGraph(): Map<string, string[]> {
    const graph = new Map<string, string[]>();
    
    // Get all possible location names (area names + destination names)
    const allLocations = new Set<string>();
    
    // Add all area names as locations
    this.areas.forEach(area => {
      allLocations.add(area.name);
    });
    
    // Add all configured destination names as locations
    Object.values(this.connections).forEach(destination => {
      if (destination && destination.trim() !== '') {
        allLocations.add(destination);
      }
    });
    
    // Initialize all locations as nodes
    allLocations.forEach(location => {
      graph.set(location, []);
    });
    
    // Add edges based on user's entrance connections
    Object.entries(this.connections).forEach(([entranceId, destinationName]) => {
      if (destinationName && destinationName.trim() !== '') {
        // Find which area this entrance belongs to
        const sourceArea = this.areas.find(area => 
          area.entrances.some(e => e.id === entranceId)
        );
        
        if (sourceArea) {
          // Create directed edge from source area to destination
          if (!graph.get(sourceArea.name)) graph.set(sourceArea.name, []);
          if (!graph.get(sourceArea.name)!.includes(destinationName)) {
            graph.get(sourceArea.name)!.push(destinationName);
          }
          
          // Also create reverse connection for bidirectional travel
          if (!graph.get(destinationName)) graph.set(destinationName, []);
          if (!graph.get(destinationName)!.includes(sourceArea.name)) {
            graph.get(destinationName)!.push(sourceArea.name);
          }
        }
      }
    });
    
    return graph;
  }



  // Find shortest route between two destination locations
  findRoute(startEntranceId: string, endEntranceId: string): Route {
    // Convert entrance IDs to location names
    const startLocationName = this.getLocationNameForEntrance(startEntranceId);
    const endLocationName = this.getLocationNameForEntrance(endEntranceId);
    
    if (!startLocationName || !endLocationName) {
      return {
        steps: [],
        totalSteps: 0,
        isComplete: false
      };
    }
    
    if (startLocationName === endLocationName) {
      return {
        steps: [],
        totalSteps: 0,
        isComplete: true
      };
    }

    const graph = this.buildLocationGraph();
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const unvisited = new Set<string>();

    // Initialize distances and unvisited set
    graph.forEach((_, location) => {
      distances.set(location, location === startLocationName ? 0 : Infinity);
      previous.set(location, null);
      unvisited.add(location);
    });

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let currentNode: string | null = null;
      let minDistance = Infinity;
      
      for (const node of unvisited) {
        const dist = distances.get(node) || Infinity;
        if (dist < minDistance) {
          minDistance = dist;
          currentNode = node;
        }
      }

      if (!currentNode || minDistance === Infinity) {
        // No path found
        break;
      }

      unvisited.delete(currentNode);

      // If we reached the destination, build the path
      if (currentNode === endLocationName) {
        return this.buildRouteFromLocationPath(endLocationName, previous);
      }

      // Update distances to neighbors
      const neighbors = graph.get(currentNode) || [];
      for (const neighbor of neighbors) {
        if (unvisited.has(neighbor)) {
          const newDistance = (distances.get(currentNode) || 0) + 1;
          if (newDistance < (distances.get(neighbor) || Infinity)) {
            distances.set(neighbor, newDistance);
            previous.set(neighbor, currentNode);
          }
        }
      }
    }

    // No path found
    return {
      steps: [],
      totalSteps: 0,
      isComplete: false
    };
  }

  // Get the location name that an entrance leads to (based on user connections)
  private getLocationNameForEntrance(entranceId: string): string | null {
    // If this entrance has a configured destination, return that
    const configuredDestination = this.connections[entranceId];
    if (configuredDestination && configuredDestination.trim() !== '') {
      return configuredDestination;
    }
    
    // Otherwise, return the area name where this entrance is located
    const area = this.areas.find(area => 
      area.entrances.some(e => e.id === entranceId)
    );
    
    return area ? area.name : null;
  }
  
  // Build route from a path of location names
  private buildRouteFromLocationPath(endLocation: string, previous: Map<string, string | null>): Route {
    const locationPath: string[] = [];
    let current: string | null = endLocation;

    // Build path backwards
    while (current !== null) {
      locationPath.unshift(current);
      current = previous.get(current) || null;
    }

    // Convert location path to route steps
    const steps: RouteStep[] = [];
    
    for (let i = 0; i < locationPath.length - 1; i++) {
      const fromLocation = locationPath[i];
      const toLocation = locationPath[i + 1];
      
      // Find an entrance that goes from fromLocation to toLocation
      const entrance = this.findEntranceFromLocationToLocation(fromLocation, toLocation);
      
      if (entrance) {
        steps.push({
          fromEntrance: `${entrance.areaName} - ${entrance.entranceName}`,
          toDestination: toLocation,
          areaName: entrance.areaName
        });
      }
    }

    return {
      steps,
      totalSteps: steps.length,
      isComplete: true
    };
  }
  
  // Find an entrance that can take you from one location to another
  private findEntranceFromLocationToLocation(fromLocation: string, toLocation: string): {areaName: string, entranceName: string} | null {
    // Look for an area with name fromLocation that has an entrance leading to toLocation
    const fromArea = this.areas.find(area => area.name === fromLocation);
    
    if (fromArea) {
      // Find an entrance in this area that leads to toLocation
      for (const entrance of fromArea.entrances) {
        if (this.connections[entrance.id] === toLocation) {
          return {
            areaName: fromArea.name,
            entranceName: entrance.name
          };
        }
      }
    }
    
    // If no direct entrance found, look for any entrance that leads to toLocation from any area
    // This handles cases where the fromLocation might be a destination name
    for (const [entranceId, destination] of Object.entries(this.connections)) {
      if (destination === toLocation) {
        const area = this.areas.find(area => 
          area.entrances.some(e => e.id === entranceId)
        );
        const entrance = area?.entrances.find(e => e.id === entranceId);
        
        if (area && entrance && (area.name === fromLocation || destination === fromLocation)) {
          return {
            areaName: area.name,
            entranceName: entrance.name
          };
        }
      }
    }
    
    return null;
  }

  // Get all available entrance options for dropdowns
  getAllEntranceOptions(): Array<{id: string, label: string, areaName: string}> {
    const options: Array<{id: string, label: string, areaName: string}> = [];
    
    this.areas.forEach(area => {
      area.entrances.forEach(entrance => {
        options.push({
          id: entrance.id,
          label: `${area.name} - ${entrance.name}`,
          areaName: area.name
        });
      });
    });
    
    return options.sort((a, b) => a.label.localeCompare(b.label));
  }
}