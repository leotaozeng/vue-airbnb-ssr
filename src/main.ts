import '@/assets/scss/index.scss';
import { createHead } from '@vueuse/head';
import 'element-plus/theme-chalk/index.css';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue'; // this runs in Node.js on the server
import App from './App.vue';
import i18n from './i18n';
import { createSSRRouter } from './router';

// SSR requires a fresh app instance per request, therefore we export a function that creates a fresh app instance
// If using Vuex, we'd also be creating a fresh store here
// exports env-agnostic (universal) app code
export function buildApp() {
  const app = import.meta.env.VITE_SSR ? createSSRApp(App) : createApp(App);

  const pinia = createPinia();
  const router = createSSRRouter();
  const head = createHead();

  app.use(i18n);
  app.use(router);
  app.use(pinia);
  app.use(head);

  return { app, router, pinia, head };
}
