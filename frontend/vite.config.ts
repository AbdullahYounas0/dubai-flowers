import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  optimizeDeps: {
    exclude: ['@react-three/fiber', '@react-three/drei'],
    include: ['three', 'react', 'react-dom']
  },
  define: {
    // Fix for React Three Fiber with React 18
    global: 'globalThis',
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
