import { fetchRoomList } from '@/api';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    // * all these properties will have their type inferred automatically
    rooms: [],
    currentPage: 1,
    pageSize: 6,
    total: 0
  }),
  getters: {},
  actions: {
    async getRoomList() {
      try {
        const response = await fetchRoomList();
        if (response && response.result) {
          const { orders } = response.result;

          this.rooms = orders.data;
          this.total = orders.length;
        }
      } catch (error) {
        console.error(error);
        ElMessage({
          showClose: true,
          message: '获取 room list 出现异常',
          type: 'error'
        });
      }
    }
  }
});
