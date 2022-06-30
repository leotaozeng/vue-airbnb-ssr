/* eslint-disable @typescript-eslint/no-explicit-any */
import { airbnbDB, languagesObjectStore } from '@/db';
import { ElLoading, ElMessage } from 'element-plus';

interface Result {
  id: number;
  created: number;
  locale: any;
  name: string;
}

const storeName = Object.keys(languagesObjectStore)[0];

// Mock接口：保存当前语言包
export const saveLanguageAPI = async (locale: any) => {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const result = (await airbnbDB.getItem(storeName, 1)) as Result;

    if (!result) {
      // 数据不存在，新增数据
      await airbnbDB.addItem(storeName, {
        locale,
        name: locale.name
      });
    } else {
      // 数据已存在，更新数据
      await airbnbDB.updateItem(storeName, {
        ...result,
        locale,
        name: locale.name
      });
    }

    return {
      code: '000000',
      message: '操作成功',
      success: true,
      result: null
    };
  } catch (error) {
    console.error(error);
    ElMessage({
      type: 'error',
      message: `数据库查询出现异常: ${error}`,
      showClose: true
    });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

// Mock接口：获取当前语言包
export const fetchLanguageAPI = async () => {
  try {
    const result = (await airbnbDB.getItem(storeName, 1)) as Result;

    return {
      code: '000000',
      message: '操作成功',
      success: true,
      result: result || null
    };
  } catch (error) {
    console.error(error);
    ElMessage({
      type: 'error',
      message: `数据库查询出现异常: ${error}`,
      showClose: true
    });
  }
};
