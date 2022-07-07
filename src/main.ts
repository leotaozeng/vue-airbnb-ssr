// main.ts 作为 universal code 的入口
import '@/assets/scss/index.scss';
import { createHead } from '@vueuse/head';
import 'element-plus/theme-chalk/index.css';
import { createPinia } from 'pinia';
// this runs in Node.js on the server
import { createSSRApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import { createSSRRouter } from './router';

// SSR requires a fresh app instance per request, therefore we export a function that creates a fresh app instance
// If using Vuex, we'd also be creating a fresh store here
// exports env-agnostic (universal) app code
export function createApp() {
  const app = createSSRApp(App);

  const pinia = createPinia();
  const head = createHead();
  const router = createSSRRouter();

  app.use(i18n);
  app.use(pinia);
  app.use(head);
  app.use(router);

  return { app, pinia, head, router };
}
