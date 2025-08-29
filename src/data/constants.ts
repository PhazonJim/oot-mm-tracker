export const GAME_TITLE = "OoT/MM Tracker";
export const VERSION = "1.0.0";

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
  
  // OOT Towns/Settlements
  "market": "TOWN",
  "kakariko-village": "TOWN",
  "goron-city": "TOWN",
  "zoras-domain": "TOWN",
  
  // OOT Special/Meta Areas
  "warp-songs": "SPECIAL",
  "wallmasters-oot": "SPECIAL",
  "overworld-one-ways": "SPECIAL",
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
  "dungeons-mm": "SPECIAL",
  "dungeons-oot": "SPECIAL",
  "owl-statues": "SPECIAL",
  "great-bay-water-voids": "SPECIAL",
  "wallmasters-mm": "SPECIAL"
};