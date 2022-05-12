import { fetchLanguageAPI, saveLanguageAPI } from '@/api/layouts';
import i18n from '@/i18n';
import en from 'element-plus/lib/locale/lang/en';
import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('LocaleStore', {
  state: () => ({
    locale: en
  }),
  getters: {},
  actions: {
    async getLanguage() {
      const language = await fetchLanguageAPI();
      if (language && language.result) {
        const { locale, name } = language.result;
        this.locale = locale;
        i18n.global.locale = name;
      }
    },
    async setLanguage(locale: any) {
      await saveLanguageAPI(locale);
      this.locale = locale;
    }
  }
});
