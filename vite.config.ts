import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 配置代理服务器解决 CORS 问题
  server: {
    proxy: {

      '/api': {
        target: 'https://busily-ungregarious-lakendra.ngrok-free.dev',
        changeOrigin: true,

        rewrite: (path) => path,
        headers: { 'ngrok-skip-browser-warning': 'true' },
      },

      '/health': {
        target: 'https://busily-ungregarious-lakendra.ngrok-free.dev',
        changeOrigin: true,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
    },
  },

})
