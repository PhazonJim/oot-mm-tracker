# Contributing to OOT/MM Tracker

Thank you for your interest in contributing to the OOT/MM Tracker! This project helps players track entrance connections in OoTMM (Ocarina of Time + Majora's Mask) combo randomizers.

## 🚀 Quick Start

### Development Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/phazonjim/oot-mm-tracker.git
   cd oot-mm-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit http://localhost:5173/oot-mm-tracker/

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check for linting errors
npm run lint:fix     # Fix linting errors automatically
npm run type-check   # Run TypeScript type checking
npm run preview      # Preview production build locally
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Area.tsx        # Individual area cards
│   ├── SearchFilter.tsx # Search and filter functionality
│   └── ...
├── context/            # React context for state management
├── data/               # Game data files
│   ├── locations.json  # All area and entrance data
│   ├── constants.ts    # Area categorization
│   └── entrance_targets.json # All possible destinations
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## 🎯 Code Style Guidelines

### TypeScript
- **Use TypeScript** for all new code
- **Define proper interfaces** for data structures
- **Avoid `any` type** - use proper typing
- **Export types** from `src/types/index.ts`

### React Components
- **Use functional components** with hooks
- **Follow existing naming patterns**
- **Use TypeScript interfaces** for props
- **Include proper accessibility attributes**

### Code Quality
- **No `console.log`** statements in production code
- **Use meaningful variable names**
- **Add comments for complex logic**
- **Follow existing code patterns**

### Example Component Structure:
```tsx
import React from 'react';
import type { MyComponentProps } from '../types';

const MyComponent: React.FC<MyComponentProps> = ({ prop1, prop2 }) => {
  // Component logic here
  
  return (
    <div className="my-component" role="region" aria-label="descriptive label">
      {/* JSX content */}
    </div>
  );
};

export default MyComponent;
```

## 📊 Data Guidelines

### Adding New Areas/Entrances
1. **Update `src/data/locations.json`** with new area data
2. **Update `src/data/constants.ts`** with area categorization
3. **Regenerate `entrance_targets.json`** if needed
4. **Test with both OOT and MM data**

### Data Structure:
```json
{
  "id": "area-id",
  "name": "Area Name", 
  "color": "#hex-color",
  "game": "OOT" | "MM",
  "entrances": [
    {
      "id": "entrance-id",
      "name": "Entrance Name",
      "game": "OOT" | "MM",
      "icon": "optional-icon.png"
    }
  ]
}
```

## 🧪 Testing Your Changes

### Before Submitting
1. **Build succeeds**: `npm run build`
2. **No lint errors**: `npm run lint`
3. **Type checking passes**: `npm run type-check`
4. **Test both games**: Try OOT and MM data
5. **Test all features**: Search, filters, drag & drop, route finding

### Manual Testing Checklist
- [ ] Area cards display correctly
- [ ] Search works for area names, entrance names, and selected destinations
- [ ] Filters work (All/Overworld/Towns/Special + All Games/OOT/MM)
- [ ] Drag & drop reordering works
- [ ] Route finder calculates paths correctly
- [ ] Dark mode toggle works
- [ ] Data persists in localStorage

## 🐛 Bug Reports

When reporting bugs, please include:
- **Browser and version**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots if applicable**
- **Console errors if any**

## 💡 Feature Requests

We welcome feature requests! Please:
- **Check existing issues** first
- **Describe the use case** clearly
- **Explain how it helps randomizer players**
- **Consider implementation complexity**

## 📝 Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the guidelines above
4. **Test thoroughly** (see testing checklist)
5. **Commit with clear messages**: `git commit -m 'Add amazing feature'`
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Testing notes

## 🎮 Understanding OoTMM

This tracker is designed for the [OoTMM combo randomizer](https://ootmm.com/), which:
- Combines Ocarina of Time and Majora's Mask
- Shuffles items and entrances across both games
- Allows travel between Hyrule and Termina
- Creates unique randomized experiences

Understanding this context helps when contributing new features or fixing bugs.

## 🙏 Questions?

- **Open an issue** for bugs or feature requests
- **Check existing issues** before creating new ones
- **Be respectful** in all interactions

Thanks for contributing! 🎲✨