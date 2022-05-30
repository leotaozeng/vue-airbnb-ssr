import '@/assets/scss/index.scss';
import { ID_INJECTION_KEY } from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import { createSSRRouter } from './router';

// SSR requires a fresh app instance per request, therefore we export a function that creates a fresh app instance.
// If using Vuex, we'd also be creating a fresh store here.
// exports env-agnostic (universal) app code
export function createApp() {
  // create router and store instances
  const pinia = createPinia();
  const router = createSSRRouter();
  const app = createSSRApp(App);

  app.use(i18n);
  app.use(router);
  app.use(pinia);

  app.provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0
  });

  return { app, router, pinia };
}
