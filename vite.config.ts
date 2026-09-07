/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    // vue-router needs a DOM (createWebHistory reads `window`).
    environment: 'happy-dom',
    // The client always requires Supabase now (no offline fallback), so
    // supabase.ts throws at import time without *some* URL/key — these
    // placeholders just satisfy that; tests must not depend on real network
    // calls succeeding (test only pure logic: adapters, routing, local state).
    env: {
      VITE_SUPABASE_URL: 'https://placeholder.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'placeholder-anon-key'
    }
  }
})
