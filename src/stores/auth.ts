import { getCookie } from '@/utils/util';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedIn: 0 // 登录状态
  }),
  actions: {
    initAuthentication() {
      getCookie('token') && this.setLoggedIn(1);
    },
    setLoggedIn(status: number) {
      this.loggedIn = status;
    }
  }
});
