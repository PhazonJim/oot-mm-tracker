export interface Entrance {
  id: string;
  name: string;
  game: string;
  icon?: string;
}

export interface Area {
  id: string;
  name: string;
  entrances: Entrance[];
  color?: string; // Optional color property
  game: string;
}

export interface LocationsData {
  areas: Area[];
}