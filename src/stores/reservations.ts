import { fetchReservationListAPI } from '@/api/reservations';
import { defineStore } from 'pinia';

export const useReservationsStore = defineStore('reservations', {
  state: () => ({
    popoverVisible: false
  }),
  actions: {
    showReservationsPopover() {
      this.popoverVisible = true;
    },
    hideReservationsPopover() {
      this.popoverVisible = false;
    },
    async getReservations() {
      try {
        await fetchReservationListAPI();
      } catch (error) {
        ElMessage({
          showClose: true,
          message: '获取 room list 出现异常',
          type: 'error'
        });
        console.error(error);
      }
    }
  }
});
