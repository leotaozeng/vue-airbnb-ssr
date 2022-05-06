import i18n from '@/i18n';
import IndexedDB from '@/utils/indexedDB';
import { ElLoading } from 'element-plus';
import 'element-plus/es/components/loading/style/css';

const airbnbDB = new IndexedDB('airbnb');

interface Result {
  id: number;
  name: string;
  created: Date;
}

// * Mock接口：保存当前语言包
export const saveLanguageAPI = async (language: string) => {
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('loading'),
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    await airbnbDB.open('language', 'id', ['name']);
    const result = (await airbnbDB.getItem('language', 1)) as Result;

    if (!result) {
      // * 数据不存在，新增数据
      await airbnbDB.addItem('language', {
        created: new Date(),
        name: language
      });
    } else {
      // * 数据已存在，更新数据
      await airbnbDB.updateItem('language', {
        ...result,
        name: language
      });
    }

    return {
      code: '000000',
      message: '操作成功',
      result: null,
      success: true
    };
  } catch (error) {
    console.error('saveLanguageApi Error', error);
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

// * Mock接口：获取当前语言包
export const getLanguageApi = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('loading'),
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    await airbnbDB.open('language', 'id', ['name']);
    const result = (await airbnbDB.getItem('language', 1)) as Result;

    return {
      code: '000000',
      message: '操作成功',
      result: result || null,
      success: true
    };
  } catch (error) {
    console.error('getLanguageApi Error', error);
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};
