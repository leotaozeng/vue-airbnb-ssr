/* eslint-disable @typescript-eslint/no-explicit-any */
import { airbnbDB, languagesObjectStore } from '@/database';
import { ElLoading, ElMessage } from 'element-plus';

interface Language {
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
    const language = (await airbnbDB.getItem(storeName, 1)) as Language;

    if (!language) {
      // 数据不存在，新增数据
      await airbnbDB.addItem(storeName, {
        locale,
        name: locale.name
      });
    } else {
      // 数据已存在，更新数据
      await airbnbDB.updateItem(storeName, {
        ...language,
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
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

// Mock接口：获取当前语言包
export const fetchLanguageAPI = async () => {
  try {
    const language = (await airbnbDB.getItem(storeName, 1)) as Language;
    return {
      code: '000000',
      message: '操作成功',
      success: true,
      result: language || null
    };
  } catch (error) {
    const message = `数据库操作出现异常: ${error}`;
    ElMessage({ message, type: 'error', showClose: true });
  }
};
