import IndexedDB from '@/utils/indexedDB';

const airbnbDB = new IndexedDB('airbnb');

// * Mock接口：获取 elephant object store
export const getElephant = async () => {
  try {
    await airbnbDB.open('elephant', 'id', ['nose', 'ear']);
    const result = await airbnbDB.getList('elephant');

    return {
      code: '000000',
      message: '操作成功',
      result,
      success: true
    };
  } catch (error) {
    console.error('getElephant Error', error);
  }
};

// * Mock接口：保存当前语言包
export const saveLanguageApi = () => {};

// * Mock接口：获取当前语言包
export const getLanguageApi = () => {};
