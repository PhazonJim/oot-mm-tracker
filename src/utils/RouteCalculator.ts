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

  // Build a graph of all available connections based on user's dropdown selections
  private buildConnectionGraph(): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    // Initialize all entrances as nodes
    this.areas.forEach(area => {
      area.entrances.forEach(entrance => {
        graph.set(entrance.id, []);
      });
    });

    // Add connections based on user's dropdown selections
    Object.entries(this.connections).forEach(([entranceId, destinationName]) => {
      if (destinationName && destinationName.trim() !== '') {
        // Find all entrances that lead to this destination
        const targetEntrances = this.findEntrancesByDestinationName(destinationName);
        
        // Add bidirectional connections
        targetEntrances.forEach(targetEntrance => {
          // From source entrance to target entrance
          if (!graph.get(entranceId)) graph.set(entranceId, []);
          graph.get(entranceId)!.push(targetEntrance.id);
          
          // From target entrance back to source entrance (bidirectional)
          if (!graph.get(targetEntrance.id)) graph.set(targetEntrance.id, []);
          graph.get(targetEntrance.id)!.push(entranceId);
        });
      }
    });

    return graph;
  }

  // Find all entrances that have a given destination name
  private findEntrancesByDestinationName(destinationName: string): Array<{id: string, areaId: string}> {
    const results: Array<{id: string, areaId: string}> = [];
    
    this.areas.forEach(area => {
      area.entrances.forEach(entrance => {
        if (entrance.name === destinationName) {
          results.push({id: entrance.id, areaId: area.id});
        }
      });
    });
    
    return results;
  }

  // Get area and entrance info for a given entrance ID
  private getEntranceInfo(entranceId: string): {area: Area, entrance: any} | null {
    for (const area of this.areas) {
      const entrance = area.entrances.find(e => e.id === entranceId);
      if (entrance) {
        return {area, entrance};
      }
    }
    return null;
  }

  // Find shortest route using Dijkstra's algorithm
  findRoute(startEntranceId: string, endEntranceId: string): Route {
    if (startEntranceId === endEntranceId) {
      return {
        steps: [],
        totalSteps: 0,
        isComplete: true
      };
    }

    const graph = this.buildConnectionGraph();
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const unvisited = new Set<string>();

    // Initialize distances and unvisited set
    graph.forEach((_, node) => {
      distances.set(node, node === startEntranceId ? 0 : Infinity);
      previous.set(node, null);
      unvisited.add(node);
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
      if (currentNode === endEntranceId) {
        return this.buildRouteFromPath(startEntranceId, endEntranceId, previous);
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

  private buildRouteFromPath(_start: string, end: string, previous: Map<string, string | null>): Route {
    const path: string[] = [];
    let current: string | null = end;

    // Build path backwards
    while (current !== null) {
      path.unshift(current);
      current = previous.get(current) || null;
    }

    // Convert path to route steps
    const steps: RouteStep[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      const fromEntranceId = path[i];
      
      const fromInfo = this.getEntranceInfo(fromEntranceId);
      const destination = this.connections[fromEntranceId] || '';
      
      if (fromInfo) {
        steps.push({
          fromEntrance: `${fromInfo.area.name} - ${fromInfo.entrance.name}`,
          toDestination: destination,
          areaName: fromInfo.area.name
        });
      }
    }

    return {
      steps,
      totalSteps: steps.length,
      isComplete: true
    };
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