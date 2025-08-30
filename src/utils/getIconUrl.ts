// Utility function to get icon URLs for Vite asset handling
const iconModules = import.meta.glob('../assets/icons/generic/*.png', { 
  eager: true,
  query: '?url',
  import: 'default'
});

const itemIconModules = import.meta.glob('../assets/icons/items/**/*.ico', { 
  eager: true,
  query: '?url',
  import: 'default'
});

export const getIconUrl = (iconFilename: string): string | undefined => {
  // Check if it's an item icon (ends with .ico)
  if (iconFilename.endsWith('.ico')) {
    const itemIconPath = `../assets/icons/items/${iconFilename}`;
    const url = itemIconModules[itemIconPath] as string;
    if (!url) {
      console.warn(`Item icon not found: ${iconFilename}`);
    }
    return url;
  }
  
  // Default to entrance icons (PNG files)
  const iconPath = `../assets/icons/generic/${iconFilename}`;
  const url = iconModules[iconPath] as string;
  if (!url) {
    console.warn(`Icon not found: ${iconFilename}`);
  }
  return url;
};