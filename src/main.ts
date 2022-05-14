import '@/assets/scss/index.scss';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import router from './router';

// * SSR requires a fresh app instance per request, therefore we export a function
// * that creates a fresh app instance. If using Vuex, we'd also be creating a fresh store here.
// * exports env-agnostic (universal) app code
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  app.use(i18n);
  app.use(pinia);
  app.use(router);

  return { app, router };
}
