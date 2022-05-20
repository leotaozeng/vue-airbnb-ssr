// https://service-ase3oocp-1302839645.sh.apigw.tencentcs.com/api/room/room/getRoomList?pageNo=1&pageSize=3
import { http } from '../utils/http';
import { IResult } from './interface';

// 真实接口
export function fetchRoomList(): Promise<IResult> {
  return http.get(
    'http://110.42.184.111/api/room/room/getRoomList?pageNo=1&pageSize=6&cityCode=hz'
  );
}