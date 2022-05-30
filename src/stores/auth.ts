import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedIn: 0 // 登录状态
  }),
  actions: {
    setLoggedIn(status: number) {
      this.loggedIn = status;
    }
  }
});
