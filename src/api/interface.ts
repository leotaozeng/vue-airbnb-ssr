/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResult {
  code: string;
  message: string;
  success: boolean;
  result: any | null;
}

export interface IRoomListParams {
  pageNo: number;
  pageSize: number;
  cityCode: string;
}

export interface IRoomDetailsParams {
  id: string;
}

export interface IHistory {
  historyId: string;
  roomId: string;
  userId: number;
  pictureURL: string;
  title: string;
  city: string;
  price: number;
  created: number;
}
