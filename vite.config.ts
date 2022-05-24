import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/element/index.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
      resolvers: [
        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver({ importStyle: 'sass', ssr: true })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      eslintrc: {
        enabled: false, // Default `false`. 生成一次就可以，避免每次工程启动都生成
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Components({
      dirs: ['src/pages', 'src/components', 'src/layouts'],
      resolvers: [
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver({ importStyle: 'sass', ssr: true }),

        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({ enabledCollections: ['ep'] })
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    }),
    Inspect()
  ]
});
