import { airbnbDB } from '@/db';
import languagesObjectStore from '@/db/objectStores/languages';
import i18n from '@/i18n';
import { ElLoading } from 'element-plus';
import 'element-plus/es/components/loading/style/css';

interface Result {
  id: number;
  name: string;
  created: Date;
}

const storeName = Object.keys(languagesObjectStore)[0];

// * Mock接口：保存当前语言包
export const saveLanguageAPI = async (language: string) => {
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('loading'),
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const result = (await airbnbDB.getItem(storeName, 1)) as Result;

    if (!result) {
      // * 数据不存在，新增数据
      await airbnbDB.addItem(storeName, {
        created: new Date(),
        name: language
      });
    } else {
      // * 数据已存在，更新数据
      await airbnbDB.updateItem(storeName, {
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
    console.error('saveLanguageAPI Error', error);
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};

// * Mock接口：获取当前语言包
export const getLanguageAPI = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: i18n.global.t('loading'),
    background: 'rgba(0, 0, 0, 0.2)'
  });

  try {
    const result = (await airbnbDB.getItem(storeName, 1)) as Result;

    return {
      code: '000000',
      message: '操作成功',
      result: result || null,
      success: true
    };
  } catch (error) {
    console.error('getLanguageAPI Error', error);
  } finally {
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};
