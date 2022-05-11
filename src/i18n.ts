import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import zhCN from './locales/zh-cn.json';

const i18n = createI18n({
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    'zh-cn': zhCN
  }
});
export default i18n;
