/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchLanguageAPI, saveLanguageAPI } from '@/api/layouts';
import i18n from '@/i18n';
import en from 'element-plus/lib/locale/lang/en';
import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: en
  }),
  getters: {},
  actions: {
    async getLanguage() {
      console.log('Start getting Language');
      const response = await fetchLanguageAPI();
      if (response && response.result) {
        const { locale, name } = response.result;
        this.locale = locale;
        i18n.global.locale.value = name;
      }
    },
    async setLanguage(locale: any) {
      await saveLanguageAPI(locale);
      this.locale = locale;
    }
  }
});
