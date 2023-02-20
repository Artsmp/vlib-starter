// packages/vlib-ui/vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import vueDefineOptions from 'unplugin-vue-define-options/vite'

// https://cn.vitest.dev/config/
export default defineConfig({
  plugins: [vueDefineOptions(), vue(), vueJsx()],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
})
