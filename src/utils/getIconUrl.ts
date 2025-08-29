// Utility function to get icon URLs for Vite asset handling
const iconModules = import.meta.glob('../assets/icons/*.png', { 
  eager: true,
  query: '?url',
  import: 'default'
});

export const getIconUrl = (iconFilename: string): string | undefined => {
  const iconPath = `../assets/icons/${iconFilename}`;
  const url = iconModules[iconPath] as string;
  if (!url) {
    console.warn(`Icon not found: ${iconFilename}`);
  }
  return url;
};