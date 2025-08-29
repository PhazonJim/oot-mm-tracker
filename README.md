# OOT/MM Tracker

A comprehensive entrance randomizer tracker for **The Legend of Zelda: Ocarina of Time** and **Majora's Mask** combined randomizers.

## 🎮 What is this?

This is a web-based tracker designed for the **OoTMM (Ocarina of Time + Majora's Mask) Combo Randomizer**. It helps players track entrance connections when playing randomized versions of both games combined together.

### Features

- **📍 Entrance Tracking**: Track which entrances lead where across both games
- **🎯 Smart Filtering**: Filter areas by game (OOT/MM), category (Overworld/Towns/Special), or search
- **🗺️ Route Finding**: Calculate optimal paths between locations
- **💾 Auto-Save**: Automatically saves your progress to local storage
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive**: Works on desktop and mobile devices

## 🎲 What is OoTMM?

[OoTMM](https://ootmm.com/) is a combo randomizer that merges Ocarina of Time and Majora's Mask into a single randomized experience. Players can freely travel between Hyrule and Termina, with items, locations, and entrances shuffled across both games.

## 🚀 Getting Started

### Online Usage
Visit the deployed tracker at: [Your deployed URL here]

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MMxOOT.git
   cd MMxOOT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📋 How to Use

### Entrance Tracker Tab

1. **Filter Areas**: Use the filter buttons to show specific types of areas:
   - **Area Types**: All, Overworld, Towns, Special
   - **Game Filters**: All Games, OOT, MM

2. **Track Entrances**: Click on dropdown menus next to entrance names to select their destinations

3. **Search**: Use the search bar to quickly find specific areas or entrances

4. **Drag & Drop**: Reorder area cards by dragging them to customize your layout

### Route Finder Tab

1. Select your starting location
2. Select your destination
3. Click "Find Route" to calculate the optimal path
4. View step-by-step directions

## 🗂️ Data Structure

The tracker includes comprehensive data for both games:

### Ocarina of Time (28 areas)
- **Overworld**: Hyrule Field, Lost Woods, Death Mountain, etc.
- **Towns**: Market, Kakariko Village, Goron City, Zora's Domain
- **Special**: Warp Songs, Dungeons, Spawns

### Majora's Mask (36 areas)
- **Overworld**: Termina Field, Southern Swamp, Great Bay Coast, etc.
- **Towns**: Clock Town districts, Mountain Village, Goron Village, Zora Hall
- **Special**: Owl Statues, Dungeons, Water Voids

## 🛠️ Technical Details

### Built With
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS custom properties for theming

### Project Structure
```
src/
├── components/          # React components
├── context/            # React context for state management
├── data/               # Game data (locations, entrance targets, constants)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (route calculation)
└── App.tsx            # Main application component
```

### Key Files
- `src/data/locations.json` - Complete area and entrance data for both games
- `src/data/entrance_targets.json` - All possible entrance destinations
- `src/data/constants.ts` - Area categorization and game constants
- `src/utils/RouteCalculator.ts` - Pathfinding algorithm implementation

## 🎯 Features in Detail

### Smart Filtering System
- **Combined Filters**: Use area type and game filters together (e.g., "Towns" + "MM" = only MM towns)
- **Real-time Search**: Search works across area names and entrance names
- **Preserved State**: Filter settings persist across sessions

### Route Finding
- **Graph-based Algorithm**: Uses Dijkstra's algorithm for optimal pathfinding
- **Entrance-aware**: Considers current entrance connections when calculating routes
- **Step-by-step Guidance**: Provides clear directions for complex paths

### Data Management
- **Auto-save**: Changes saved automatically to browser local storage
- **Export/Import**: Save and load tracker states
- **Reset Options**: Clear all data or reset to defaults

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for type safety
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly

## 📜 License

This project is for educational and community use. The Legend of Zelda: Ocarina of Time and Majora's Mask are property of Nintendo.

## 🙏 Acknowledgments

- **Nintendo** - For creating these amazing games
- **OoTMM Development Team** - For the incredible combo randomizer
- **Zelda Randomizer Community** - For inspiration and feedback

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please:
1. Check existing issues first
2. Create a detailed issue with steps to reproduce
3. Include browser and device information for bugs

---

**Happy randomizing!** 🎲✨