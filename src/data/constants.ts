export const GAME_TITLE = "OoT/MM Tracker";
export const VERSION = "1.0.0";

// Colors for different area types
export const AREA_COLORS = {
  OVERWORLD: "#4CAF50",
  DUNGEON: "#F44336",
  TOWN: "#2196F3",
  SPECIAL: "#FF9800"
};

// Area types mapping
export const AREA_TYPES: Record<string, 'OVERWORLD' | 'DUNGEON' | 'TOWN' | 'SPECIAL'> = {
  "kokiri-forest": "OVERWORLD",
  "lost-woods": "OVERWORLD",
  "hyrule-field": "OVERWORLD",
  "kakariko-village": "TOWN",
  "castle-town": "TOWN",
  "deku-tree": "DUNGEON",
  "goron-city": "TOWN",
  "zoras-river": "OVERWORLD"
};