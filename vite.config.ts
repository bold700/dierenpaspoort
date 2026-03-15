import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Voor GitHub Pages: base = /repo-naam/ (pas aan als je repo anders heet)
const base = process.env.GITHUB_PAGES === 'true' ? '/dierenpaspoort/' : '/'

export default defineConfig({
  base,
  test: {
    globals: true,
    environment: 'node'
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dierenpaspoort',
        short_name: 'Dierenpaspoort',
        description: 'Pokédex voor echte dieren — voor kinderen',
        theme_color: '#e63946',
        background_color: '#D4213F',
        display: 'standalone',
        orientation: 'portrait',
        scope: base,
        start_url: base,
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: []
      }
    })
  ]
})
