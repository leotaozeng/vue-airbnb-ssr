/* eslint-disable @typescript-eslint/no-explicit-any */
// code: '000000' 表示 '操作成功'
// code: '000001' 表示 '手机号已存在'
// code: '000002' 表示 '手机号不存在'
// code: '000003' 表示 '密码不正确'
// code: '000004' 表示 '其他异常'
// code: '000005' 表示 '登录过期'

import { airbnbDB, reservationsObjectStore } from '@/db';
import { ElLoading, ElMessage } from 'element-plus';
import { IResult } from '../interface';

const storeName = Object.keys(reservationsObjectStore)[0];

// Mock接口：保存历史足迹
export async function saveHistoryAPI(
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
      return (
        item.userId === userId && item.reservationId === params.reservationId
      );
    });

    if (!hasReservationId) {
      Object.assign(params, { userId });
      console.log(params);
      // 数据不存在，新增一条订单数据
      await airbnbDB.addItem(storeName, params);
      return {
        code: '000000',
        message: '预定成功',
        success: true,
        result: null
      };
    } else {
      // 存在相同订单数据
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

// Mock接口：获取历史足迹
export async function fetchHistoryListAPI(): Promise<IResult | undefined> {
  try {
    const userId = Number(localStorage.getItem('userId')) as number;
    const allReservations = (await airbnbDB.getList(storeName)) as any[];
    const reservations = allReservations.filter((item) => {
      return item.userId === userId;
    });

    return {
      code: '000000',
      message: '操作成功',
      success: true,
      result: reservations || null
    };
  } catch (error) {
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  }
}