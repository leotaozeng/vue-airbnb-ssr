import { fetchReservationListAPI } from '@/api/reservations';
import { defineStore } from 'pinia';

export const useReservationsStore = defineStore('reservations', {
  state: () => ({
    popoverVisible: false,
    reservations: [
      {
        date: '[]',
        guests: 0,
        infants: 0,
        nights: 0,
        price: 0,
        pictureURL: '',
        roomId: null,
        reservationId: null,
        title: null,
        city: null,
        created: null
      }
    ]
  }),
  actions: {
    async getReservations() {
      const response = await fetchReservationListAPI();
      if (response && response.success && response.result) {
        this.reservations = response.result;
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
