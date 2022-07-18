import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';
import zhCn from './locales/zh-cn.json';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    es,
    'zh-cn': zhCn
  }
});

export default i18n;
