// vite.config.js

import {defineConfig} from 'vite'
import {resolve} from 'path'

export default defineConfig({
    build: {
        target: "esnext",
        rollupOptions: {
            input: {
              main: resolve(__dirname, 'index.html'),
              otherPage: resolve(__dirname, 'results.html'),
            },
          },
      },
	plugins: []	
})