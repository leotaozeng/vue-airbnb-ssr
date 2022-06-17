import { fetchReservationList } from '@/api/reservations';
import { defineStore } from 'pinia';

export const useReservationsStore = defineStore('reservations', {
  state: () => ({
    popoverVisible: false,
    reservations: [
      {
        created: null,
        date: '[]',
        guests: 0,
        infants: 0,
        nights: 0,
        pictureURL: '',
        price: 0,
        reservationId: null,
        title: ''
      }
    ]
  }),
  actions: {
    async getReservations() {
      try {
        const response = await fetchReservationList();
        if (response.success && response.result) {
          this.reservations = response.result;
        }
      } catch (error) {
        ElMessage({
          showClose: true,
          message: '获取 reservation list 出现异常',
          type: 'error'
        });
        console.error(error);
      }
    },
    showReservationsPopover() {
      this.popoverVisible = true;
    },
    hideReservationsPopover() {
      this.popoverVisible = false;
    }
  }
});
