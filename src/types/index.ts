export interface Entrance {
  id: string;
  name: string;
  defaultDestination: string;
}

export interface Area {
  id: string;
  name: string;
  entrances: Entrance[];
  color?: string; // Optional color property
}

export interface LocationsData {
  areas: Area[];
}