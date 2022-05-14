import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/scss/element/index.scss" as *;'
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
      resolvers: [ElementPlusResolver({ ssr: true })]
    }),
    Components({
      dirs: ['src/pages', 'src/components', 'src/layouts'],
      resolvers: [ElementPlusResolver({ importStyle: 'sass', ssr: true })],
      directoryAsNamespace: true
    })
  ]
});
