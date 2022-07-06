/* eslint-disable @typescript-eslint/no-explicit-any */
// code: '000000' 表示 '操作成功'
// code: '000001' 表示 '浏览记录已存在'

import { airbnbDB, historyObjectStore } from '@/database';
import { ElLoading, ElMessage } from 'element-plus';
import { IResult } from '../interface';

const storeName = Object.keys(historyObjectStore)[0];

// Mock接口：保存浏览记录
export async function saveHistoryAPI(
  params: any
): Promise<IResult | undefined> {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const userId = Number(localStorage.getItem('userId')) as number;
    const allHistory = (await airbnbDB.getList(storeName)) as any[];
    const hasHistoryId = allHistory.find((item) => {
      return item.userId === userId && item.title === params.title;
    });

    if (!hasHistoryId) {
      Object.assign(params, { userId });
      // 数据不存在，新增一条浏览记录
      await airbnbDB.addItem(storeName, params);
      return {
        code: '000000',
        message: '保存成功',
        success: true,
        result: null
      };
    } else {
      // 存在相同浏览记录
      return {
        code: '000001',
        message: '浏览记录已存在',
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

// Mock接口：获取浏览记录
export async function fetchHistoryListAPI(): Promise<IResult | undefined> {
  try {
    const userId = Number(localStorage.getItem('userId')) as number;
    const allHistory = (await airbnbDB.getList(storeName)) as any[];
    const historyList = allHistory.filter((item) => {
      return item.userId === userId;
    });

    return {
      code: '000000',
      message: '获取浏览记录成功',
      success: true,
      result: historyList || null
    };
  } catch (error) {
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  }
}
