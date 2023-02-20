// examples/vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { VlibResolver } from '@artsmp/vlib-ui/lib/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // vant
        VantResolver(),
        // vlib
        VlibResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
