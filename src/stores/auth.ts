import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', {
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++;
    }
  }
});
