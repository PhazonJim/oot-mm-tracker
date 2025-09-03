export const GAME_TITLE = "OoT/MM Tracker";
export const VERSION = __APP_VERSION__ || "0.0.0";

// Area types mapping
export const AREA_TYPES: Record<string, 'OVERWORLD' | 'DUNGEON' | 'TOWN' | 'SPECIAL'> = {
  // === OCARINA OF TIME AREAS ===
  
  // OOT Overworld Areas
  "castle-gate": "OVERWORLD",
  "temple-of-time-exterior": "OVERWORLD",
  "lon-lon-ranch": "OVERWORLD",
  "hyrule-field": "OVERWORLD",
  "kokiri-forest": "OVERWORLD",
  "lost-woods": "OVERWORLD",
  "sacred-forest-meadow": "OVERWORLD",
  "kakariko-graveyard": "OVERWORLD",
  "death-mountain-trail": "OVERWORLD",
  "death-mountain-crater": "OVERWORLD",
  "zoras-river": "OVERWORLD",
  "zoras-fountain": "OVERWORLD",
  "lake-hylia": "OVERWORLD",
  "gerudo-valley": "OVERWORLD",
  "gerudo-fortress": "OVERWORLD",
  "haunted-wastelands": "OVERWORLD",
  "desert-colossus": "OVERWORLD",
  "hyrule-castle": "OVERWORLD",
  "ganons-castle-exterior": "OVERWORLD",
  
  // OOT Dungeons
  "deku-tree": "DUNGEON",
  "fire-temple": "DUNGEON",
  "water-temple": "DUNGEON",
  "dodongos-cavern": "DUNGEON",
  "jabu-jabus-belly": "DUNGEON",
  "ice-cavern": "DUNGEON",
  "forest-temple": "DUNGEON",
  "shadow-temple": "DUNGEON",
  "spirit-temple": "DUNGEON",
  "bottom-of-the-well": "DUNGEON",
  "gerudo-training-grounds": "DUNGEON",
  "ganons-castle": "DUNGEON",

  // OOT Towns/Settlements
  "market": "TOWN",
  "kakariko-village": "TOWN",
  "goron-city": "TOWN",
  "zoras-domain": "TOWN",
  
  // OOT Special/Meta Areas
  "warp-songs": "SPECIAL",
  "spawns": "SPECIAL",
  
  // === MAJORA'S MASK AREAS ===
  
  // MM Central Hub
  "termina-field": "OVERWORLD",
  
  // MM Clock Town Districts (Central Town)
  "north-clock-town": "TOWN",
  "east-clock-town": "TOWN",
  "west-clock-town": "TOWN",
  "south-clock-town": "TOWN",
  "laundry-pool": "TOWN",
  
  // MM Southern Swamp Region
  "road-to-southern-swamp": "OVERWORLD",
  "southern-swamp": "OVERWORLD",
  "deku-palace": "OVERWORLD",
  "woods-of-mystery": "OVERWORLD",
  "woodfall": "OVERWORLD",
  
  // MM Mountain/Snowhead Region
  "road-to-mountain-village": "OVERWORLD",
  "mountain-village": "TOWN",
  "twin-islands": "OVERWORLD",
  "goron-village": "TOWN",
  "snowhead": "OVERWORLD",
  "path-to-snowhead": "OVERWORLD",
  
  // MM Great Bay Region
  "great-bay-coast": "OVERWORLD",
  "zora-cape": "OVERWORLD",
  "zora-hall": "TOWN",
  "pirates-fortress-exterior": "OVERWORLD",
  "pirates-fortress-sewers": "DUNGEON",
  "pirates-fortress-interior": "DUNGEON",
  "pinnacle-rock": "OVERWORLD",
  "beneath-the-well": "DUNGEON",
  "woodfall-temple": "DUNGEON",
  "snowhead-temple": "DUNGEON",
  "great-bay-temple": "DUNGEON",
  "stone-tower-temple": "DUNGEON",
  "inverted-stone-tower-temple": "DUNGEON",
  
  // MM Ikana Region
  "road-to-ikana": "OVERWORLD",
  "ikana-canyon": "OVERWORLD",
  "ikana-graveyard": "OVERWORLD",
  "ancient-castle-of-ikana-exterior": "OVERWORLD",
  "stone-tower": "OVERWORLD",
  
  // MM Ranch Areas
  "romani-ranch": "OVERWORLD",
  "milk-road": "OVERWORLD",
  "gorman-track": "OVERWORLD",
  
  // Special/Meta Areas (Both games use same "dungeons" key)
  "owl-statues": "SPECIAL",
};