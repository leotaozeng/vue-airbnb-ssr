import '@/assets/scss/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import router from './router';

// Create and mount the root instance.
const app = createApp(App);

// Make sure to _use_ the router instance to make the whole app router-aware.
app.use(router);
app.use(i18n);
// app.use(ElementPlus, { locale: zhCn });
app.mount('#app');
