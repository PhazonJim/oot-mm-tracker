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
  "castle-gate": "SPECIAL",
  "market": "TOWN",
  "temple-of-time-exterior": "SPECIAL",
  "lon-lon-ranch": "OVERWORLD",
  "hyrule-field": "OVERWORLD",
  "kokiri-forest": "OVERWORLD",
  "lost-woods": "OVERWORLD",
  "sacred-forest-meadow": "OVERWORLD",
  "kakariko-village": "TOWN",
  "kakariko-graveyard": "SPECIAL",
  "death-mountain-trail": "OVERWORLD",
  "goron-city": "TOWN",
  "death-mountain-crater": "OVERWORLD",
  "zoras-river": "OVERWORLD",
  "zoras-domain": "TOWN",
  "zoras-fountain": "SPECIAL",
  "lake-hylia": "OVERWORLD",
  "gerudo-valley": "OVERWORLD",
  "gerudo-fortress": "SPECIAL",
  "haunted-wastelands": "OVERWORLD",
  "desert-colossus": "SPECIAL",
  "hyrule-castle": "SPECIAL",
  "ganons-castle-exterior": "SPECIAL"
};