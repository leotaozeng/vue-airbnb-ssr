import { fetchRoomList } from '@/api';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    // * all these properties will have their type inferred automatically
    rooms: [
      {
        cityCode: '',
        detail: {},
        id: 0,
        pictureUrl: '',
        price: 0,
        title: ''
      }
    ],
    currentPage: 1,
    pageSize: 6,
    total: 0,
    cityCode: 'hz'
  }),
  getters: {},
  actions: {
    async getRoomList(
      currentPage?: number,
      pageSize?: number,
      cityCode?: string
    ) {
      try {
        const response = await fetchRoomList({
          pageNo: currentPage || this.currentPage,
          pageSize: pageSize || this.pageSize,
          cityCode: cityCode || this.cityCode
        });

        if (response && response.result) {
          const { orders, pageNo, total, cityCode } = response.result;

          this.rooms = orders.data;
          this.cityCode = cityCode;
          this.currentPage = pageNo;
          this.total = total;
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
