import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from 'dotenv'

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
  },
  define: {
    'process.env': process.env,
  },
  // server: {
  //   proxy: {
  //     "/api": "https://fa2024-hack-team-3-bwgb.onrender.com", 
  //   },
  // },
});
