export interface Entrance {
  id: string;
  name: string;
  game: string;
  icon?: string;
  required_items?: string[]; // Array of item IDs required to access this entrance
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

// Item types
export interface Item {
  id: string;
  name: string;
  icon: string;
  game: 'OOT' | 'MM';
  category: 'equipment' | 'quest' | 'consumable' | 'upgrade';
  type: 'toggle' | 'progressive' | 'quantity';
  max_level?: number; // For progressive items
  levels?: string[]; // Names for each progressive level
  max_quantity?: number; // For quantity items
}

export interface ItemsData {
  equipment: Item[];
  quest_items: Item[];
  consumables: Item[];
  upgrades: Item[];
}

export type ItemState = Record<string, boolean | number>;