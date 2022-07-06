/* eslint-disable @typescript-eslint/no-explicit-any */
// code: '000000' 表示 '操作成功'
// code: '000001' 表示 '订单已存在'

import { airbnbDB, reservationsObjectStore } from '@/database';
import { ElLoading, ElMessage } from 'element-plus';
import { IResult } from '../interface';

const storeName = Object.keys(reservationsObjectStore)[0];

// Mock接口：保存房源订单
export async function saveReservationAPI(
  params: any
): Promise<IResult | undefined> {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const userId = Number(localStorage.getItem('userId')) as number;
    const allReservations = (await airbnbDB.getList(storeName)) as any[];
    const hasReservationId = allReservations.find((item) => {
      return item.userId === userId && item.date === params.date;
    });

    if (!hasReservationId) {
      Object.assign(params, { userId });
      // 数据不存在，新增一条订单
      await airbnbDB.addItem(storeName, params);
      return {
        code: '000000',
        message: '预定成功',
        success: true,
        result: null
      };
    } else {
      // 存在相同订单
      return {
        code: '000001',
        message: '订单已存在',
        success: false,
        result: null
      };
    }
  } catch (error) {
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
}

// Mock接口：获取房源订单
export async function fetchReservationListAPI(): Promise<IResult | undefined> {
  try {
    const userId = Number(localStorage.getItem('userId')) as number;
    const allReservations = (await airbnbDB.getList(storeName)) as any[];
    const reservationList = allReservations.filter((item) => {
      return item.userId === userId;
    });

    return {
      code: '000000',
      message: '获取房源订单成功',
      success: true,
      result: reservationList || null
    };
  } catch (error) {
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  }
}
