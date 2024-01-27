// vite.config.js

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    define: {
        'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
        'import.meta.env.VITE_SUPABASE_API_KEY': JSON.stringify(process.env.SUPABASE_API_KEY),
        'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
        'import.meta.env.VITE_OMDB_API_KEY': JSON.stringify(process.env.OMDB_API_KEY),
    },
    target: 'esnext',
  },
  plugins: [],
});