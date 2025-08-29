import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Read package.json to get version
import packageJson from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/oot-mm-tracker/",
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version)
  }
})
