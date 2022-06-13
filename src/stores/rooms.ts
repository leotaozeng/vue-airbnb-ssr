import { fetchRoomDetails, fetchRoomList } from '@/api/rooms';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    // all these properties will have their type inferred automatically
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
    roomDetails: {
      imgs: [],
      title: '',
      info: {
        room: 0,
        bed: 0,
        toilet: 0,
        liveNumber: 0,
        remarks: 0,
        metro: false,
        parking: false,
        luggage: false,
        goodOwner: false
      },
      owner: {
        avatar: '',
        name: '',
        introduce: '',
        certify: false
      },
      price: 0
    },
    cityCode: 'hz',
    currentPage: 1,
    pageSize: 6,
    total: 0,
    dropdownVisible: false
  }),
  getters: {},
  actions: {
    async getRooms(currentPage?: number, pageSize?: number, cityCode?: string) {
      try {
        const response = await fetchRoomList({
          pageNo: currentPage || this.currentPage,
          pageSize: pageSize || this.pageSize,
          cityCode: cityCode || this.cityCode
        });

        if (response.success && response.result) {
          const { orders, pageNo, total, cityCode } = response.result;
          this.rooms = orders.data;
          this.cityCode = cityCode;
          this.currentPage = pageNo;
          this.total = total;
        }
      } catch (error) {
        ElMessage({
          showClose: true,
          message: '获取 room list 出现异常',
          type: 'error'
        });
        console.error(error);
      }
    },
    async getRoomDetails(id: string) {
      try {
        const response = await fetchRoomDetails({ id });

        if (response.success && response.result) {
          console.log(response.result);
          this.roomDetails = response.result;
        }
      } catch (error) {
        ElMessage({
          showClose: true,
          message: '获取 room details 出现异常',
          type: 'error'
        });
        console.error(error);
      }
    },
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    }
  }
});
