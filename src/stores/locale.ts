import { getLanguageAPI, saveLanguageAPI } from '@/api/layouts';
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
      const language = await getLanguageAPI();
      if (language && language.result) {
        this.locale = language.result.locale;
        i18n.global.locale = language.result.name;
      }
    },
    async setLanguage(locale: any) {
      await saveLanguageAPI(locale);
      this.locale = locale;
    }
  }
});
