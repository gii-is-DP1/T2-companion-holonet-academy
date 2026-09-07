import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The frontend runs on :3000 and the mock backend (json-server) on :4000.
// We proxy /api -> :4000 so that the code in the lessons can simply call
// fetch('/api/starships'), exactly like it will do against the Spring Boot
// backend in your DP1 project.
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
});
