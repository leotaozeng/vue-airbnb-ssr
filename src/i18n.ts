import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import zh from './locales/zh-cn.json';

const i18n = createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  messages: { 'zh-cn': zh, en }
});

export default i18n;
