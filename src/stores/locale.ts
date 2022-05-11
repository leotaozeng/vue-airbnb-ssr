import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('LocaleStore', {
  state: () => ({
    locale: 'en'
  }),
  getters: {},
  actions: {
    setLanguage(language: string) {
      this.locale = language;
    }
  }
});
