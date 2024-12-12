import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { settings } from './src/lib/electron-router-dom'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/renderer/src'),
      },
    },
    plugins: [react()],
    server: {
      port: settings.port,
    },
  },
})
