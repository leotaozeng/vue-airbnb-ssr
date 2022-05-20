// https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3
import { http } from '../utils/http';

export interface RoomListParams {
  pageNo: number;
  pageSize: number;
  cityCode: string;
}

// 真实接口
export function fetchRoomList(params: RoomListParams) {
  return http.get('http://110.42.184.111/api/room/room/getRoomList', {
    params
  });
}
